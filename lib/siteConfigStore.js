// Live site settings: the defaults in siteConfig.js plus whatever was saved from /admin.
// Saved changes live in Vercel Blob (one small JSON file). Locally, with no Blob token, a file in .data/ is used.
import fs from "node:fs/promises";
import path from "node:path";
import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { siteConfig as defaults } from "@/siteConfig";
import { deepMerge, applyDerived, validate, pickEditable, diffFromDefaults } from "@/lib/configSchema";

const KEY = "site-settings.json";
const TAG = "site-config";
const LOCAL = path.join(process.cwd(), ".data", KEY);
// Older stores give BLOB_READ_WRITE_TOKEN; newer ones give BLOB_STORE_ID and the SDK signs in with Vercel's OIDC token.
const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

async function readRaw() {
  try {
    if (hasBlob()) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: KEY, limit: 1 });
      if (!blobs.length) return {};
      const res = await fetch(`${blobs[0].url}?v=${new Date(blobs[0].uploadedAt).getTime()}`, { cache: "no-store" });
      return res.ok ? await res.json() : {};
    }
    if (process.env.VERCEL) return {};
    return JSON.parse(await fs.readFile(LOCAL, "utf8"));
  } catch {
    return {};
  }
}

// Cached, and cleared the moment you save. The 5-minute expiry only repairs a one-off read failure.
export const getOverrides = unstable_cache(readRaw, ["site-overrides"], { tags: [TAG], revalidate: 300 });

function build(overrides) {
  let clean = {};
  try { clean = validate(overrides); } catch { /* ignore a corrupt file, fall back to defaults */ }
  return applyDerived(deepMerge(defaults, clean));
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
  const diff = diffFromDefaults(validate(input), pickEditable(defaults)) || {};
  const body = JSON.stringify(diff, null, 2);
  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put(KEY, body, { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
  } else {
    await fs.mkdir(path.dirname(LOCAL), { recursive: true });
    await fs.writeFile(LOCAL, body);
  }
  revalidateTag(TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return applyDerived(deepMerge(defaults, diff));
}

export function defaultsEditable() {
  return pickEditable(defaults);
}
