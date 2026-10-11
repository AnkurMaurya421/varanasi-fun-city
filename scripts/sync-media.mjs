// Copies your Google Business Profile photos into the site (public/google-media + data/google-media.json).
// Google image links are not permanent, so we download the files instead of hotlinking them.
// Videos: the API only gives a preview image, but Google also serves a compressed MP4 at "<url>=m18" (~1-2MB), which we copy too.
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
const SIZE = "w900"; // gallery thumbnails don't need full resolution
const TAG = "w900j"; // part of the file name, so changing size/format re-downloads everything
const SKIP_CATEGORIES = new Set(["PROFILE"]); // the logo
const ours = new Set(WEDDING_PHOTOS.map((p) => p.description)); // already shown in the site's own wedding gallery

const LABELS = {
  COVER: "Cover", EXTERIOR: "Outside", INTERIOR: "Inside", PRODUCT: "Rides", AT_WORK: "Our team", FOOD_AND_DRINK: "Food & drink",
  MENU: "Menu", COMMON_AREA: "Common area", ROOMS: "Rooms", TEAMS: "Our team", ADDITIONAL: "More photos",
};

// Google serves lossless PNG by default (700KB+). "-rj" asks for a real, compressed JPEG.
async function download(url, dest) {
  const bare = url.replace(/=[swh]\d+[^/]*$/i, "");
  let fallback = null;
  for (const candidate of [`${bare}=${SIZE}-rj`, `${bare}=${SIZE}`, url]) {
    try {
      const res = await fetch(candidate, { signal: AbortSignal.timeout(30000) });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !type.startsWith("image/")) continue;
      const bytes = Buffer.from(await res.arrayBuffer());
      if (type.includes("jpeg")) { fs.writeFileSync(dest, bytes); return true; }
      fallback ??= bytes;
    } catch { /* try the next candidate */ }
  }
  if (!fallback) return false;
  fs.writeFileSync(dest, fallback);
  return true;
}

async function downloadVideo(url, dest) {
  const bare = url.replace(/=[swh]\d+[^/]*$/i, "");
  try {
    const res = await fetch(`${bare}=m18`, { signal: AbortSignal.timeout(120000) });
    if (!res.ok || !(res.headers.get("content-type") || "").startsWith("video/")) return false;
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length > 15_000_000) return false;
    fs.writeFileSync(dest, bytes);
    return true;
  } catch { return false; }
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
    const file = `${id}_${TAG}.jpg`;
    const dest = path.join(DIR, file);
    if (!fs.existsSync(dest) && !(await download(m.googleUrl, dest))) { console.log(`Could not download ${id}; skipping.`); continue; }
    let videoFile = null;
    if (m.mediaFormat === "VIDEO") {
      const vname = `${id}_m18.mp4`;
      const vdest = path.join(DIR, vname);
      if (fs.existsSync(vdest) || (await downloadVideo(m.googleUrl, vdest))) videoFile = `${PUBLIC_PREFIX}/${vname}`;
      else console.log(`Could not download video ${id}; it will link to the profile.`);
    }
    const category = m.locationAssociation?.category || "ADDITIONAL";
    items.push({
      id,
      file: `${PUBLIC_PREFIX}/${file}`,
      video: m.mediaFormat === "VIDEO",
      videoFile,
      category,
      label: LABELS[category] || "Photos",
      createdAt: m.createTime || null,
      width: m.dimensions?.widthPixels || null,
      height: m.dimensions?.heightPixels || null,
      credit: m.attribution?.profileName || null,
    });
  }

  // remove files that are no longer on the profile
  const keep = new Set(items.flatMap((i) => [i.file, i.videoFile]).filter(Boolean).map((f) => f.split("/").pop()));
  for (const f of fs.readdirSync(DIR)) if ((f.endsWith(".jpg") || f.endsWith(".mp4")) && !keep.has(f)) fs.rmSync(path.join(DIR, f));

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
