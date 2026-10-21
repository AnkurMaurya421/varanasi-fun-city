// Live site settings: the defaults in siteConfig.js plus whatever was saved from /admin.
// Saved changes live in Vercel Blob (one small JSON file). Locally, with no Blob token, a file in .data/ is used.
import fs from "node:fs/promises";
import path from "node:path";
import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { siteConfig } from "@/siteConfig";
import { services, getService } from "@/servicesConfig";
import { deepMerge, applyDerived, validate, pickEditable, diffFromDefaults } from "@/lib/configSchema";

// Defaults = siteConfig.js plus the editable text of every service page (from servicesConfig.js).
const defaults = {
  ...siteConfig,
  services: Object.fromEntries(
    services.map((s) => [s.slug, { metaDescription: s.metaDescription, intro: s.intro, whyChoose: s.whyChoose, planningTips: s.planningTips, faqs: s.faqs }]),
  ),
};

const KEY = "site-settings.json";
const TAG = "site-config";
const LOCAL = path.join(process.cwd(), ".data", KEY);
// Older stores give BLOB_READ_WRITE_TOKEN; newer ones give BLOB_STORE_ID and the SDK signs in with Vercel's OIDC token.
const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

// Blob bills "list" and "put" as advanced operations (2,000/month on the free plan) but plain reads of a public file are free.
// So the file's address is looked up once per server instance (and remembered), then every read is a plain fetch.
let blobUrl = null;

// The file never moves, so the lookup is shared by every server instance and kept for a day:
// roughly one "list" operation per day for the whole site. (Throwing means "no file yet", which is never cached.)
const lookupBlobUrl = unstable_cache(
  async () => {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: KEY, limit: 1 });
    if (!blobs[0]) throw new Error("no settings file yet");
    return blobs[0].url;
  },
  ["blob-url"],
  { revalidate: 86400 },
);

async function findBlobUrl() {
  if (blobUrl) return blobUrl;
  try { blobUrl = await lookupBlobUrl(); } catch { blobUrl = null; }
  return blobUrl;
}

async function readRaw() {
  try {
    if (hasBlob()) {
      const url = await findBlobUrl();
      if (!url) return {};
      // a unique query string skips the CDN copy so a fresh save is read straight away
      const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
      if (res.status === 404) { blobUrl = null; return {}; }
      return res.ok ? await res.json() : {};
    }
    if (process.env.VERCEL) return {};
    return JSON.parse(await fs.readFile(LOCAL, "utf8"));
  } catch {
    return {};
  }
}

// Cached, and cleared the moment you save. The hourly expiry only repairs a one-off read failure.
export const getOverrides = unstable_cache(readRaw, ["site-overrides"], { tags: [TAG], revalidate: 3600 });

// What the public site sees: a closed park closes every shift, and blank announcements are dropped.
function applyEffective(cfg) {
  return {
    ...cfg,
    announcements: cfg.announcements.filter((a) => a.text?.trim()),
    shifts: {
      day: { ...cfg.shifts.day, enabled: cfg.isOpen && cfg.shifts.day.enabled },
      night: { ...cfg.shifts.night, enabled: cfg.isOpen && cfg.shifts.night.enabled },
    },
  };
}

function build(overrides) {
  let clean = {};
  try { clean = validate(overrides); } catch { /* ignore a corrupt file, fall back to defaults */ }
  return applyEffective(applyDerived(deepMerge(defaults, clean)));
}

export async function getSiteConfig() {
  return build(await getOverrides());
}

export function storageReady() {
  return hasBlob() || !process.env.VERCEL;
}

export async function readOverridesFresh() {
  return readRaw();
}

export async function saveSettings(input) {
  if (!storageReady()) {
    throw new Error("Storage isn't connected yet. In Vercel: Storage → Create a Blob store → connect it to this project, then redeploy.");
  }
  const clean = validate(input);
  if (clean.announcements) clean.announcements = clean.announcements.filter((a) => a.text);
  const diff = diffFromDefaults(clean, pickEditable(defaults)) || {};
  const body = JSON.stringify(diff, null, 2);
  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    const saved = await put(KEY, body, { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
    blobUrl = saved.url;
  } else {
    await fs.mkdir(path.dirname(LOCAL), { recursive: true });
    await fs.writeFile(LOCAL, body);
  }
  // Storage can lag a moment behind a write. Wait until the new version is readable, otherwise the
  // pages would regenerate from the old file and keep showing it.
  for (let i = 0; i < 20; i++) {
    if (JSON.stringify(await readRaw()) === JSON.stringify(diff)) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  revalidateTag(TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return applyDerived(deepMerge(defaults, diff));
}


// A service page with any edits from /admin applied.
export async function getLiveService(slug) {
  const raw = getService(slug);
  const live = (await getSiteConfig()).services?.[slug] || {};
  return { ...raw, ...live };
}

// What /admin shows: the saved values (read fresh from storage) next to the code defaults.
export async function getEditableSnapshot() {
  let clean = {};
  try { clean = validate(await readRaw()); } catch { /* corrupt file: show defaults */ }
  return {
    settings: pickEditable(applyDerived(deepMerge(defaults, clean))),
    defaults: pickEditable(defaults),
    storageReady: storageReady(),
  };
}
