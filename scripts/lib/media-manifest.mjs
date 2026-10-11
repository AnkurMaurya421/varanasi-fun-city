// Real venue photos (from the venue's own promo video) to upload to the Google Business Profile.
// Google has no "wedding lawn" photo category, so each photo goes in the closest fitting one. Hotel-only
// categories (ROOMS, COMMON_AREA) are rejected for this business type, so only EXTERIOR/INTERIOR are used.
// "uploaded: true" marks photos already sent (confirmed in the Actions log) so a re-run never duplicates them.
// The crowd/reception shot is left out on purpose: it shows many guests' faces.
export const SITE_URL = process.env.SITE_URL || "https://www.varanasifuncity.com";

export const WEDDING_PHOTOS = [
  { file: "varanasi-fun-city-wedding-stage.jpg", category: "EXTERIOR", description: "Decorated wedding stage on the lawn at Varanasi Fun City", uploaded: true },
  { file: "varanasi-fun-city-banquet-hall.jpg", category: "INTERIOR", description: "Air-conditioned banquet hall at Varanasi Fun City", uploaded: true },
  { file: "varanasi-fun-city-wedding-entrance.jpg", category: "EXTERIOR", description: "Decorated wedding entrance walkway at Varanasi Fun City" },
  { file: "varanasi-fun-city-ac-room.jpg", category: "INTERIOR", description: "AC Deluxe Room for guest stays at Varanasi Fun City" },
];
