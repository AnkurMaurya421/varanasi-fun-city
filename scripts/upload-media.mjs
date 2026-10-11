// One-off: uploads the real wedding-venue photos to the Google Business Profile.
// SAFE BY DEFAULT: only uploads when DRY_RUN=false. Photos are fetched by Google from our live site,
// so each one is checked to be reachable first. Skips photos whose description is already on the profile.
import { getAccessToken, resolveLocation, listAllMedia, createPhoto } from "./lib/gbp.mjs";
import { WEDDING_PHOTOS, SITE_URL } from "./lib/media-manifest.mjs";

const DRY = process.env.DRY_RUN !== "false";

try {
  const token = await getAccessToken();
  const loc = await resolveLocation(token);
  console.log(`Mode: ${DRY ? "DRY RUN (nothing will be uploaded)" : "LIVE"}`);

  const existing = await listAllMedia(token, loc);
  const have = new Set(existing.map((m) => (m.description || "").trim()).filter(Boolean));
  console.log(`Profile has ${existing.length} media item(s); ${have.size} with descriptions to compare against.`);

  let done = 0;
  const failed = [];
  for (const photo of WEDDING_PHOTOS) {
    const sourceUrl = `${SITE_URL}/${photo.file}`;
    if (photo.uploaded) { console.log(`SKIP (uploaded earlier): ${photo.file}`); continue; }
    if (have.has(photo.description)) { console.log(`SKIP (already on profile): ${photo.file}`); continue; }
    const head = await fetch(sourceUrl, { method: "HEAD" }).catch(() => null);
    if (!head?.ok || !(head.headers.get("content-type") || "").startsWith("image/")) {
      console.log(`SKIP (not reachable as an image at ${sourceUrl}): ${photo.file}`);
      continue;
    }
    if (DRY) { console.log(`[dry run] would upload ${photo.file} as ${photo.category}: "${photo.description}"`); done++; continue; }
    try {
      const created = await createPhoto(token, loc, { category: photo.category, sourceUrl, description: photo.description });
      console.log(`Uploaded ${photo.file} as ${photo.category} → ${created.name || "ok"}`);
      done++;
    } catch (err) {
      console.log(`FAILED ${photo.file}: ${err.message}`);
      failed.push(photo.file);
    }
  }
  console.log(`${DRY ? "Would upload" : "Uploaded"} ${done} photo(s).`);
  if (failed.length) { console.log(`${failed.length} failed: ${failed.join(", ")}`); process.exit(1); }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
