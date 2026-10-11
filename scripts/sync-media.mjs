// Copies your Google Business Profile photos into the site (public/google-media + data/google-media.json).
// Google image links are not permanent, so we download the files instead of hotlinking them.
// Videos can't be played via the API (only a preview image is provided), so they link back to the profile.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAccessToken, resolveLocation, listAllMedia } from "./lib/gbp.mjs";
import { WEDDING_PHOTOS } from "./lib/media-manifest.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = process.env.GOOGLE_MEDIA_OUT || path.join(root, "data/google-media.json");
const DIR = process.env.GOOGLE_MEDIA_DIR || path.join(root, "public/google-media");
const PUBLIC_PREFIX = process.env.GOOGLE_MEDIA_PREFIX || "/google-media";
const PHOTO_LIMIT = Number(process.env.MEDIA_PHOTO_LIMIT || 36);
const VIDEO_LIMIT = Number(process.env.MEDIA_VIDEO_LIMIT || 8);
const SIZE = "w900"; // gallery thumbnails don't need full resolution; also part of the file name so a size change re-downloads
const SKIP_CATEGORIES = new Set(["PROFILE"]); // the logo
const ours = new Set(WEDDING_PHOTOS.map((p) => p.description)); // already shown in the site's own wedding gallery

const LABELS = {
  COVER: "Cover", EXTERIOR: "Outside", INTERIOR: "Inside", PRODUCT: "Rides", AT_WORK: "Our team", FOOD_AND_DRINK: "Food & drink",
  MENU: "Menu", COMMON_AREA: "Common area", ROOMS: "Rooms", TEAMS: "Our team", ADDITIONAL: "More photos",
};

async function download(url, dest) {
  const bare = url.replace(/=[swh]\d+[^/]*$/i, "");
  for (const candidate of [`${bare}=${SIZE}`, url]) {
    try {
      const res = await fetch(candidate, { signal: AbortSignal.timeout(30000) });
      if (!res.ok || !(res.headers.get("content-type") || "").startsWith("image/")) continue;
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      return true;
    } catch { /* try the next candidate */ }
  }
  return false;
}

try {
  const token = await getAccessToken();
  const loc = await resolveLocation(token);
  const all = await listAllMedia(token, loc);

  const usable = all
    .filter((m) => m.googleUrl)
    .filter((m) => !SKIP_CATEGORIES.has(m.locationAssociation?.category))
    .filter((m) => !ours.has((m.description || "").trim()))
    .sort((a, b) => new Date(b.createTime || 0) - new Date(a.createTime || 0));
  const photosOnly = usable.filter((m) => m.mediaFormat !== "VIDEO").slice(0, PHOTO_LIMIT);
  const videosOnly = usable.filter((m) => m.mediaFormat === "VIDEO").slice(0, VIDEO_LIMIT);
  const chosen = [...photosOnly, ...videosOnly];

  fs.mkdirSync(DIR, { recursive: true });
  const items = [];
  for (const m of chosen) {
    const id = m.name.split("/").pop().replace(/[^A-Za-z0-9_-]/g, "");
    const file = `${id}_${SIZE}.jpg`;
    const dest = path.join(DIR, file);
    if (!fs.existsSync(dest) && !(await download(m.googleUrl, dest))) { console.log(`Could not download ${id}; skipping.`); continue; }
    const category = m.locationAssociation?.category || "ADDITIONAL";
    items.push({
      id,
      file: `${PUBLIC_PREFIX}/${file}`,
      video: m.mediaFormat === "VIDEO",
      category,
      label: LABELS[category] || "Photos",
      createdAt: m.createTime || null,
      width: m.dimensions?.widthPixels || null,
      height: m.dimensions?.heightPixels || null,
      credit: m.attribution?.profileName || null,
    });
  }

  // remove files that are no longer on the profile
  const keep = new Set(items.map((i) => i.file.split("/").pop()));
  for (const f of fs.readdirSync(DIR)) if (f.endsWith(".jpg") && !keep.has(f)) fs.rmSync(path.join(DIR, f));

  const next = {
    fetchedAt: new Date().toISOString(),
    total: all.length,
    videos: all.filter((m) => m.mediaFormat === "VIDEO").length,
    items,
  };
  const strip = ({ fetchedAt, ...rest }) => JSON.stringify(rest);
  let prev = null;
  try { prev = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch {}
  if (prev && strip(prev) === strip(next)) console.log("No changes to the Google photos.");
  else {
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
    console.log(`Saved ${items.length} photo(s) (${all.length} on the profile, ${next.videos} video preview(s)).`);
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
