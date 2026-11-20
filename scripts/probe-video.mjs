// Read-only check of one Google Business Profile (settings only; changes nothing).
// (Kept under this name because the manual "Probe" step in the sync workflow already runs it.)
import { getAccessToken } from "./lib/gbp.mjs";

const LOCATION_ID = process.env.PROBE_LOCATION_ID || "1266956104084762458"; // the "Varanasi Fun City Wedding Lawn" profile

try {
  const token = await getAccessToken();
  const mask = ["title", "categories", "openInfo", "regularHours", "profile", "websiteUri", "phoneNumbers", "metadata", "storefrontAddress"].join(",");
  const res = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/locations/${LOCATION_ID}?readMask=${mask}`, { headers: { Authorization: `Bearer ${token}` } });
  const d = await res.json();
  if (!res.ok) throw new Error(`Business Information API ${res.status}: ${d?.error?.message}`);
  const periods = (d.regularHours?.periods || []).map((p) => `${p.openDay} ${p.openTime?.hours ?? 0}:${String(p.openTime?.minutes ?? 0).padStart(2, "0")}-${p.closeTime?.hours ?? 0}:${String(p.closeTime?.minutes ?? 0).padStart(2, "0")}`);
  console.log(JSON.stringify({
    title: d.title,
    primaryCategory: d.categories?.primaryCategory?.displayName,
    additionalCategories: (d.categories?.additionalCategories || []).map((c) => c.displayName),
    openStatus: d.openInfo?.status,
    regularHours: periods,
    descriptionLength: (d.profile?.description || "").length,
    website: d.websiteUri,
    phones: { primary: d.phoneNumbers?.primaryPhone, additional: d.phoneNumbers?.additionalPhones || [] },
    mapsUri: d.metadata?.mapsUri,
    newReviewUri: d.metadata?.newReviewUri,
    placeId: d.metadata?.placeId,
    hasVoiceOfMerchant: d.metadata?.hasVoiceOfMerchant,
    duplicateLocation: d.metadata?.duplicateLocation || null,
  }, null, 2));
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
