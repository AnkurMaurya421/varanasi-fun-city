"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./admin.module.css";

const TABS = [
  { id: "status", label: "Status & notices" },
  { id: "timings", label: "Timings" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

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
                <input className={`${styles.input} ${styles.grow}`} value={a.text} onChange={(e) => set(["announcements", i, "text"], e.target.value)} placeholder="Message" />
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

      {tab === "contact" && (
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Contact details</h2>
          <p className={styles.cardSub}>Used on every page, the contact page, the footer, the WhatsApp button and the chatbot.</p>
          <div className={styles.grid2}>
            <Field label="Main phone"><input className={styles.input} value={s.contact.phone} onChange={(e) => set(["contact", "phone"], e.target.value)} /></Field>
            <Field label="Second phone"><input className={styles.input} value={s.contact.phone2} onChange={(e) => set(["contact", "phone2"], e.target.value)} /></Field>
            <Field label="Email"><input className={styles.input} value={s.contact.email} onChange={(e) => set(["contact", "email"], e.target.value)} /></Field>
            <Field label="WhatsApp number" hint="Digits only with country code, e.g. 919918375703"><input className={styles.input} value={s.contact.whatsapp} onChange={(e) => set(["contact", "whatsapp"], e.target.value.replace(/\D/g, ""))} /></Field>
          </div>
        </section>
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
