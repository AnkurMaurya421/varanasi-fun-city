// Pulls real Google reviews and writes the ones to feature on the homepage to data/google-reviews.json.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAccessToken, resolveLocation, listReviewsPage } from "./lib/gbp.mjs";
import { pickFeatured } from "./lib/reviews.mjs";
import { siteConfig } from "../siteConfig.js";

const OUT = process.env.GOOGLE_REVIEWS_OUT || path.join(path.dirname(fileURLToPath(import.meta.url)), "../data/google-reviews.json");
const SCAN_PAGES = Number(process.env.SYNC_PAGES || 6); // newest ~300 reviews

try {
  const token = await getAccessToken();
  const loc = await resolveLocation(token);

  const reviews = [];
  let rating = null;
  let total = null;
  let pageToken = "";
  for (let i = 0; i < SCAN_PAGES; i++) {
    const page = await listReviewsPage(token, loc, pageToken);
    reviews.push(...(page.reviews || []));
    rating = page.averageRating ?? rating;
    total = page.totalReviewCount ?? total;
    pageToken = page.nextPageToken || "";
    if (!pageToken) break;
  }

  const featured = pickFeatured(reviews);
  const next = {
    fetchedAt: new Date().toISOString(),
    rating: rating ? Math.round(rating * 10) / 10 : null,
    total,
    reviewsUrl: siteConfig.contact.mapUrl,
    reviews: featured,
  };

  const strip = ({ fetchedAt, ...rest }) => JSON.stringify(rest);
  let prev = null;
  try { prev = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch {}
  if (prev && strip(prev) === strip(next)) {
    console.log("No changes to the featured reviews.");
  } else {
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
    console.log(`Saved ${featured.length} featured reviews (rating ${next.rating}, ${total} total).`);
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
