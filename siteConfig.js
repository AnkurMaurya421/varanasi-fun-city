// ============================================================
//  VARANASI FUN CITY — SITE CONFIG
//  All editable content lives here. No need to touch components.
// ============================================================

export const siteConfig = {

  // ----------------------------------------------------------
  //  PARK IDENTITY
  // ----------------------------------------------------------
  name: "Varanasi Fun City",
  tagline: "Water Park Where Everyone Feels the Thrill!",
  subTagline: "Varanasi's largest waterpark — slides, wave pool, rain dance & more.",
  logo: "/mainlogo.png",
  heroImage: "/main.jpg",
  reelVideo: "/waterparkvideo-lite.mp4",

  // ----------------------------------------------------------
  //  PARK STATUS
  //  Set isOpen: false during off-season to show a "closed" banner
  // ----------------------------------------------------------
  isOpen: false,                    // water park closed for the season
  reopeningText: "March 2027",      // shown wherever the closure is mentioned

  // ----------------------------------------------------------
  //  ANNOUNCEMENT BAR
  //  Rotates through these messages at the top of the page.
  //  status: "open" | "closed" | "info"
  // ----------------------------------------------------------
  announcements: [
    { status: "closed", label: "Park closed", text: "The water park is closed for the season and reopens in {reopening}" }, // {reopening} is replaced by reopeningText below
  ],

  // ----------------------------------------------------------
  //  SHIFTS / TIMINGS
  // ----------------------------------------------------------
  shifts: {
    day: {
      enabled: false,   // set true when the park reopens
      reopensMonth: "March 2027",
      label: "Day Shift",
      sublabel: "Sun-up splash",
      hours: "11:00 AM – 5:00 PM",
      days: "Open all 7 days",
      note: "Best for families with kids. Includes wave pool, rain dance and all slides.",
      icon: "sun",   // "sun" | "moon"
    },
    night: {
      enabled: false,   // set true when night shift season opens
      label: "Night Shift",
      sublabel: "After-dark splash",
      hours: "5:00 PM – 8:00 PM",
      days: "Open all 7 days",
      note: "Special slots for Families, Girls' Groups and Couples.",
      reopensMonth: "March 2027",  // shown when enabled: false
      icon: "moon",
    },
  },

  // ----------------------------------------------------------
  //  PRICING
  //  All amounts in INR. Set to null to hide a row.
  //  TODO: Confirm actual prices with park owner before going live.
  // ----------------------------------------------------------
  pricing: {
    weekday: {
      label: "Mon–Fri",
      day: {
        adult: 400,    // TODO: confirm
        kid: 300,      // TODO: confirm — kids 3ft–4ft
        toddler: 0,    // 0 = FREE, null = hide row
      },
      night: {
        adult: 400,    // TODO: confirm
        kid: 400,      // TODO: confirm
        toddler: 0,
      },
    },
    weekend: {
      label: "Sat–Sun",
      day: {
        adult: 500,    // TODO: confirm
        kid: 400,      // TODO: confirm
        toddler: 0,
      },
      night: {
        adult: 500,    // TODO: confirm
        kid: 500,      // TODO: confirm
        toddler: 0,
      },
    },
    holiday: {
      label: "Public Holidays",
      day: {
        adult: 500,    // TODO: confirm
        kid: 400,      // TODO: confirm
        toddler: 0,
      },
      night: {
        adult: 500,    // TODO: confirm
        kid: 500,      // TODO: confirm
        toddler: 0,
      },
    },
  },

  // Height labels used in pricing rows
  pricingMeta: {
    adult: "Above 4 ft",
    kid: "3 ft – 4 ft",
    toddler: "Under 3 ft",
  },

  // ----------------------------------------------------------
  //  EXTRA CHARGES
  // ----------------------------------------------------------
  extras: {
    locker: {
      label: "Locker",
      charge: 50,
      deposit: 200,
      note: "Refundable deposit",
    },
    costume: {
      label: "Costume Rental",
      compulsory: true,  // shows warning badge
      male: { charge: 50, deposit: 200 },
      female: { charge: 50, deposit: 200 },
    },
  },

  // ----------------------------------------------------------
  //  RIDES & ATTRACTIONS
  //  Add/remove ride objects freely. image is a path under /public.
  // ----------------------------------------------------------
  rides: [
    {
      id: "wave-pool",
      name: "Wave Pool",
      tag: "Signature",
      desc: "Ride the ocean right in Varanasi. ",
      image: "/night1.webp"
    },
    {
      id: "mega-slides",
      name: "Mega Slide Tower",
      tag: "Thrill",
      desc: "Cyclone,Pendulum,tornado and what not...we have extensive range of rides.",
      image: "/bigrides1.webp",
    },
    {
      id: "rain-dance",
      name: "Rain Dance",
      tag: "Party",
      desc: "Bollywood beats, sprinklers everywhere, and the best dance floor in town.",
      image: "/raindance2.webp",
    },

    {
      id: "child-pool",
      name: "Child Pool",
      tag: "Family",
      desc: "Calm, shallow pool designed for the youngest visitors. Lifeguards always present.",
      image: "/childpool1.webp",
    },
    {
      id: "night-zone",
      name: "Night Zone",
      tag: "Chill",
      desc: "Enjoy cool night weather with your family and friends.",
      image: "/night3.webp",
    },

  ],

  // ----------------------------------------------------------
  //  CONTACT & LOCATION
  // ----------------------------------------------------------
  contact: {
    phone: "9918375703",
    phoneHref: "tel:+919918375703",
    whatsapp: "919918375703", // international format, no "+"; shown as the floating WhatsApp button
    phone2: "99184 04351",        // add this
    phone2Href: "tel:+919918404351",
    email: "varanasifuncity@gmail.com",
    address: "Sona Talab Pandeypur, Panchkoshi Rd, in front of St. Mary Convent School, Daniyalpur, Varanasi, Uttar Pradesh 221007",
    // Opens the Google Maps listing (reviews, photos, videos, directions). The old goo.gl short link no longer responds.
    mapUrl: "https://www.google.com/maps?cid=9349609389350833699",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14423.27355188813!2d83.02539509999998!3d25.34387455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e5ceabeb383%3A0x81c07c3408e9ce23!2sVaranasi%20Fun%20City%20%7C%20Best%20Waterpark%20in%20Varanasi!5e0!3m2!1sen!2sin!4v1779026791676!5m2!1sen!2sin",
  },

  // ----------------------------------------------------------
  //  SOCIAL MEDIA
  //  TODO: Add facebook URL if/when a page exists — omit to skip the icon/schema entry.
  // ----------------------------------------------------------
  socials: {
    youtube: "https://www.youtube.com/@varanasifuncity100",
    instagram: "https://www.instagram.com/varanasifuncitywaterpark/",
  },

  // ----------------------------------------------------------
  //  WEDDINGS, EVENTS & PARTIES — verified facts only
  //  This is the single source of truth for what the venue actually
  //  offers beyond the water park. Every wedding/event/party page reads
  //  from here. Do not add a fact here unless it has been confirmed —
  //  downstream pages and the chatbot all trust this block directly.
  // ----------------------------------------------------------
  events: {
    offered: true,
    eventTypes: [
      "Weddings",
      "Wedding receptions",
      "Engagement ceremonies",
      "Birthday parties",
      "Kitty parties",
      "Corporate events",
      "Seminars",
      "Family functions",
      "Pool parties",
    ],
    // Confirmed via the venue's own promotional video (on-screen facility
    // list + room/hall footage) and a direct confirmation call: two AC
    // banquet halls, an open lawn, and on-site AC Deluxe Rooms for guest
    // stays. Room count/pricing/night rates are still unconfirmed, so
    // roomsNote hedges rather than guessing a number.
    facilities: [
      {
        id: "lawn",
        label: "Open lawn / ground space",
        note: "A dedicated open-ground area for outdoor functions, separate from the water-park pools.",
      },
      {
        id: "hall",
        label: "Two air-conditioned banquet halls",
        note: "Two indoor, air-conditioned halls for functions that need enclosed space.",
      },
      {
        id: "rooms",
        label: "AC Deluxe Rooms (guest stay)",
        note: "On-site air-conditioned rooms are available for overnight stays — ask about availability when you book.",
      },
      {
        id: "parking",
        label: "On-site parking",
        note: "Paid parking is available on-site for guest vehicles.",
      },
      {
        id: "catering",
        label: "Catering",
        note: "In-house catering or approved outside caterers can be arranged.",
      },
      {
        id: "stage",
        label: "Stage, decoration & DJ/sound",
        note: "Basic stage setup, decoration and DJ/sound arrangements are available for functions.",
      },
    ],
    // No fixed number of rooms or nightly rate is published — route to an
    // enquiry instead of guessing.
    roomsNote:
      "AC Deluxe Room availability and rates depend on your dates — call to check.",
    // No fixed number is published — capacity depends on layout, so we
    // route guests to an enquiry instead of guessing a figure.
    capacityNote:
      "Guest capacity depends on whether you book the lawn, the hall, or both — call us to discuss your group size.",
  },

  // ----------------------------------------------------------
  //  SEO & METADATA
  //  Used in app/layout.js via Next.js metadata API
  // ----------------------------------------------------------
  seo: {
    // Homepage defaults to the water-park identity — wedding/event/party
    // pages carry their own titles and own that positioning individually.
    title: "Varanasi Fun City | Water Park in Varanasi",
    titleTemplate: "%s | Varanasi Fun City",
    description:
      "Varanasi's largest water park — wave pool, mega slides, rain dance, kids' zone. Also a wedding lawn, banquet halls & event venue on Panchkoshi Road.",
    keywords:
      "water park Varanasi, waterpark Varanasi, wave pool Varanasi, Varanasi Fun City, fun city water park, wedding lawn Varanasi, event venue Varanasi, party venue Varanasi",
    // Production (Vercel) redirects the apex domain to www — this must match
    // that live behavior, or canonical tags/sitemap point at a URL that
    // immediately redirects, splitting ranking signal across two hosts.
    canonicalUrl: "https://www.varanasifuncity.com",
    ogImage: "/main.jpg",
    twitterHandle: "// TODO: Add if exists",
    themeColor: "#0ea5e9",
  },

  // ----------------------------------------------------------
  //  LOCAL BUSINESS JSON-LD SCHEMA
  //  Feeds Google's knowledge panel directly.
  // ----------------------------------------------------------
  schema: {
    type: "AmusementPark",
    priceRange: "₹400",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI",
    latitude: 25.3452134,   // from the Google Maps listing
    longitude: 83.0193378,  // from the Google Maps listing
  },
  agency :{
    name:"Ontoweb",
    url:"https://www.ontoweb.in/",
  },
};
