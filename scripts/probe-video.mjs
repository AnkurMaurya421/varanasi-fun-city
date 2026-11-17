// Read-only diagnostic of the Google Business Profile (categories, hours, status). Prints settings only; changes nothing.
// (Kept under this name because the manual "Probe" step in the sync workflow already runs it.)
import { getAccessToken, resolveLocation } from "./lib/gbp.mjs";

try {
  const token = await getAccessToken();
  const { locationId } = await resolveLocation(token);
  const mask = ["name", "title", "categories", "openInfo", "regularHours", "specialHours", "profile", "websiteUri", "phoneNumbers", "metadata", "storefrontAddress", "latlng", "serviceItems", "labels"].join(",");
  const res = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/locations/${locationId}?readMask=${mask}`, { headers: { Authorization: `Bearer ${token}` } });
  const d = await res.json();
  if (!res.ok) throw new Error(`Business Information API ${res.status}: ${d?.error?.message}`);

  const periods = (d.regularHours?.periods || []).map((p) => `${p.openDay} ${p.openTime?.hours ?? 0}:${String(p.openTime?.minutes ?? 0).padStart(2, "0")}-${p.closeTime?.hours ?? 0}:${String(p.closeTime?.minutes ?? 0).padStart(2, "0")}`);
  console.log(JSON.stringify({
    title: d.title,
    primaryCategory: d.categories?.primaryCategory?.displayName,
    additionalCategories: (d.categories?.additionalCategories || []).map((c) => c.displayName),
    openStatus: d.openInfo?.status,
    openingDate: d.openInfo?.openingDate,
    regularHours: periods,
    specialHoursCount: d.specialHours?.specialHourPeriods?.length || 0,
    descriptionLength: (d.profile?.description || "").length,
    descriptionStart: (d.profile?.description || "").slice(0, 160),
    website: d.websiteUri,
    phones: { primary: Boolean(d.phoneNumbers?.primaryPhone), additional: (d.phoneNumbers?.additionalPhones || []).length },
    hasVoiceOfMerchant: d.metadata?.hasVoiceOfMerchant,
    canModifyServiceList: d.metadata?.canModifyServiceList,
    duplicateLocation: d.metadata?.duplicateLocation || null,
    placeId: d.metadata?.placeId,
    address: d.storefrontAddress,
    latlng: d.latlng,
    serviceItems: (d.serviceItems || []).map((s) => s.structuredServiceItem?.description || s.freeFormServiceItem?.label?.displayName).filter(Boolean),
    labels: d.labels || [],
  }, null, 2));
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
