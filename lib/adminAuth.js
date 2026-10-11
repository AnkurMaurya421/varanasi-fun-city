// Single-password admin login. The password lives only in the ADMIN_PASSWORD environment variable.
import crypto from "node:crypto";

export const COOKIE = "vfc_admin";
const TTL_MS = 12 * 60 * 60 * 1000;

const sha = (s) => crypto.createHash("sha256").update(s).digest();
const key = () => sha(`vfc-admin-session:${process.env.ADMIN_PASSWORD || ""}`);
const sign = (payload) => crypto.createHmac("sha256", key()).update(payload).digest("hex");

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function passwordOk(input) {
  if (!adminConfigured() || typeof input !== "string") return false;
  return crypto.timingSafeEqual(sha(input), sha(process.env.ADMIN_PASSWORD));
}

export function makeToken() {
  const exp = String(Date.now() + TTL_MS);
  return `${exp}.${sign(exp)}`;
}

export function tokenOk(token) {
  if (!adminConfigured() || typeof token !== "string") return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: TTL_MS / 1000,
};

// Best-effort brute-force guard (per server instance).
const fails = new Map();
export function lockedOut(ip) {
  const f = fails.get(ip);
  return Boolean(f && f.until > Date.now());
}
export function recordFailure(ip) {
  const f = fails.get(ip) || { n: 0, until: 0 };
  f.n += 1;
  if (f.n >= 5) { f.until = Date.now() + 15 * 60 * 1000; f.n = 0; }
  fails.set(ip, f);
}
export function clearFailures(ip) {
  fails.delete(ip);
}

// Reject cross-site requests on top of the SameSite cookie.
export function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).host === request.headers.get("host"); } catch { return false; }
}
