// Replies to new Google reviews (max 20 per rolling 24h by default).
// SAFE BY DEFAULT: nothing is posted unless DRY_RUN=false is set explicitly.
//  - 4-5 star reviews with no complaint wording get a short templated reply.
//  - Everything else is held for a human and listed in review-hold.md.
import fs from "node:fs";
import { getAccessToken, resolveLocation, listReviewsPage, postReply, sleep } from "./lib/gbp.mjs";
import { decide, starsOf } from "./lib/reviews.mjs";
import { aiEnabled, aiReply } from "./lib/ai.mjs";

const DRY = process.env.DRY_RUN !== "false";
const MAX = Number(process.env.MAX_REPLIES || 20);
const MIN_STARS = Number(process.env.REPLY_MIN_STARS || 4);
const MAX_PAGES = Number(process.env.MAX_PAGES || 40);
const MIN_PAGES = 6; // always scan the newest ~300 so the 24h count is accurate
const HOLD_DAYS = Number(process.env.HOLD_WINDOW_DAYS || 30);
const DELAY_MS = Number(process.env.REPLY_DELAY_MS ?? 1500);
const HOLD_FILE = process.env.HOLD_REPORT || "review-hold.md";
const DAY = 24 * 60 * 60 * 1000;

const log = (line) => {
  console.log(line);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, line + "\n");
};

try {
  fs.rmSync(HOLD_FILE, { force: true });
  const token = await getAccessToken();
  const loc = await resolveLocation(token);
  log(`Mode: ${DRY ? "DRY RUN (nothing will be posted)" : "LIVE"} · cap ${MAX} per 24h · replying to ${MIN_STARS}+ stars`);

  const toReply = [];
  const held = [];
  let heldOlder = 0;
  let repliedLast24h = 0;
  let pages = 0;
  let pageToken = "";
  const now = Date.now();

  // Pages are newest first. Count replies from the last 24h, then keep scanning until we have enough to answer.
  do {
    const page = await listReviewsPage(token, loc, pageToken);
    pages++;
    for (const review of page.reviews || []) {
      const repliedAt = review.reviewReply?.updateTime && new Date(review.reviewReply.updateTime).getTime();
      if (repliedAt && now - repliedAt < DAY) repliedLast24h++;
      const verdict = decide(review, { minStars: MIN_STARS });
      if (verdict.action === "reply") toReply.push({ review, verdict });
      else if (verdict.action === "hold") {
        if (now - new Date(review.createTime).getTime() <= HOLD_DAYS * DAY) held.push({ review, verdict });
        else heldOlder++;
      }
    }
    pageToken = page.nextPageToken || "";
    const remaining = Math.max(0, MAX - repliedLast24h);
    if (pages >= MIN_PAGES && toReply.length >= remaining) break;
  } while (pageToken && pages < MAX_PAGES);

  const budget = Math.max(0, MAX - repliedLast24h);
  log(`Scanned ${pages} page(s). Replies already posted in the last 24h: ${repliedLast24h}. Budget left today: ${budget}.`);

  const used = new Set();
  const useAi = aiEnabled();
  let aiOff = false;
  let aiFails = 0;
  let aiCount = 0;
  let templateCount = 0;
  let posted = 0;
  let failures = 0;
  let consecutive = 0;
  for (const { review } of toReply.slice(0, budget)) {
    const verdict = decide(review, { minStars: MIN_STARS, avoid: used });
    let comment = verdict.comment; // template reply is always the safe fallback
    let source = "template";
    if (useAi && !aiOff) {
      const r = await aiReply(review);
      if (r.ok) { comment = r.comment; source = "ai"; aiFails = 0; }
      else {
        source = `template (${r.reason})`;
        aiFails++;
        if (r.fatal || aiFails >= 3) { aiOff = true; log(`AI turned off for the rest of this run: ${r.reason}`); }
      }
    }
    if (source === "ai") aiCount++; else templateCount++;
    const who = review.reviewer?.isAnonymous ? "anonymous" : (review.reviewer?.displayName || "reviewer").split(" ")[0];
    if (DRY) {
      log(`[dry run] ${starsOf(review)}★ ${who} (${source}) → ${comment}`);
      posted++;
      continue;
    }
    try {
      await postReply(token, review, comment);
      posted++;
      consecutive = 0;
      log(`Replied to ${starsOf(review)}★ review by ${who} (${source})`);
    } catch (err) {
      failures++;
      consecutive++;
      log(`FAILED reply to ${who}: ${err.message}`);
      if (err.status === 429 || consecutive >= 3) { log("Stopping early after repeated errors."); break; }
    }
    await sleep(DELAY_MS);
  }

  log(`Reply source: ${useAi ? `AI (Groq) ${aiCount}, template fallback ${templateCount}` : `templates only (set GROQ_API_KEY to enable AI)`}`);
  log(`${DRY ? "Would post" : "Posted"} ${posted} repl${posted === 1 ? "y" : "ies"}; ${held.length} held for a person (last ${HOLD_DAYS} days)${heldOlder ? `, ${heldOlder} older held` : ""}.`);

  if (held.length) {
    const rows = held.map(({ review, verdict }) => {
      const name = review.reviewer?.isAnonymous ? "Anonymous" : (review.reviewer?.displayName || "Reviewer");
      const date = (review.createTime || "").slice(0, 10);
      const link = review.reviewReplyUrl || "";
      return `- ${starsOf(review)}★ · ${name} · ${date} · ${verdict.reason}${link ? ` · [reply on Google](${link})` : ""}`;
    });
    fs.writeFileSync(HOLD_FILE, `These Google reviews were not auto-replied. Please answer them personally in Google Business Profile.\n\n${rows.join("\n")}\n`);
  }

  if (!DRY && failures > 0 && posted === 0) process.exit(1);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
