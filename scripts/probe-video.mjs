// One-off check: does Google serve a playable video file for the profile's videos?
// Prints only content types and sizes (no secrets). Run via the "Sync Google reviews and photos" workflow's probe step.
import { getAccessToken, resolveLocation, listAllMedia } from "./lib/gbp.mjs";

try {
  const token = await getAccessToken();
  const loc = await resolveLocation(token);
  const videos = (await listAllMedia(token, loc)).filter((m) => m.mediaFormat === "VIDEO").slice(0, 3);
  console.log(`Videos on profile: ${videos.length} probed`);
  for (const m of videos) {
    console.log("fields:", Object.keys(m).join(","), "| format:", m.mediaFormat, "| duration:", m.videoMetadata?.durationMillis ?? "n/a");
    const bare = m.googleUrl.replace(/=[swh]\d+[^/]*$/i, "");
    for (const suffix of ["", "=m18", "=m22", "=m37", "=dv"]) {
      const url = suffix ? bare + suffix : m.googleUrl;
      try {
        const res = await fetch(url, { headers: { Range: "bytes=0-1023" }, signal: AbortSignal.timeout(20000) });
        console.log(`  ${suffix || "(as given)"}: ${res.status} ${res.headers.get("content-type")} total=${res.headers.get("content-range") || res.headers.get("content-length")}`);
      } catch (e) {
        console.log(`  ${suffix || "(as given)"}: failed (${e.message})`);
      }
    }
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
