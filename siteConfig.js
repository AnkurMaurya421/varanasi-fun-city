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
  logo: "https://res.cloudinary.com/dkgafhfn9/image/upload/f_auto,q_auto/mainlogo_goeafx",
  heroImage: "https://res.cloudinary.com/dkgafhfn9/image/upload/f_auto,q_auto/main_ajqe81",
  reelVideo: "https://res.cloudinary.com/dkgafhfn9/video/upload/v1779023123/waterparkvideo_zrt33g.mp4",

  // ----------------------------------------------------------
  //  PARK STATUS
  //  Set isOpen: false during off-season to show a "closed" banner
  // ----------------------------------------------------------
  isOpen: true,
  openingDate: "5th March 2026",    // shown in announcement bar when isOpen: false

  // ----------------------------------------------------------
  //  ANNOUNCEMENT BAR
  //  Rotates through these messages at the top of the page.
  //  status: "open" | "closed" | "info"
  // ----------------------------------------------------------
  announcements: [
    { status: "open", label: "Live", text: "Waterpark is open now — dive in!" },
    { status: "info", label: "Tonight", text: "Night Shift open, check rules below" },

    // { status: "closed", label: "Notice", text: "Closed for season — reopening 5th March 2026" },
  ],

  // ----------------------------------------------------------
  //  SHIFTS / TIMINGS
  // ----------------------------------------------------------
  shifts: {
    day: {
      enabled: true,
      label: "Day Shift",
      sublabel: "Sun-up splash",
      hours: "11:00 AM – 4:00 PM",
      days: "Open all 7 days",
      note: "Best for families with kids. Includes wave pool, rain dance and all slides.",
      icon: "sun",   // "sun" | "moon"
    },
    night: {
      enabled: true,   // set true when night shift season opens
      label: "Night Shift",
      sublabel: "After-dark splash",
      hours: "5:00 PM – 8:00 PM",
      days: "Open all 7 days",
      note: "Special slots for Families, Girls' Groups and Couples.",
      reopensMonth: "April 2026",  // shown when enabled: false
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
  //  Add/remove ride objects freely. image is a Cloudinary URL.
  // ----------------------------------------------------------
  rides: [
    {
      id: "wave-pool",
      name: "Wave Pool",
      tag: "Signature",
      desc: "Ride the ocean right in Varanasi. ",
      image: "https://res.cloudinary.com/dkgafhfn9/image/upload/v1779023955/night1_opxcu1.jpg",
    },
    {
      id: "mega-slides",
      name: "Mega Slide Tower",
      tag: "Thrill",
      desc: "Cyclone,Pendulum,tornado and what not...we have extensive range of rides.",
      image: "https://res.cloudinary.com/dkgafhfn9/image/upload/v1779023968/bigrides1_tzqtow.jpg",
    },
    {
      id: "rain-dance",
      name: "Rain Dance",
      tag: "Party",
      desc: "Bollywood beats, sprinklers everywhere, and the best dance floor in town.",
      image: "https://res.cloudinary.com/dkgafhfn9/image/upload/v1779023964/raindance2_zkxgyz.jpg",
    },

    {
      id: "child-pool",
      name: "Child Pool",
      tag: "Family",
      desc: "Calm, shallow pool designed for the youngest visitors. Lifeguards always present.",
      image: "https://res.cloudinary.com/dkgafhfn9/image/upload/q_auto/f_auto/v1779026411/a_spectacular_high_end_children_s_splash_pool_at_a_premium_waterpark._the_pool_1_ckxmmf.png",
    },
    {
      id: "night-zone",
      name: "Night Zone",
      tag: "Chill",
      desc: "Enjoy cool night weather with your family and friends.",
      image: "https://res.cloudinary.com/dkgafhfn9/image/upload/v1779023964/night3_ldvjqo.jpg",
    },

  ],

  // ----------------------------------------------------------
  //  TESTIMONIALS
  //  TODO: Replace with real verified Google reviews.
  // ----------------------------------------------------------
  testimonials: [
    {
      id: 1,
      name: "Satyam Tiwari",
      location: "Varanasi",
      initials: "ST",
      stars: 5,
      text: "This is the best waterpark I have visited in Purvanchal. Many cool and thrilling rides with wavy wave pool is one of the best things about this. The customer experience is also top notch. I really love this place.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Lucknow",
      initials: "PS",
      stars: 5,
      text: "Visited with my family on a Sunday and it was absolutely worth it. The wave pool is massive and the kids had a blast in the splash zone. Staff was helpful and the place was well maintained. Will definitely come back!",
    },
    {
      id: 3,
      name: "Rohit Verma",
      location: "Allahabad",
      initials: "RV",
      stars: 5,
      text: "Came for the night shift with friends — the pool lights and DJ made it a completely different experience. Rain dance was the highlight. Affordable tickets compared to other parks in UP. Highly recommended!",
    },
  ],

  // ----------------------------------------------------------
  //  CONTACT & LOCATION
  // ----------------------------------------------------------
  contact: {
    phone: "9918375703",
    phoneHref: "tel:+919918375703",
    phone2: "99184 04351",        // add this
    phone2Href: "tel:+919918404351",
    email: "varanasifuncity@gmail.com",
    address: "Sona Talab Pandeypur, Panchkoshi Rd, in front of St. Mary Convent School, Daniyalpur, Varanasi, Uttar Pradesh 221007",
    mapUrl: "https://goo.gl/maps/uzaa7EXVEd3uv7v18",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14423.27355188813!2d83.02539509999998!3d25.34387455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e5ceabeb383%3A0x81c07c3408e9ce23!2sVaranasi%20Fun%20City%20%7C%20Best%20Waterpark%20in%20Varanasi!5e0!3m2!1sen!2sin!4v1779026791676!5m2!1sen!2sin",
  },

  // ----------------------------------------------------------
  //  SOCIAL MEDIA
  // ----------------------------------------------------------
  socials: {
    youtube: "https://www.youtube.com/@varanasifuncity100",
    instagram: "https://www.instagram.com/varanasifuncitywaterpark/",

  },

  // ----------------------------------------------------------
  //  SEO & METADATA
  //  Used in app/layout.js via Next.js metadata API
  // ----------------------------------------------------------
  seo: {
    title: "Varanasi Fun City | Best Waterpark in Varanasi",
    titleTemplate: "%s | Varanasi Fun City",
    description:
      "Varanasi Fun City — the largest waterpark in Varanasi. Thrilling water slides, wave pool, rain dance, kids zone & night shift. Affordable tickets. Located on Pandeypur Panchkoshi Road.",
    keywords:
      "water park Varanasi, waterpark Varanasi, best waterpark Varanasi, water rides Varanasi, wave pool Varanasi, amusement park Varanasi, Varanasi Fun City, funcity Varanasi, water world Varanasi, largest waterpark Varanasi",
    canonicalUrl: "https://varanasifuncity.com",
    ogImage: "// TODO: Cloudinary URL — OG image (1200x630px recommended)",
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
    latitude: 25.3176,    // TODO: verify exact coordinates
    longitude: 82.9739,   // TODO: verify exact coordinates
  },
  agency :{
    name:"OntoWeb",
    url:"https://www.ontoweb.in/",
  },
};
