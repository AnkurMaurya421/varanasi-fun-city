import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE, tokenOk, sameOrigin } from "@/lib/adminAuth";
import { saveSettings, getEditableSnapshot } from "@/lib/siteConfigStore";
import { ValidationError } from "@/lib/configSchema";
import { services } from "@/servicesConfig";
import { IMAGE_CHOICES } from "@/lib/imageChoices";

export const dynamic = "force-dynamic";

const pages = services.map((s) => ({ slug: s.slug, title: s.h1 }));

async function authed() {
  return tokenOk((await cookies()).get(COOKIE)?.value);
}

async function snapshot() {
  return { ...(await getEditableSnapshot()), pages, images: IMAGE_CHOICES };
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
