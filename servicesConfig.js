// ============================================================
//  SERVICE / LANDING PAGE CONFIG
//  Wedding, event & party pages read from here. Content must stay
//  factual — see siteConfig.events for the verified facility list.
//  No pricing, capacity or package claims: none have been confirmed.
// ============================================================

import { siteConfig } from "@/siteConfig";

const { facilities, capacityNote, roomsNote } = siteConfig.events;

export const categories = {
  park: { label: "Water Park", href: "/water-park-varanasi/" },
  weddings: { label: "Weddings", href: "/wedding-lawn-varanasi/" },
  events: { label: "Events", href: "/event-venue-varanasi/" },
  parties: { label: "Parties", href: "/party-venue-varanasi/" },
};

export const services = [
  {
    slug: "water-park-varanasi",
    category: "park",
    keyword: "water park in Varanasi",
    title: "Water Park in Varanasi",
    metaDescription:
      "Varanasi Fun City is Varanasi's largest water park and amusement park in Pandeypur — wave pool, mega slides, rain dance and a dedicated kids' pool on Panchkoshi Road.",
    h1: "Water Park in Varanasi",
    eyebrow: "Rides & pools",
    intro: [
      "Varanasi Fun City — also searched for as Fun City Water Park — is Varanasi's largest water park and amusement park, built around a giant wave pool, a mega slide tower and a dedicated rain dance floor, with a shallow pool and dry play zone for younger children.",
      "The park runs a day shift for families and groups seven days a week, with lifeguards on duty throughout and separate changing rooms for men and women. Rides are grouped so thrill-seekers, casual swimmers and young children each have a section suited to them, rather than one general pool for everyone.",
      "Most visitors treat it as a half-day trip — arriving late morning, spending time across the wave pool, slides and rain dance floor, and taking a break in the seating area or kids' zone before heading back out. Costume rental and a canteen are available inside if you don't want to carry your own gear.",
    ],
    whyChoose: [
      "20+ rides, from thrill slides to a calm children's pool",
      "One of the largest wave pools in the region",
      "Rain dance floor with music",
      "Lifeguards on duty throughout the park",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
    ],
    planningTips: [
      "Weekday visits are generally quieter than weekends and public holidays — the day shift runs the same hours either way.",
      "Nylon or polyester swimwear is required inside the pools; rent one at the park if you don't have your own.",
      "Outside food isn't allowed in — it's held at the gate and returned when you leave, so eat before arriving or plan to use the canteen.",
      "Lockers are optional and available for a refundable deposit if you'd rather not carry valuables around the park.",
    ],
    faqs: [
      {
        q: "Where in Varanasi is the water park located?",
        a: "Varanasi Fun City is in Pandeypur, on Panchkoshi (Panch Kroshi) Road, in front of St. Mary Convent School — easily reached from Ashapur, Pahariya and other nearby parts of Varanasi.",
      },
      {
        q: "What is the ticket price for Varanasi Fun City?",
        a: `Weekday day-shift tickets are ₹${siteConfig.pricing.weekday.day.adult} for adults and ₹${siteConfig.pricing.weekday.day.kid} for kids (3–4 ft); weekend/holiday pricing is a little higher. See the Pricing section on the homepage for the full breakdown.`,
      },
      {
        q: "What are the park's timings?",
        a: "The day shift runs 11:00 AM – 5:00 PM, open all seven days. See the Timings section on the homepage for current shift status.",
      },
      {
        q: "Is the water park suitable for non-swimmers and young children?",
        a: "Yes. The main pool is 3–4 ft deep and there is a separate, shallower child pool. Lifeguards are present throughout the park.",
      },
      {
        q: "Is parking available?",
        a: "Yes, paid parking is available on-site.",
      },
      {
        q: "Do I need to bring my own swimwear?",
        a: "You can bring your own nylon or polyester costume (no rental charge), or rent one at the park — cotton and other materials aren't allowed in the pools.",
      },
      {
        q: "Can we bring outside food?",
        a: "Outside food isn't allowed inside — it's kept at the entrance gate and returned when you leave. A canteen inside serves snacks and beverages during park hours.",
      },
      {
        q: "Can we book the park for a group or school trip?",
        a: `Yes, call ${siteConfig.contact.phone} to arrange group and school bookings.`,
      },
    ],
    related: ["pool-party-varanasi", "event-venue-varanasi"],
    hero: { image: "/main.jpg", alt: "Water slides and wave pool at Varanasi Fun City" },
  },

  // ---------------- WEDDINGS ----------------
  {
    slug: "wedding-lawn-varanasi",
    category: "weddings",
    keyword: "wedding lawn in Varanasi",
    title: "Wedding Lawn & Banquet Hall in Varanasi",
    metaDescription:
      "Varanasi Fun City is a wedding lawn and two air-conditioned banquet halls in Varanasi, with on-site AC guest rooms, parking, catering and stage/decoration support for weddings and marriage functions.",
    h1: "Wedding Lawn & Banquet Hall in Varanasi",
    eyebrow: "Weddings",
    intro: [
      "Varanasi Fun City hosts weddings across three spaces — an open-ground lawn and two air-conditioned banquet halls — all separate from the water-park pools, in Pandeypur on Panchkoshi Road in the heart of Varanasi. Between them, the venue can handle marriage functions from the baraat and ceremony through to the reception, indoors or outdoors.",
      "The lawn suits families who want an outdoor wedding with room to move — a mandap area, seating spread across the grounds, and space for a baraat procession to arrive. The two halls suit functions that want an enclosed, air-conditioned setting instead — useful in peak summer, during the monsoon, or simply if an indoor banquet feel is what you're after.",
      "On-site AC Deluxe Rooms are also available for guest stays — useful if family is travelling in from outside Varanasi for the wedding. Parking, catering and basic stage and decoration support are arranged on-site too, so the core logistics are handled in one place rather than coordinated across separate vendors and locations.",
    ],
    whyChoose: [
      "Choice of an open lawn or one of two air-conditioned banquet halls",
      "On-site AC Deluxe Rooms for outstation wedding guests",
      "One of the few Varanasi wedding venues also offering a full water park on-site",
      "On-site parking for wedding guests",
      "In-house catering or approved outside caterers",
      "Stage, decoration and DJ/sound arrangements available",
      "Central location on Pandeypur-Panchkoshi Road, Varanasi",
    ],
    facilities,
    capacityNote,
    roomsNote,
    planningTips: [
      "Not sure whether to book the lawn or a hall? Tell us the season and guest count and we'll help you decide.",
      "If outstation family or friends need a place to stay, ask about the AC Deluxe Rooms when you book.",
      "If you're bringing your own decorator or caterer, mention it when booking — both spaces work with approved outside vendors as well as in-house catering.",
      "Wedding-season dates (peak months) get booked up faster — the earlier you lock in a date, the more flexibility you'll have on timing.",
      "If you're also planning the reception or engagement, ask about booking the same venue for both — it's one place to coordinate instead of two.",
    ],
    faqs: [
      {
        q: "Does Varanasi Fun City have a wedding lawn or a banquet hall?",
        a: "Both — an open-air lawn for outdoor functions and two air-conditioned banquet halls for indoor functions are available, separate from the water park.",
      },
      {
        q: "Should we book the lawn or a hall?",
        a: `It depends on your preference and the season — the lawn gives an open-air outdoor setting, the halls are enclosed and air-conditioned. Call ${siteConfig.contact.phone} to talk through which suits your date.`,
      },
      {
        q: "How many guests can the venue accommodate?",
        a: capacityNote,
      },
      {
        q: "Is accommodation available for outstation guests?",
        a: `Yes, on-site AC Deluxe Rooms are available for guest stays. ${roomsNote}`,
      },
      {
        q: "Is parking available for wedding guests?",
        a: "Yes, on-site paid parking is available.",
      },
      {
        q: "Is catering available?",
        a: "Yes, in-house catering can be arranged, or you can bring an approved outside caterer.",
      },
      {
        q: "Can we arrange decoration, a stage or DJ/sound?",
        a: "Yes, basic stage setup, decoration and DJ/sound arrangements can be organised for your function, in either the lawn or a hall.",
      },
      {
        q: "What happens if it rains on the wedding day?",
        a: "The halls are enclosed, air-conditioned spaces — ask us when you book whether one can work as a backup for your lawn function, or book a hall directly if you'd rather not depend on the weather.",
      },
      {
        q: "How far in advance should we book?",
        a: `There's no fixed minimum, but earlier is better, especially in wedding season. Call ${siteConfig.contact.phone} to check availability for your date.`,
      },
      {
        q: "Can the venue be booked for the reception as well as the wedding?",
        a: `Yes — see our dedicated Reception page, or call ${siteConfig.contact.phone} to discuss booking both.`,
      },
    ],
    related: ["reception-venue-varanasi", "engagement-venue-varanasi", "event-venue-varanasi"],
    hero: { image: "/varanasi-fun-city-wedding-stage.jpg", alt: "Decorated wedding stage and mandap on the lawn at Varanasi Fun City" },
  },
  {
    slug: "reception-venue-varanasi",
    category: "weddings",
    keyword: "reception venue in Varanasi",
    title: "Reception Venue in Varanasi",
    metaDescription:
      "Book the Varanasi Fun City lawn or one of two air-conditioned halls for your wedding reception in Varanasi — stage, decoration, catering and on-site parking for evening functions.",
    h1: "Reception Venue in Varanasi",
    eyebrow: "Weddings",
    intro: [
      "The same lawn and air-conditioned halls used for weddings at Varanasi Fun City can be booked on their own for a wedding reception — an evening function for family, friends and colleagues to meet the couple, separate from the wedding ceremony itself.",
      "A reception generally needs less ceremonial setup than the wedding day but more focus on the evening experience — lighting, a stage for the couple, music and a smooth flow for guests to greet them and move on to dinner. Many receptions lean toward one of the air-conditioned halls for exactly that reason, though the open lawn works just as well if you'd prefer an outdoor evening.",
      "Because it's booked as a standalone event, you're not required to have held the wedding itself at Varanasi Fun City — any of the spaces work as a reception venue on their own, or paired with a wedding or engagement booked here as well. AC Deluxe Rooms are also available if out-of-town guests need to stay over.",
    ],
    whyChoose: [
      "Choice of the open lawn or one of two air-conditioned halls for an evening reception",
      "On-site AC Deluxe Rooms for guests travelling in",
      "Stage, decoration and DJ/sound for the couple's entrance and photos",
      "Catering arranged in-house or through an approved outside caterer",
      "On-site parking for guests",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
    ],
    facilities,
    capacityNote,
    roomsNote,
    planningTips: [
      "A reception typically runs in the evening — confirm your preferred time slot when you enquire.",
      "If you want an air-conditioned, enclosed setting for the evening, ask about one of the halls instead of the lawn.",
      "If you want a specific stage backdrop or lighting look, discuss it in advance so decoration can be arranged accordingly.",
      "Reception-only bookings don't require the wedding itself to have been held here.",
    ],
    faqs: [
      {
        q: "Can we book only the reception, not the full wedding?",
        a: "Yes, the lawn or a hall can be booked as a standalone venue for a reception evening.",
      },
      {
        q: "Should we book the lawn or an air-conditioned hall for the reception?",
        a: `Either works — the halls give an enclosed, air-conditioned evening, the lawn gives an open-air one. Call ${siteConfig.contact.phone} to talk through what suits your event.`,
      },
      {
        q: "Is stage and decoration included?",
        a: "Stage and decoration can be arranged for the reception — discuss your requirements when booking.",
      },
      {
        q: "How many guests can attend?",
        a: capacityNote,
      },
      {
        q: "Is there somewhere for outstation guests to stay?",
        a: `Yes, on-site AC Deluxe Rooms are available. ${roomsNote}`,
      },
      {
        q: "Is parking available for reception guests?",
        a: "Yes, on-site paid parking is available.",
      },
      {
        q: "Is catering available for an evening reception?",
        a: "Yes, in-house catering or an approved outside caterer can be arranged for the reception.",
      },
      {
        q: "Can we arrange DJ and lighting for the evening?",
        a: "Yes, DJ/sound and basic lighting arrangements can be organised as part of the stage and decoration setup.",
      },
    ],
    related: ["wedding-lawn-varanasi", "engagement-venue-varanasi", "event-venue-varanasi"],
    hero: { image: "/varanasi-fun-city-wedding-event.jpg", alt: "Evening wedding reception in progress at Varanasi Fun City" },
  },
  {
    slug: "engagement-venue-varanasi",
    category: "weddings",
    keyword: "engagement venue in Varanasi",
    title: "Engagement Venue in Varanasi",
    metaDescription:
      "Host your ring ceremony or roka at Varanasi Fun City's lawn or air-conditioned hall in Varanasi — an intimate venue with catering and decoration support.",
    h1: "Engagement Venue in Varanasi",
    eyebrow: "Weddings",
    intro: [
      "For a ring ceremony, roka or engagement gathering, Varanasi Fun City offers a smaller, more intimate booking than a full wedding — on the open lawn or in one of two air-conditioned halls — with the same catering, decoration and parking support, scaled to a single-day family function.",
      "Engagement functions usually involve close family and friends rather than a full wedding guest list, so either space can be set up more simply — a smaller decorated area for the ceremony, seating nearby, and catering for a shorter event rather than a full wedding-day schedule. A hall is a common pick here since it suits a smaller, indoor, air-conditioned gathering well.",
      "It suits a single-day or single-session family function ahead of the wedding itself, and works well as a lead-in booking if you're also planning to hold the wedding or reception at the same venue later.",
    ],
    whyChoose: [
      "Choice of the open lawn or an air-conditioned hall, sized for a smaller gathering",
      "Decoration and stage support for the ceremony",
      "Catering arranged in-house or through an approved outside caterer",
      "On-site parking",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
    ],
    facilities,
    capacityNote,
    planningTips: [
      "Engagement functions are usually shorter and smaller than a full wedding — mention your expected guest count so the right space (lawn or hall) can be suggested.",
      "If you're also planning the wedding or reception here, ask about booking both to keep logistics in one place.",
      "Decoration for a ring ceremony can be scaled down from a full wedding setup — discuss what you actually need when booking.",
    ],
    faqs: [
      {
        q: "Can Varanasi Fun City host an engagement or ring ceremony?",
        a: "Yes, both the lawn and the air-conditioned halls can be booked for an engagement ceremony or roka.",
      },
      {
        q: "Is this the same venue used for weddings?",
        a: "Yes — the same lawn and halls, booked for a smaller, single-function event.",
      },
      {
        q: "Can decoration and catering be arranged?",
        a: "Yes, both decoration and catering can be arranged for the event.",
      },
      {
        q: "Is parking available for an engagement function?",
        a: "Yes, on-site paid parking is available.",
      },
      {
        q: "Can we book the wedding here too if the engagement goes well?",
        a: `Yes — see our Wedding Lawn and Reception pages, or call ${siteConfig.contact.phone} to discuss booking multiple functions.`,
      },
    ],
    related: ["wedding-lawn-varanasi", "reception-venue-varanasi", "event-venue-varanasi"],
    hero: { image: "/ai-engagement-venue.jpg", alt: "Illustration of a decorated engagement ceremony stage with floral arch" },
  },

  // ---------------- EVENTS ----------------
  {
    slug: "event-venue-varanasi",
    category: "events",
    keyword: "event venue in Varanasi",
    title: "Event Venue in Varanasi",
    metaDescription:
      "Varanasi Fun City's lawn and air-conditioned halls work as an event venue in Varanasi for family functions, corporate events, seminars and private celebrations.",
    h1: "Event Venue in Varanasi",
    eyebrow: "Events",
    intro: [
      "Beyond weddings, Varanasi Fun City is booked as a general-purpose event venue — for family functions, private celebrations, social gatherings, seminars and corporate get-togethers that don't fit neatly into a single category. The open lawn and two air-conditioned halls are all available, depending on what the event needs.",
      "None of the spaces are set up around one fixed event format, which is useful if what you're planning doesn't map cleanly to \"wedding\" or \"birthday\" — a community gathering, a felicitation function, a reunion, or any event that just needs space, parking and catering support.",
      "On-site parking, catering and decoration/stage support are available for whichever kind of event you're planning, and — unlike most standalone banquet halls in the city — the venue also sits next to a full working water park, which some groups choose to add on for a more active event.",
    ],
    useCases: [
      "Family functions and get-togethers",
      "Private and social events",
      "Corporate events and seminars",
      "Group celebrations",
    ],
    whyChoose: [
      "Open lawn and two air-conditioned halls — pick whichever suits the event",
      "On-site parking",
      "In-house catering or approved outside caterers",
      "Stage, decoration and DJ/sound support available",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
    ],
    facilities,
    capacityNote,
    planningTips: [
      "Describe what you're planning when you enquire, even if it doesn't fit a standard category — we'll suggest the lawn or a hall based on that.",
      "If your event could benefit from water-park access as an add-on, ask about combining the two for the same day.",
      "Catering and decoration are arranged per booking rather than as fixed packages, so requirements are discussed directly with you.",
    ],
    faqs: [
      {
        q: "What kinds of events can be hosted at Varanasi Fun City?",
        a: "Weddings, receptions, engagements, birthday and kitty parties, corporate events, seminars and general family functions — across the open lawn or the air-conditioned halls.",
      },
      {
        q: "Is the water park included with an event booking?",
        a: `Water-park access and event bookings are arranged separately — call ${siteConfig.contact.phone} to discuss combining the two.`,
      },
      {
        q: "Is parking available?",
        a: "Yes, on-site paid parking is available.",
      },
      {
        q: "How many guests can the venue accommodate?",
        a: capacityNote,
      },
      {
        q: "Can we bring our own decorator or caterer?",
        a: "Yes — approved outside caterers are welcome, and in-house catering is also available if you'd rather not coordinate one yourself.",
      },
      {
        q: "What if our event doesn't fit a standard category?",
        a: `That's fine — describe what you're planning and call ${siteConfig.contact.phone} to discuss whether the lawn or a hall works for it.`,
      },
    ],
    related: ["corporate-events-varanasi", "party-venue-varanasi", "wedding-lawn-varanasi"],
    hero: { image: "/ai-event-venue.jpg", alt: "Illustration of an event hall set up with round tables for a family function" },
  },
  {
    slug: "corporate-events-varanasi",
    category: "events",
    keyword: "corporate event venue in Varanasi",
    title: "Corporate Event & Seminar Venue in Varanasi",
    metaDescription:
      "Plan a corporate event, seminar or office outing in Varanasi at Varanasi Fun City — two air-conditioned halls, an open lawn, AC guest rooms and water-park access.",
    h1: "Corporate Event & Seminar Venue in Varanasi",
    eyebrow: "Events",
    intro: [
      "Varanasi Fun City's two air-conditioned halls and open lawn can be booked for corporate events, seminars and office celebrations, and — unlike a typical banquet hall — any of them can be paired with a group visit to the water park itself for a team outing.",
      "Most corporate bookings fall into one of two shapes: a formal function (a seminar, an office party, an awards evening, a year-end celebration) that just needs a stage and catering — where the air-conditioned halls usually fit better — or a team-outing format where the water park is the main activity and the lawn is used afterward for food and a wind-down.",
      "Catering, decoration and parking can be arranged for any of the spaces; the water-park side can be booked separately as a group visit. For a multi-day seminar or offsite, AC Deluxe Rooms are also available on-site for attendees who need to stay over.",
    ],
    useCases: [
      "Seminars and formal corporate functions",
      "Team outings combining the water park and a function",
      "Office parties and year-end celebrations",
      "Corporate meet-ups and social evenings",
    ],
    whyChoose: [
      "Two air-conditioned halls for formal functions and seminars, open lawn for outdoor team days",
      "On-site AC Deluxe Rooms for multi-day events or outstation attendees",
      "Only local option that also pairs a function venue with an actual water park",
      "On-site parking for staff and guests",
      "Catering arranged in-house or via approved caterers",
      "Stage/DJ setup available for the event portion",
    ],
    facilities,
    capacityNote,
    roomsNote,
    planningTips: [
      "For a formal office event or seminar, an air-conditioned hall is usually the better fit; for a team outing, the lawn plus water park works well.",
      "Decide early whether you want a formal function, a water-park team outing, or both — the water park and venue spaces are booked separately.",
      "For multi-day events, ask about AC Deluxe Room availability for attendees.",
      "Give a rough headcount when you enquire so parking and catering can be planned accordingly.",
    ],
    faqs: [
      {
        q: "Can we combine a water-park visit with a corporate function?",
        a: `Yes — the water park and the event venue are booked separately but can be arranged together for the same day. Call ${siteConfig.contact.phone} to plan this.`,
      },
      {
        q: "Is there an air-conditioned space for a seminar or formal meeting?",
        a: "Yes, two air-conditioned banquet halls are available alongside the open lawn.",
      },
      {
        q: "Is accommodation available for a multi-day event?",
        a: `Yes, on-site AC Deluxe Rooms can be arranged. ${roomsNote}`,
      },
      {
        q: "Is catering available for office events?",
        a: "Yes, in-house catering or an approved outside caterer can be arranged.",
      },
      {
        q: "Is parking available for staff?",
        a: "Yes, on-site paid parking is available.",
      },
      {
        q: "Can we book just the water park for a team outing, without the venue space?",
        a: `Yes — a group water-park booking can be arranged on its own. Call ${siteConfig.contact.phone} for group rates and timing.`,
      },
    ],
    related: ["event-venue-varanasi", "water-park-varanasi", "party-venue-varanasi"],
    hero: { image: "/ai-corporate-seminar.jpg", alt: "Illustration of a seminar hall with theatre-style seating" },
  },

  // ---------------- PARTIES ----------------
  {
    slug: "party-venue-varanasi",
    category: "parties",
    keyword: "party venue in Varanasi",
    title: "Party Venue in Varanasi",
    metaDescription:
      "Varanasi Fun City's lawn and air-conditioned halls work as a party venue in Varanasi for birthdays, kitty parties, anniversaries and family celebrations.",
    h1: "Party Venue in Varanasi",
    eyebrow: "Parties",
    intro: [
      "For birthdays, kitty parties, anniversaries and other family celebrations, Varanasi Fun City is available as a party venue — with an open lawn and two air-conditioned halls to choose from — and catering, decoration and parking arranged on-site.",
      "Parties booked here range from small, low-key family get-togethers to larger celebrations with music and decoration. The lawn suits an outdoor, informal feel; the halls suit a more controlled, air-conditioned setting, particularly useful in hot weather or the monsoon.",
      "Private parties can also be combined with a water-park visit for a more active celebration, which is a genuine point of difference from a standard function hall — guests can spend part of the time on the rides and wave pool before moving to the lawn or a hall for food and cake-cutting.",
    ],
    useCases: [
      "Birthday parties",
      "Kitty parties",
      "Anniversary celebrations",
      "Family gatherings and private parties",
    ],
    whyChoose: [
      "Choice of the open lawn or one of two air-conditioned halls",
      "In-house catering or approved outside caterers",
      "Decoration and DJ/sound support available",
      "On-site parking",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
    ],
    facilities,
    capacityNote,
    planningTips: [
      "Tell us the occasion (birthday, kitty party, anniversary) and rough guest count so we can suggest the lawn or a hall.",
      "If you want to add water-park time before the party, mention it when booking so both can be planned together.",
      "Decoration and catering are arranged per booking, not as fixed packages — discuss what you need directly.",
    ],
    faqs: [
      {
        q: "What kinds of parties can be hosted?",
        a: "Birthday parties, kitty parties, anniversaries and general family or private celebrations.",
      },
      {
        q: "Should we book the lawn or a hall for our party?",
        a: `Either works — the lawn is open-air and informal, the halls are enclosed and air-conditioned. Call ${siteConfig.contact.phone} to talk through what suits your group.`,
      },
      {
        q: "Is catering available?",
        a: "Yes, in-house catering can be arranged, or you can bring an approved outside caterer.",
      },
      {
        q: "Can we add water-park access to the party?",
        a: `Yes, this can be arranged alongside the booking — call ${siteConfig.contact.phone} to plan it.`,
      },
      {
        q: "Is decoration available for a party?",
        a: "Yes, decoration can be arranged for either the lawn or a hall as part of your party booking.",
      },
      {
        q: "Is there a minimum guest count?",
        a: `No fixed minimum — small family gatherings and larger celebrations are both accommodated. Call ${siteConfig.contact.phone} to discuss your group size.`,
      },
    ],
    related: ["birthday-party-varanasi", "kitty-party-varanasi", "event-venue-varanasi"],
    hero: { image: "/ai-party-venue.jpg", alt: "Illustration of a festive party setup with balloons and lights" },
  },
  {
    slug: "birthday-party-varanasi",
    category: "parties",
    keyword: "birthday party venue in Varanasi",
    title: "Birthday Party Venue in Varanasi",
    metaDescription:
      "Celebrate a birthday at Varanasi Fun City — open lawn or air-conditioned hall, decoration and catering in Varanasi, with the option to add water-park access.",
    h1: "Birthday Party Venue in Varanasi",
    eyebrow: "Parties",
    intro: [
      "Varanasi Fun City can be booked for birthday celebrations — on the open lawn or in one of two air-conditioned halls — with decoration and catering arranged on-site, and, if you'd like, combined with a water-park visit for older kids and adults.",
      "For younger children, a hall works well as a standard party space in comfortable, air-conditioned surroundings — decoration, seating, cake-cutting and catering, without needing hot outdoor conditions. For teens and adult birthdays, the lawn plus a water-park session beforehand is a common way to give the celebration an actual activity, not just a sit-down meal.",
      "Either way, the party and the water park are handled as separate bookings that can be scheduled for the same day, so you can pick just the venue, just the park, or both depending on the age group and what the birthday person actually wants.",
    ],
    whyChoose: [
      "Choice of the open lawn or an air-conditioned hall for the party",
      "Decoration and catering support",
      "Option to add water-park access to the celebration",
      "On-site parking",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
    ],
    facilities,
    capacityNote,
    planningTips: [
      "For younger kids, an air-conditioned hall with decoration and catering usually works well without adding the water park.",
      "For teens or adult birthdays, consider the lawn plus water-park time beforehand for a more active celebration.",
      "Let us know the birthday person's age group when booking — it helps us suggest the right space and setup.",
    ],
    faqs: [
      {
        q: "Can we book Varanasi Fun City for a birthday party?",
        a: "Yes, both the lawn and the air-conditioned halls are available for birthday celebrations.",
      },
      {
        q: "Can the water park be included?",
        a: `Yes, a water-park visit can be arranged alongside the party — call ${siteConfig.contact.phone} to plan it.`,
      },
      {
        q: "Is decoration available?",
        a: "Yes, decoration can be arranged for the party, in either the lawn or a hall.",
      },
      {
        q: "Is this suitable for a young child's birthday, or mainly for teens/adults?",
        a: "Both — younger kids' parties often use an air-conditioned hall, while teen and adult birthdays often add a water-park session on the lawn side.",
      },
      {
        q: "Is parking available for party guests?",
        a: "Yes, on-site paid parking is available.",
      },
    ],
    related: ["party-venue-varanasi", "pool-party-varanasi", "kitty-party-varanasi"],
    hero: { image: "/ai-birthday-party.jpg", alt: "Illustration of a birthday party setup with balloon arch and cake table" },
  },
  {
    slug: "kitty-party-varanasi",
    category: "parties",
    keyword: "kitty party venue in Varanasi",
    title: "Kitty Party Venue in Varanasi",
    metaDescription:
      "Host a kitty party at Varanasi Fun City's air-conditioned hall or lawn in Varanasi — seating, catering and decoration for a daytime get-together.",
    h1: "Kitty Party Venue in Varanasi",
    eyebrow: "Parties",
    intro: [
      "For a kitty party or ladies' get-together, Varanasi Fun City offers a relaxed daytime venue — one of two air-conditioned halls or the open lawn — with seating, catering and decoration arranged on-site.",
      "Kitty parties are usually a smaller, informal group rather than a full wedding-scale function, so the space is set up simply — comfortable seating, a catering spread, and enough room for games or activities the group has planned. A hall is a popular choice here, especially for a daytime booking in warmer months.",
      "Since it's a daytime booking, it also sits alongside the water park's day-shift hours — some groups combine the two, using the park for part of the visit and the hall or lawn for the sit-down portion of the get-together.",
    ],
    whyChoose: [
      "Choice of an air-conditioned hall or the lawn for a daytime gathering",
      "Catering arranged in-house or via an approved caterer",
      "Decoration available on request",
      "On-site parking",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
    ],
    facilities,
    capacityNote,
    planningTips: [
      "Kitty parties are typically booked as a daytime slot — mention your preferred timing when you enquire.",
      "For comfort in warmer months, an air-conditioned hall is worth asking about instead of the open lawn.",
      "If your group wants to combine it with time at the water park, let us know so both can be planned together.",
    ],
    faqs: [
      {
        q: "Is Varanasi Fun City suitable for a kitty party?",
        a: "Yes, both the air-conditioned halls and the open lawn can be booked for a daytime kitty party or ladies' get-together.",
      },
      {
        q: "Is food/catering available?",
        a: "Yes, in-house catering or an approved outside caterer can be arranged.",
      },
      {
        q: "Is parking available?",
        a: "Yes, on-site paid parking is available.",
      },
      {
        q: "Can we combine the kitty party with a water-park visit?",
        a: `Yes — this can be arranged for the same day. Call ${siteConfig.contact.phone} to plan it.`,
      },
      {
        q: "Is decoration included, or do we need to arrange it separately?",
        a: "Decoration is available on request as part of the booking — mention what you'd like when you enquire.",
      },
    ],
    related: ["party-venue-varanasi", "birthday-party-varanasi", "event-venue-varanasi"],
    hero: { image: "/ai-kitty-party.jpg", alt: "Illustration of a daytime kitty party setup with floral centrepieces" },
  },
  {
    slug: "pool-party-varanasi",
    category: "parties",
    keyword: "pool party in Varanasi",
    title: "Pool Party in Varanasi",
    metaDescription:
      "Combine a water-park visit with a lawn or hall celebration at Varanasi Fun City for a pool-party-style event in Varanasi.",
    h1: "Pool Party in Varanasi",
    eyebrow: "Parties",
    intro: [
      "Varanasi Fun City's water park can be booked together with the open lawn or one of two air-conditioned halls for a pool-party-style celebration — a group session in the wave pool and slides, paired with catering and decoration for the party portion.",
      "This isn't a private, exclusive-use pool — the water park runs as its normal lifeguard-supervised session, shared with other visitors during park hours. What makes it work as a \"pool party\" is combining that group water-park time with a lawn or hall booking for food, cake-cutting and decoration immediately after.",
      "It's a genuine option for celebrations that want more activity than a standard sit-down party — birthdays, reunions, or any group that would rather spend part of the event in the water than only at a table.",
    ],
    whyChoose: [
      "Access to a full water park, not just a single pool",
      "Lawn or air-conditioned hall for catering, cake-cutting and decoration",
      "On-site parking",
      "Located in Pandeypur, on Panchkoshi Road, Varanasi",
      `Group bookings arranged by calling ${siteConfig.contact.phone}`,
    ],
    facilities,
    capacityNote,
    planningTips: [
      "Plan for the water park's day-shift hours when scheduling — the party portion typically follows the water-park session.",
      "Give a group size when you enquire so both the water-park visit and the lawn/hall setup can be planned together.",
      "If you specifically need a private, exclusive pool rather than a shared session, say so up front — it changes what's realistic to arrange.",
    ],
    faqs: [
      {
        q: "Can we book a private pool party?",
        a: `The water park operates as a shared, lifeguard-supervised session rather than an exclusive private pool. Group bookings that combine a water-park visit with a lawn or hall celebration can be arranged — call ${siteConfig.contact.phone} to discuss.`,
      },
      {
        q: "Can we add decoration and catering?",
        a: "Yes, decoration and catering can be arranged on the lawn or in a hall alongside the water-park session.",
      },
      {
        q: "What's included — just pool access, or the party space too?",
        a: "A pool-party booking combines water-park access with a separate lawn or hall booking for the party portion — they're arranged together but are two parts of the visit.",
      },
      {
        q: "Is this different from a regular birthday or kitty party booking?",
        a: "It's the same venue and facilities — the difference is simply that a water-park session is built into the plan alongside the party.",
      },
    ],
    related: ["water-park-varanasi", "birthday-party-varanasi", "party-venue-varanasi"],
    hero: { image: "/wavepool2.jpg", alt: "Group in the wave pool at Varanasi Fun City" },
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

export function getRelated(service) {
  return (service.related || [])
    .map((slug) => getService(slug))
    .filter(Boolean);
}
