// What the admin page is allowed to change. Anything not listed here can only be changed in code.
// A node is { t: "bool" | "str" | "num" | "enum" | "obj" | "arr", ... }.
import { services } from "@/servicesConfig";

const str = (max) => ({ t: "str", max });
const url = (max = 300) => ({ t: "str", max, pattern: /^(https?:\/\/\S+)?$/, hint: "must start with https://" });
const list = (max, of) => ({ t: "arr", max, of });
const obj = (props) => ({ t: "obj", props });
const price = { t: "num", min: 0, max: 100000, nullable: true };
const fee = { t: "num", min: 0, max: 100000 };
const shift = {
  t: "obj",
  props: {
    enabled: { t: "bool" },
    hours: str(40),
    days: str(40),
    note: str(200),
    reopensMonth: str(40),
  },
};
const tier = { t: "obj", props: { adult: price, kid: price, toddler: price } };
const when = { t: "obj", props: { day: tier, night: tier } };
const charge = { t: "obj", props: { charge: fee, deposit: fee } };

const service = obj({
  metaDescription: str(300),
  intro: list(6, str(1500)),
  whyChoose: list(12, str(250)),
  planningTips: list(12, str(400)),
  faqs: list(25, obj({ q: str(250), a: str(1500) })),
});
const facility = obj({ id: str(60), label: str(100), note: str(400) });
const ride = obj({
  id: str(60),
  name: str(60),
  tag: str(24),
  desc: str(400),
  image: { t: "str", max: 120, pattern: /^(\/[\w\-./]+\.(webp|jpg|jpeg|png))?$/, hint: "pick one of the listed photos" },
});

export const SCHEMA = {
  t: "obj",
  props: {
    isOpen: { t: "bool" },
    reopeningText: str(60),
    subTagline: str(160),
    announcements: {
      t: "arr",
      max: 8,
      of: {
        t: "obj",
        props: {
          status: { t: "enum", vals: ["open", "closed", "info"] },
          label: str(30),
          text: str(200),
        },
      },
    },
    shifts: { t: "obj", props: { day: shift, night: shift } },
    pricing: { t: "obj", props: { weekday: when, weekend: when, holiday: when } },
    extras: {
      t: "obj",
      props: {
        locker: charge,
        costume: { t: "obj", props: { male: charge, female: charge } },
      },
    },
    rides: list(14, ride),
    about: obj({ title: str(120), paragraphs: list(5, str(1000)) }),
    socials: obj({ youtube: url(), instagram: url(), facebook: url() }),
    events: obj({ capacityNote: str(300), roomsNote: str(300), facilities: list(12, facility) }),
    seo: obj({ title: str(100), description: str(300) }),
    services: obj(Object.fromEntries(services.map((sv) => [sv.slug, service]))),
    contact: {
      t: "obj",
      props: {
        address: str(300),
        mapUrl: url(),
        phone: str(20),
        phone2: str(20),
        email: str(100),
        whatsapp: { t: "str", max: 15, pattern: /^\d{10,15}$/, hint: "digits only, with country code (e.g. 919918375703)" },
      },
    },
  },
};

export class ValidationError extends Error {}

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

export function validate(value, node = SCHEMA, path = "config") {
  const bad = (msg) => { throw new ValidationError(`${path}: ${msg}`); };
  switch (node.t) {
    case "bool":
      if (typeof value !== "boolean") bad("must be true or false");
      return value;
    case "str": {
      if (typeof value !== "string") bad("must be text");
      const s = value.trim();
      if (s.length > node.max) bad(`must be ${node.max} characters or fewer`);
      if (node.pattern && s && !node.pattern.test(s)) bad(node.hint || "invalid format");
      return s;
    }
    case "num": {
      if (value === null && node.nullable) return null;
      if (typeof value !== "number" || !Number.isFinite(value)) bad("must be a number");
      if (value < node.min || value > node.max) bad(`must be between ${node.min} and ${node.max}`);
      return Math.round(value);
    }
    case "enum":
      if (!node.vals.includes(value)) bad(`must be one of ${node.vals.join(", ")}`);
      return value;
    case "arr": {
      if (!Array.isArray(value)) bad("must be a list");
      if (value.length > node.max) bad(`at most ${node.max} items`);
      return value.map((v, i) => validate(v, node.of, `${path}[${i}]`));
    }
    case "obj": {
      if (!isObj(value)) bad("must be an object");
      const out = {};
      for (const [k, v] of Object.entries(value)) {
        if (!Object.hasOwn(node.props, k)) bad(`unknown field "${k}"`);
        out[k] = validate(v, node.props[k], `${path}.${k}`);
      }
      return out;
    }
    default:
      bad("bad schema");
  }
}

// Copy only the editable fields out of a full config.
export function pickEditable(cfg, node = SCHEMA) {
  if (node.t !== "obj") return cfg === undefined ? undefined : JSON.parse(JSON.stringify(cfg));
  const out = {};
  for (const k of Object.keys(node.props)) {
    if (cfg?.[k] !== undefined) out[k] = pickEditable(cfg[k], node.props[k]);
  }
  return out;
}

// Keep only the values that differ from the defaults, so future edits to siteConfig.js still apply to the rest.
export function diffFromDefaults(next, base) {
  if (isObj(next)) {
    const out = {};
    for (const [k, v] of Object.entries(next)) {
      const d = diffFromDefaults(v, base?.[k]);
      if (d !== undefined) out[k] = d;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return JSON.stringify(next) === JSON.stringify(base) ? undefined : next;
}

export function deepMerge(base, over) {
  if (!isObj(base) || !isObj(over)) return over === undefined ? base : over;
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) out[k] = deepMerge(base[k], v);
  return out;
}

const telHref = (p) => {
  const d = String(p || "").replace(/\D/g, "");
  return d ? `tel:+${d.length === 10 ? "91" + d : d}` : "";
};

export function applyDerived(cfg) {
  return {
    ...cfg,
    contact: {
      ...cfg.contact,
      phoneHref: telHref(cfg.contact.phone),
      phone2Href: telHref(cfg.contact.phone2),
    },
  };
}
