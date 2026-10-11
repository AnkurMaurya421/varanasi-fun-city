import { NextResponse } from "next/server";
import { COOKIE, adminConfigured, passwordOk, makeToken, cookieOptions, lockedOut, recordFailure, clearFailures, sameOrigin } from "@/lib/adminAuth";

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Bad request" }, { status: 403 });
  if (!adminConfigured()) return NextResponse.json({ error: "Admin isn't set up yet (ADMIN_PASSWORD is missing)." }, { status: 503 });

  const ip = (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  if (lockedOut(ip)) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });

  const { password } = await request.json().catch(() => ({}));
  if (!passwordOk(password)) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 700));
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  clearFailures(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, makeToken(), cookieOptions);
  return res;
}
