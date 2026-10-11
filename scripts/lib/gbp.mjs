// Google Business Profile API client (reviews). Credentials come from env vars only.

const TOKEN_URL = process.env.GBP_TOKEN_URL || "https://oauth2.googleapis.com/token";
const ACCOUNTS_BASE = process.env.GBP_ACCOUNTS_BASE || "https://mybusinessaccountmanagement.googleapis.com/v1";
const INFO_BASE = process.env.GBP_INFO_BASE || "https://mybusinessbusinessinformation.googleapis.com/v1";
const V4_BASE = process.env.GBP_V4_BASE || "https://mybusiness.googleapis.com/v4";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}. Set it as an environment variable (or a GitHub Actions secret).`);
  return v;
}

export async function getAccessToken() {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: need("GBP_CLIENT_ID"),
      client_secret: need("GBP_CLIENT_SECRET"),
      refresh_token: need("GBP_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Google sign-in failed (${res.status}): ${data.error_description || data.error || "unknown error"}`);
  }
  return data.access_token;
}

async function api(token, url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const text = await res.text();
  let body = {};
  try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text.slice(0, 200) }; }
  if (!res.ok) {
    const err = new Error(`Google API ${res.status} on ${new URL(url).pathname}: ${body?.error?.message || body.raw || "request failed"}`);
    err.status = res.status;
    throw err;
  }
  return body;
}

export async function resolveLocation(token) {
  const envA = process.env.GBP_ACCOUNT_ID;
  const envL = process.env.GBP_LOCATION_ID;
  if (envA && envL) {
    return { accountId: envA.replace(/^accounts\//, ""), locationId: envL.replace(/^locations\//, "") };
  }

  const { accounts = [] } = await api(token, `${ACCOUNTS_BASE}/accounts`);
  const found = [];
  for (const acc of accounts) {
    let pageToken = "";
    try {
      do {
        const q = new URLSearchParams({ readMask: "name,title", pageSize: "100" });
        if (pageToken) q.set("pageToken", pageToken);
        const data = await api(token, `${INFO_BASE}/${acc.name}/locations?${q}`);
        for (const l of data.locations || []) {
          found.push({ accountId: acc.name.split("/")[1], locationId: l.name.split("/")[1], title: l.title || "" });
        }
        pageToken = data.nextPageToken || "";
      } while (pageToken);
    } catch {
      // Accounts with no business locations (e.g. a personal account) can't list them; skip.
    }
  }

  let pick = found.length === 1 ? found[0] : found.find((l) => /varanasi\s*fun\s*city/i.test(l.title));
  if (!pick) {
    const list = found.map((l) => `  ${l.title || "(untitled)"}: GBP_ACCOUNT_ID=${l.accountId} GBP_LOCATION_ID=${l.locationId}`).join("\n");
    throw new Error(`Could not pick a location automatically. Set GBP_ACCOUNT_ID and GBP_LOCATION_ID. Found:\n${list || "  (none — is this Google account an Owner/Manager of the profile?)"}`);
  }
  if (!envA || !envL) {
    console.log(`Using location "${pick.title}". To skip discovery next time set GBP_ACCOUNT_ID=${pick.accountId} GBP_LOCATION_ID=${pick.locationId}`);
  }
  return { accountId: pick.accountId, locationId: pick.locationId };
}

export async function listReviewsPage(token, { accountId, locationId }, pageToken = "") {
  const q = new URLSearchParams({ pageSize: "50" });
  if (pageToken) q.set("pageToken", pageToken);
  return api(token, `${V4_BASE}/accounts/${accountId}/locations/${locationId}/reviews?${q}`);
}

export async function postReply(token, review, comment) {
  return api(token, `${V4_BASE}/${review.name}/reply`, { method: "PUT", body: JSON.stringify({ comment }) });
}
