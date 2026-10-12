"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./admin.module.css";

const TABS = [
  { id: "status", label: "Status & notices" },
  { id: "timings", label: "Timings" },
  { id: "pricing", label: "Pricing" },
  { id: "rides", label: "Rides" },
  { id: "pages", label: "Pages" },
  { id: "venue", label: "Venue" },
  { id: "about", label: "About & SEO" },
  { id: "contact", label: "Contact & social" },
];

const RIDE_TAGS = ["Signature", "Thrill", "Party", "Family", "Chill", "Events"];
const newId = (prefix) => `${prefix}-${Date.now().toString(36)}`;
const move = (list, i, d) => {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

const clone = (v) => JSON.parse(JSON.stringify(v));

function setIn(obj, path, value) {
  const next = clone(obj);
  let cur = next;
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]] ??= {};
  cur[path[path.length - 1]] = value;
  return next;
}

function Field({ label, hint, children }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}

function Area({ label, hint, value, onChange, rows = 3, limit }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {limit && <span className={`${styles.count} ${value.length > limit ? styles.countOver : ""}`}>{value.length}/{limit}</span>}
      </span>
      <textarea className={`${styles.input} ${styles.area}`} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}

function Tools({ i, n, onMove, onRemove }) {
  return (
    <div className={styles.tools}>
      <button type="button" className={styles.tool} onClick={() => onMove(-1)} disabled={i === 0} aria-label="Move up">↑</button>
      <button type="button" className={styles.tool} onClick={() => onMove(1)} disabled={i === n - 1} aria-label="Move down">↓</button>
      <button type="button" className={`${styles.tool} ${styles.toolDanger}`} onClick={onRemove} aria-label="Remove">✕</button>
    </div>
  );
}

function StringList({ items, onChange, rows = 2, addLabel, max }) {
  return (
    <div>
      {items.map((t, i) => (
        <div key={i} className={styles.listRow}>
          <textarea className={`${styles.input} ${styles.area}`} rows={rows} value={t} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
          <Tools i={i} n={items.length} onMove={(d) => onChange(move(items, i, d))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
        </div>
      ))}
      <button type="button" className={styles.add} disabled={items.length >= max} onClick={() => onChange([...items, ""])}>{addLabel}</button>
    </div>
  );
}

function Toggle({ checked, onChange, onLabel, offLabel }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className={`${styles.toggle} ${checked ? styles.toggleOn : ""}`} onClick={() => onChange(!checked)}>
      <span className={styles.knob} />
      <span className={styles.toggleText}>{checked ? onLabel : offLabel}</span>
    </button>
  );
}

function Login({ onDone }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) onDone();
    else setError(data.error || "Couldn't sign in.");
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={submit}>
        <div className={styles.brand}>Varanasi Fun City</div>
        <h1 className={styles.loginTitle}>Admin</h1>
        <input type="password" className={styles.input} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus autoComplete="current-password" />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.primary} disabled={busy || !password}>{busy ? "Checking…" : "Sign in"}</button>
      </form>
    </div>
  );
}

const SHIFT_FIELDS = [
  ["hours", "Hours"],
  ["days", "Days"],
  ["note", "Note"],
  ["reopensMonth", "Shown when closed: “Reopens …”"],
];

const PRICE_ROWS = [["adult", "Adult (above 4 ft)"], ["kid", "Kid (3–4 ft)"], ["toddler", "Toddler (under 3 ft)"]];
const PRICE_SETS = [["weekday", "Mon–Fri"], ["weekend", "Sat–Sun"], ["holiday", "Public holidays"]];

function NumberInput({ value, onChange, allowEmpty, prefix }) {
  return (
    <div className={styles.numWrap}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input
        className={`${styles.input} ${prefix ? styles.withPrefix : ""}`}
        inputMode="numeric"
        value={value === null || value === undefined ? "" : value}
        placeholder={allowEmpty ? "hidden" : "0"}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d]/g, "");
          onChange(raw === "" ? (allowEmpty ? null : 0) : Number(raw));
        }}
      />
    </div>
  );
}

export default function AdminApp() {
  const [phase, setPhase] = useState("loading"); // loading | login | ready
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(null);
  const [defaults, setDefaults] = useState(null);
  const [storageReady, setStorageReady] = useState(true);
  const [pages, setPages] = useState([]);
  const [images, setImages] = useState([]);
  const [pageSlug, setPageSlug] = useState("");
  const [tab, setTab] = useState("status");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/config", { cache: "no-store" });
    if (res.status === 401) return setPhase("login");
    const data = await res.json();
    setSettings(clone(data.settings));
    setSaved(clone(data.settings));
    setDefaults(data.defaults);
    setPages(data.pages || []);
    setImages(data.images || []);
    setPageSlug((cur) => cur || data.pages?.[0]?.slug || "");
    setStorageReady(data.storageReady);
    setPhase("ready");
  }, []);

  // initial fetch of the saved settings (state is only set after the request resolves)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const dirty = useMemo(() => JSON.stringify(settings) !== JSON.stringify(saved), [settings, saved]);
  const set = (path, value) => setSettings((s) => setIn(s, path, value));
  const show = (text, kind = "ok") => { setToast({ text, kind }); setTimeout(() => setToast(null), 4000); };

  async function save() {
    setBusy(true);
    const res = await fetch("/api/admin/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ settings }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.status === 401) return setPhase("login");
    if (!res.ok) return show(data.error || "Couldn't save.", "err");
    setSettings(clone(data.settings));
    setSaved(clone(data.settings));
    setStorageReady(data.storageReady);
    show("Published — the website is updated.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setPhase("login");
  }

  if (phase === "loading") return <div className={styles.loginWrap}><p className={styles.muted}>Loading…</p></div>;
  if (phase === "login") return <Login onDone={load} />;

  const s = settings;

  return (
    <div className={styles.root}>
    <div className={styles.page}>
      <header className={styles.top}>
        <div>
          <div className={styles.brand}>Varanasi Fun City</div>
          <h1 className={styles.title}>Site settings</h1>
        </div>
        <div className={styles.topActions}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.ghost}>View site ↗</a>
          <button className={styles.ghost} onClick={logout}>Log out</button>
        </div>
      </header>

      {!storageReady && (
        <div className={styles.warn}>
          Storage isn&apos;t connected yet, so changes can&apos;t be saved. In Vercel open <b>Storage → Create → Blob</b>, connect it to this project, then redeploy.
        </div>
      )}

      <nav className={styles.tabs} role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={`${styles.tab} ${tab === t.id ? styles.tabOn : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </nav>

      {tab === "status" && (
        <>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Water park status</h2>
            <p className={styles.cardSub}>Controls the banner, the hero button, timings, pricing note, the water park page and the chatbot. Weddings and events are not affected.</p>
            <div className={styles.row}>
              <Toggle checked={s.isOpen} onChange={(v) => set(["isOpen"], v)} onLabel="Open" offLabel="Closed for the season" />
            </div>
            <Field label="Reopening (shown when closed)"><input className={styles.input} value={s.reopeningText} onChange={(e) => set(["reopeningText"], e.target.value)} placeholder="March 2027" /></Field>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Announcement bar</h2>
            <p className={styles.cardSub}>Notices shown at the top of every page. Several rotate every few seconds.</p>
            {s.announcements.length === 0 && <p className={styles.muted}>No announcements.</p>}
            {s.announcements.map((a, i) => (
              <div key={i} className={styles.announce}>
                <select className={styles.input} value={a.status} onChange={(e) => set(["announcements", i, "status"], e.target.value)}>
                  <option value="closed">Closed (red)</option>
                  <option value="open">Open (green)</option>
                  <option value="info">Info (blue)</option>
                </select>
                <input className={styles.input} value={a.label} onChange={(e) => set(["announcements", i, "label"], e.target.value)} placeholder="Label" />
                <input className={`${styles.input} ${styles.grow}`} value={a.text} onChange={(e) => set(["announcements", i, "text"], e.target.value)} placeholder="Message — {reopening} is replaced by the reopening text" title="Use {reopening} to insert the reopening text from above" />
                <button className={styles.remove} onClick={() => set(["announcements"], s.announcements.filter((_, j) => j !== i))} aria-label="Remove announcement">✕</button>
              </div>
            ))}
            <button className={styles.add} onClick={() => set(["announcements"], [...s.announcements, { status: "info", label: "Notice", text: "" }])} disabled={s.announcements.length >= 8}>+ Add announcement</button>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Homepage</h2>
            <Field label="Line under the main heading"><input className={styles.input} value={s.subTagline} onChange={(e) => set(["subTagline"], e.target.value)} /></Field>
          </section>
        </>
      )}

      {tab === "timings" && (
        <>
          {["day", "night"].map((k) => (
            <section key={k} className={styles.card}>
              <h2 className={styles.cardTitle}>{k === "day" ? "Day shift" : "Night shift"}</h2>
              <div className={styles.row}>
                <Toggle checked={s.shifts[k].enabled} onChange={(v) => set(["shifts", k, "enabled"], v)} onLabel="Open" offLabel="Closed" />
              </div>
              <div className={styles.grid2}>
                {SHIFT_FIELDS.map(([f, label]) => (
                  <Field key={f} label={label}><input className={styles.input} value={s.shifts[k][f]} onChange={(e) => set(["shifts", k, f], e.target.value)} /></Field>
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {tab === "pricing" && (
        <>
          <p className={styles.cardSub}>Leave a price empty to hide that row. Enter 0 for free.</p>
          {PRICE_SETS.map(([set_, setLabel]) => (
            <section key={set_} className={styles.card}>
              <h2 className={styles.cardTitle}>{setLabel}</h2>
              <div className={styles.priceGrid}>
                <span />
                <span className={styles.colHead}>Day shift</span>
                <span className={styles.colHead}>Night shift</span>
                {PRICE_ROWS.map(([row, rowLabel]) => (
                  <PriceRow key={row} label={rowLabel}>
                    <NumberInput prefix="₹" allowEmpty value={s.pricing[set_].day[row]} onChange={(v) => set(["pricing", set_, "day", row], v)} />
                    <NumberInput prefix="₹" allowEmpty value={s.pricing[set_].night[row]} onChange={(v) => set(["pricing", set_, "night", row], v)} />
                  </PriceRow>
                ))}
              </div>
            </section>
          ))}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Locker & costume</h2>
            <div className={styles.priceGrid}>
              <span />
              <span className={styles.colHead}>Charge</span>
              <span className={styles.colHead}>Refundable deposit</span>
              {[["Locker", ["extras", "locker"], s.extras.locker], ["Costume — male", ["extras", "costume", "male"], s.extras.costume.male], ["Costume — female", ["extras", "costume", "female"], s.extras.costume.female]].map(([label, path, v]) => (
                <PriceRow key={label} label={label}>
                  <NumberInput prefix="₹" value={v.charge} onChange={(n) => set([...path, "charge"], n)} />
                  <NumberInput prefix="₹" value={v.deposit} onChange={(n) => set([...path, "deposit"], n)} />
                </PriceRow>
              ))}
            </div>
          </section>
        </>
      )}


      {tab === "rides" && (
        <>
          <p className={styles.cardSub}>Shown in “Rides &amp; Attractions” on the homepage, in this order.</p>
          {s.rides.map((r, i) => (
            <section key={r.id || i} className={styles.card}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>{r.name || "New ride"}</h2>
                <Tools i={i} n={s.rides.length} onMove={(d) => set(["rides"], move(s.rides, i, d))} onRemove={() => set(["rides"], s.rides.filter((_, j) => j !== i))} />
              </div>
              <div className={styles.grid2}>
                <Field label="Name"><input className={styles.input} value={r.name} onChange={(e) => set(["rides", i, "name"], e.target.value)} /></Field>
                <Field label="Label">
                  <select className={styles.input} value={r.tag} onChange={(e) => set(["rides", i, "tag"], e.target.value)}>
                    {[...new Set([...RIDE_TAGS, r.tag].filter(Boolean))].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Area label="Description" rows={2} value={r.desc} onChange={(v) => set(["rides", i, "desc"], v)} />
              <div className={styles.photoPick}>
                {r.image && /* eslint-disable-next-line @next/next/no-img-element */ <img src={r.image} alt="" className={styles.thumb} />}
                <Field label="Photo">
                  <select className={styles.input} value={r.image} onChange={(e) => set(["rides", i, "image"], e.target.value)}>
                    <option value="">No photo</option>
                    {[...new Set([...images, r.image].filter(Boolean))].map((img) => <option key={img} value={img}>{img.slice(1)}</option>)}
                  </select>
                </Field>
              </div>
            </section>
          ))}
          <button className={styles.add} disabled={s.rides.length >= 14} onClick={() => set(["rides"], [...s.rides, { id: newId("ride"), name: "", tag: "Family", desc: "", image: "" }])}>+ Add ride</button>
        </>
      )}

      {tab === "pages" && pageSlug && s.services[pageSlug] && (() => {
        const pg = s.services[pageSlug];
        const at = (k, v) => set(["services", pageSlug, k], v);
        return (
          <>
            <section className={styles.card}>
              <Field label="Page" hint="Text that sets the water park closure, phone numbers or venue notes is filled in automatically. Keep {{closure}}, {{capacityNote}} and {{roomsNote}} exactly as they are.">
                <select className={styles.input} value={pageSlug} onChange={(e) => setPageSlug(e.target.value)}>
                  {pages.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
                </select>
              </Field>
            </section>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Search result description</h2>
              <p className={styles.cardSub}>What Google shows under the page title. About 150–160 characters works best.</p>
              <Area label="Description" rows={3} limit={160} value={pg.metaDescription} onChange={(v) => at("metaDescription", v)} />
            </section>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Introduction</h2>
              <p className={styles.cardSub}>Paragraphs at the top of the page.</p>
              <StringList items={pg.intro} rows={4} max={6} addLabel="+ Add paragraph" onChange={(v) => at("intro", v)} />
            </section>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Why choose us</h2>
              <StringList items={pg.whyChoose} max={12} addLabel="+ Add point" onChange={(v) => at("whyChoose", v)} />
            </section>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Good to know</h2>
              <StringList items={pg.planningTips} max={12} addLabel="+ Add tip" onChange={(v) => at("planningTips", v)} />
            </section>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Questions &amp; answers</h2>
              <p className={styles.cardSub}>Shown on the page and given to Google as FAQs.</p>
              {pg.faqs.map((f, i) => (
                <div key={i} className={styles.faq}>
                  <div className={styles.cardHead}>
                    <span className={styles.label}>Question {i + 1}</span>
                    <Tools i={i} n={pg.faqs.length} onMove={(d) => at("faqs", move(pg.faqs, i, d))} onRemove={() => at("faqs", pg.faqs.filter((_, j) => j !== i))} />
                  </div>
                  <input className={styles.input} value={f.q} onChange={(e) => set(["services", pageSlug, "faqs", i, "q"], e.target.value)} placeholder="Question" />
                  <textarea className={`${styles.input} ${styles.area}`} rows={3} value={f.a} onChange={(e) => set(["services", pageSlug, "faqs", i, "a"], e.target.value)} placeholder="Answer" />
                </div>
              ))}
              <button className={styles.add} disabled={pg.faqs.length >= 25} onClick={() => at("faqs", [...pg.faqs, { q: "", a: "" }])}>+ Add question</button>
            </section>
          </>
        );
      })()}

      {tab === "venue" && (
        <>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Venue notes</h2>
            <p className={styles.cardSub}>Used on every wedding, event and party page and in the chatbot.</p>
            <Area label="Guest capacity" rows={2} value={s.events.capacityNote} onChange={(v) => set(["events", "capacityNote"], v)} />
            <Area label="Rooms (AC Deluxe Rooms)" rows={2} value={s.events.roomsNote} onChange={(v) => set(["events", "roomsNote"], v)} />
          </section>
          <p className={styles.cardSub}>What&apos;s available — shown on every wedding, event and party page.</p>
          {s.events.facilities.map((f, i) => (
            <section key={f.id || i} className={styles.card}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>{f.label || "New item"}</h2>
                <Tools i={i} n={s.events.facilities.length} onMove={(d) => set(["events", "facilities"], move(s.events.facilities, i, d))} onRemove={() => set(["events", "facilities"], s.events.facilities.filter((_, j) => j !== i))} />
              </div>
              <Field label="Title"><input className={styles.input} value={f.label} onChange={(e) => set(["events", "facilities", i, "label"], e.target.value)} /></Field>
              <Area label="Details" rows={2} value={f.note} onChange={(v) => set(["events", "facilities", i, "note"], v)} />
            </section>
          ))}
          <button className={styles.add} disabled={s.events.facilities.length >= 12} onClick={() => set(["events", "facilities"], [...s.events.facilities, { id: newId("facility"), label: "", note: "" }])}>+ Add facility</button>
        </>
      )}

      {tab === "about" && (
        <>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Homepage “About the park”</h2>
            <Field label="Heading"><input className={styles.input} value={s.about.title} onChange={(e) => set(["about", "title"], e.target.value)} /></Field>
            <span className={styles.label}>Paragraphs</span>
            <StringList items={s.about.paragraphs} rows={4} max={5} addLabel="+ Add paragraph" onChange={(v) => set(["about", "paragraphs"], v)} />
          </section>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Google search listing for the homepage</h2>
            <p className={styles.cardSub}>The title and description people see in search results.</p>
            <Field label={`Title (${s.seo.title.length}/60)`}><input className={styles.input} value={s.seo.title} onChange={(e) => set(["seo", "title"], e.target.value)} /></Field>
            <Area label="Description" rows={3} limit={160} value={s.seo.description} onChange={(v) => set(["seo", "description"], v)} />
          </section>
        </>
      )}

      {tab === "contact" && (
        <>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Contact details</h2>
          <p className={styles.cardSub}>Used on every page, the contact page, the footer, the WhatsApp button and the chatbot.</p>
          <div className={styles.grid2}>
            <Field label="Main phone"><input className={styles.input} value={s.contact.phone} onChange={(e) => set(["contact", "phone"], e.target.value)} /></Field>
            <Field label="Second phone"><input className={styles.input} value={s.contact.phone2} onChange={(e) => set(["contact", "phone2"], e.target.value)} /></Field>
            <Field label="Email"><input className={styles.input} value={s.contact.email} onChange={(e) => set(["contact", "email"], e.target.value)} /></Field>
            <Field label="WhatsApp number" hint="Digits only with country code, e.g. 919918375703"><input className={styles.input} value={s.contact.whatsapp} onChange={(e) => set(["contact", "whatsapp"], e.target.value.replace(/\D/g, ""))} /></Field>
          </div>
          <Area label="Address" rows={2} value={s.contact.address} onChange={(v) => set(["contact", "address"], v)} />
          <Field label="Google Maps link" hint="Where “Get directions” opens"><input className={styles.input} value={s.contact.mapUrl} onChange={(e) => set(["contact", "mapUrl"], e.target.value)} /></Field>
        </section>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Social links</h2>
          <p className={styles.cardSub}>Shown as icons in the footer. Leave Facebook empty to hide it.</p>
          <Field label="Instagram"><input className={styles.input} value={s.socials.instagram} onChange={(e) => set(["socials", "instagram"], e.target.value)} placeholder="https://" /></Field>
          <Field label="YouTube"><input className={styles.input} value={s.socials.youtube} onChange={(e) => set(["socials", "youtube"], e.target.value)} placeholder="https://" /></Field>
          <Field label="Facebook"><input className={styles.input} value={s.socials.facebook} onChange={(e) => set(["socials", "facebook"], e.target.value)} placeholder="https://" /></Field>
        </section>
        </>
      )}

      <div className={styles.spacer} />
      <div className={styles.bar}>
        <span className={styles.barText}>{dirty ? "You have unsaved changes" : "All changes are live"}</span>
        <div className={styles.barActions}>
          <button className={styles.ghost} disabled={busy} onClick={() => setSettings(clone(defaults))} title="Fill the form with the original values from the code, then publish to apply">Reset to defaults</button>
          <button className={styles.ghost} disabled={!dirty || busy} onClick={() => setSettings(clone(saved))}>Discard</button>
          <button className={styles.primary} disabled={!dirty || busy} onClick={save}>{busy ? "Publishing…" : "Publish changes"}</button>
        </div>
      </div>

      {toast && <div className={`${styles.toast} ${toast.kind === "err" ? styles.toastErr : ""}`} role="status">{toast.text}</div>}
    </div>
    </div>
  );
}

function PriceRow({ label, children }) {
  const [a, b] = Array.isArray(children) ? children : [children];
  return (
    <>
      <span className={styles.rowLabel}>{label}</span>
      {a}
      {b}
    </>
  );
}
