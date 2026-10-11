import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE, tokenOk, sameOrigin } from "@/lib/adminAuth";
import { readOverridesFresh, saveSettings, defaultsEditable, storageReady } from "@/lib/siteConfigStore";
import { pickEditable, ValidationError } from "@/lib/configSchema";

export const dynamic = "force-dynamic";

async function authed() {
  return tokenOk((await cookies()).get(COOKIE)?.value);
}

async function snapshot() {
  const effective = await (async () => {
    // read the stored file directly so the form always shows what is really saved
    const { deepMerge, validate, applyDerived } = await import("@/lib/configSchema");
    const { siteConfig } = await import("@/siteConfig");
    let clean = {};
    try { clean = validate(await readOverridesFresh()); } catch {}
    return applyDerived(deepMerge(siteConfig, clean));
  })();
  return { settings: pickEditable(effective), defaults: defaultsEditable(), storageReady: storageReady() };
}

export async function GET() {
  if (!(await authed())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  return NextResponse.json(await snapshot());
}

export async function PUT(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Bad request" }, { status: 403 });
  if (!(await authed())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.settings !== "object") return NextResponse.json({ error: "Missing settings" }, { status: 400 });
  try {
    await saveSettings(body.settings);
    return NextResponse.json({ ok: true, ...(await snapshot()) });
  } catch (err) {
    const status = err instanceof ValidationError ? 400 : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}
