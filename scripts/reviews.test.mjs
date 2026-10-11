// Run with: npm run reviews:test  (uses a local mock of the Google APIs — never touches your real profile)
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { decide, pickFeatured, flagged, originalText } from "./lib/reviews.mjs";

const rev = (id, stars, comment, extra = {}) => ({
  name: `accounts/1/locations/2/reviews/${id}`,
  reviewId: id,
  reviewer: { displayName: extra.name ?? "Rahul Kumar", isAnonymous: extra.anon ?? false },
  starRating: ["", "ONE", "TWO", "THREE", "FOUR", "FIVE"][stars],
  comment,
  createTime: new Date(Date.now() - (extra.ageHours ?? 1) * 3600 * 1000).toISOString(),
  ...(extra.reply ? { reviewReply: { comment: "thanks", updateTime: new Date(Date.now() - 3600 * 1000).toISOString() } } : {}),
});

test("language, flags and tiers", () => {
  assert.equal(decide(rev("a", 5, "Amazing park, kids loved the wave pool!")).action, "reply");
  assert.match(decide(rev("a", 5, "Amazing park, kids loved the wave pool!")).comment, /Rahul/);
  assert.equal(decide(rev("b", 5, "बहुत मज़ा आया, शानदार जगह")).reason, "hindi");
  assert.equal(decide(rev("c", 5, "Great fun but the food was overpriced")).action, "hold");
  assert.equal(decide(rev("d", 3, "Okay experience overall")).action, "hold");
  assert.equal(decide(rev("e", 1, "Terrible")).action, "hold");
  assert.equal(decide(rev("f", 5, "")).action, "reply");
  assert.equal(decide(rev("g", 5, "Great", { reply: true })).action, "skip");
  assert.equal(decide(rev("h", 5, "बढ़िया है लेकिन महंगा")).action, "hold");
  assert.doesNotMatch(decide(rev("i", 5, "Loved it", { anon: true })).comment, /Hi ,/);
  assert.equal(flagged("Loved every minute of it"), null);
  assert.equal(originalText("(Translated by Google)\nNice\n\n(Original)\nबढ़िया"), "बढ़िया");
});

test("names are tidied and a batch does not repeat the same wording", () => {
  assert.match(decide(rev("n1", 5, "Great", { name: "SAMEER K" })).comment, /^Hi Sameer!/);
  assert.match(decide(rev("n2", 5, "Great", { name: "abhay" })).comment, /^Hi Abhay!/);
  assert.match(decide(rev("n3", 5, "Great", { name: "McDonald Lee" })).comment, /^Hi McDonald!/);
  const used = new Set();
  const texts = Array.from({ length: 10 }, (_, i) =>
    decide(rev(`batch${i}`, 5, "Lovely day", { name: "Same" }), { avoid: used }).comment);
  assert.equal(new Set(texts).size, 10);
});

test("featured reviews are positive, named, readable and capped", () => {
  const list = [
    rev("1", 5, "Wonderful day out with the whole family, wave pool was superb."),
    rev("2", 5, "Short"),
    rev("3", 5, "This place was great but the queue at the slides was far too long.", { name: "A" }),
    rev("4", 3, "An average day out, nothing special about the rides at all here."),
    rev("5", 5, "Amazing experience, staff were helpful and everything was clean.", { anon: true }),
    ...Array.from({ length: 10 }, (_, i) => rev(`x${i}`, 5, `Lovely time number ${i}, the rain dance and rides were really enjoyable.`)),
  ];
  const out = pickFeatured(list);
  assert.equal(out.length, 6);
  assert.ok(out.every((r) => r.stars >= 4 && r.name && r.text.length >= 40));
  assert.ok(!out.some((r) => ["2", "3", "4", "5"].includes(r.id)));
});

// ---- mock Google server ----
let server, base, puts, reviews, tokenOk;
before(async () => {
  server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    const send = (code, obj) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(obj)); };
    if (url.pathname === "/token") return tokenOk ? send(200, { access_token: "t" }) : send(400, { error: "invalid_grant", error_description: "Token revoked" });
    if (url.pathname === "/v1/accounts") return send(200, { accounts: [{ name: "accounts/1" }] });
    if (url.pathname === "/v1/accounts/1/locations") return send(200, { locations: [{ name: "locations/2", title: "Varanasi Fun City" }] });
    if (url.pathname === "/v4/accounts/1/locations/2/reviews" && req.method === "GET") {
      const start = Number(url.searchParams.get("pageToken") || 0);
      const slice = reviews.slice(start, start + 50);
      return send(200, { reviews: slice, averageRating: 4.34, totalReviewCount: reviews.length, ...(start + 50 < reviews.length ? { nextPageToken: String(start + 50) } : {}) });
    }
    if (req.method === "PUT" && url.pathname.endsWith("/reply")) {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => { puts.push({ path: url.pathname, comment: JSON.parse(body).comment }); send(200, { comment: JSON.parse(body).comment }); });
      return;
    }
    send(404, { error: { message: "not found" } });
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const run = (script, env = {}) => new Promise((resolve) => {
  const hold = path.join(os.tmpdir(), `hold-${Math.random()}.md`);
  const out = path.join(os.tmpdir(), `reviews-${Math.random()}.json`);
  const child = spawn("node", [`scripts/${script}`], {
    cwd: path.resolve(import.meta.dirname, ".."),
    env: {
      PATH: process.env.PATH, GBP_CLIENT_ID: "id", GBP_CLIENT_SECRET: "s", GBP_REFRESH_TOKEN: "r",
      GBP_TOKEN_URL: `${base}/token`, GBP_ACCOUNTS_BASE: `${base}/v1`, GBP_INFO_BASE: `${base}/v1`, GBP_V4_BASE: `${base}/v4`,
      REPLY_DELAY_MS: "0", HOLD_REPORT: hold, GOOGLE_REVIEWS_OUT: out, ...env,
    },
  });
  let stdout = "", stderr = "";
  child.stdout.on("data", (c) => (stdout += c));
  child.stderr.on("data", (c) => (stderr += c));
  child.on("close", (status) => resolve({
    status, stdout, stderr,
    hold: fs.existsSync(hold) ? fs.readFileSync(hold, "utf8") : "",
    out: fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, "utf8")) : null,
  }));
});

const seed = () => {
  puts = [];
  tokenOk = true;
  reviews = [
    ...Array.from({ length: 40 }, (_, i) => rev(`ok${i}`, 5, `Fantastic day out number ${i}, the kids loved the wave pool and slides.`, { ageHours: i + 2 })),
    rev("low1", 1, "Terrible experience", { ageHours: 3 }),
    rev("low2", 3, "Average, nothing special", { ageHours: 4 }),
    rev("but1", 5, "Great but way too crowded and expensive", { ageHours: 5 }),
    ...Array.from({ length: 30 }, (_, i) => rev(`hi${i}`, 5, "बहुत बढ़िया जगह, बच्चों को मज़ा आया", { ageHours: 60 + i })),
    ...Array.from({ length: 40 }, (_, i) => rev(`old${i}`, 4, `Nice park, enjoyed it a lot ${i}`, { ageHours: 24 * 90 + i })),
  ];
};

test("dry run (the default) posts nothing but plans replies and holds complaints", async () => {
  seed();
  const r = await run("reply-reviews.mjs");
  assert.equal(r.status, 0, r.stderr);
  assert.equal(puts.length, 0);
  assert.match(r.stdout, /DRY RUN/);
  assert.match(r.stdout, /Would post 20 replies/);
  assert.match(r.hold, /1★/);
  assert.match(r.hold, /3★/);
  assert.match(r.hold, /mentions "but"/);
});

test("live run posts at most 20, never to held reviews", async () => {
  seed();
  const r = await run("reply-reviews.mjs", { DRY_RUN: "false" });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(puts.length, 20);
  assert.ok(!puts.some((p) => /low1|low2|but1/.test(p.path)));
  assert.ok(puts.every((p) => p.comment.length > 20 && p.comment.length < 600));
  assert.equal(new Set(puts.map((p) => p.path)).size, 20);
});

test("replies already sent in the last 24h count against the cap", async () => {
  seed();
  for (let i = 0; i < 8; i++) reviews[i] = rev(`done${i}`, 5, "Great", { reply: true, ageHours: 1 });
  const r = await run("reply-reviews.mjs", { DRY_RUN: "false" });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(puts.length, 12);
});

test("bad credentials fail loudly", async () => {
  seed();
  tokenOk = false;
  const r = await run("reply-reviews.mjs", { DRY_RUN: "false" });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /Google sign-in failed/);
  assert.equal(puts.length, 0);
});

test("sync writes featured reviews with the real rating and total", async () => {
  seed();
  const r = await run("sync-reviews.mjs");
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.out.rating, 4.3);
  assert.equal(r.out.total, reviews.length);
  assert.equal(r.out.reviews.length, 6);
  assert.ok(r.out.reviews.every((x) => x.stars >= 4 && x.name));
});
