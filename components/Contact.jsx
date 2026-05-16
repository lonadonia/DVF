/* Contact — split white form / dark info card. Posts to /api/contact. */

function ContactMap({ tweaks }) {
  const style = tweaks.mapStyle || "grid";
  const t = useT();

  let body;
  if (style === "satellite") {
    body = (
      <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="cmSat" cx="40%" cy="40%" r="80%">
            <stop offset="0%"  stopColor="#1F3A56" />
            <stop offset="60%" stopColor="#0F1E2E" />
            <stop offset="100%" stopColor="#070C13" />
          </radialGradient>
        </defs>
        <rect width="400" height="170" fill="url(#cmSat)"/>
        <path d="M-10 100 C 80 70, 160 130, 240 90 S 380 70, 420 110"
              stroke="rgba(80,140,200,0.45)" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M40 20 L 200 85 L 360 20" stroke="rgba(255,200,120,0.18)" strokeWidth="1.5" fill="none"/>
        <rect x="60"  y="30" width="40" height="22" fill="rgba(255,255,255,0.05)" rx="2"/>
        <rect x="250" y="40" width="46" height="20" fill="rgba(255,255,255,0.05)" rx="2"/>
        <rect x="60"  y="120" width="38" height="24" fill="rgba(255,255,255,0.05)" rx="2"/>
        <rect x="290" y="115" width="44" height="22" fill="rgba(255,255,255,0.05)" rx="2"/>
      </svg>
    );
  } else if (style === "dots") {
    body = (
      <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="170" fill="#06070C"/>
        <g fill="rgba(70,95,255,0.18)">
          {Array.from({length: 11}).map((_, ri) =>
            Array.from({length: 25}).map((__, ci) => (
              <circle key={`cd-${ri}-${ci}`} cx={10 + ci*16} cy={10 + ri*16} r="0.9"/>
            ))
          )}
        </g>
        <circle cx="200" cy="85" r="36" fill="none" stroke="rgba(70,95,255,0.45)" strokeWidth="1"/>
        <circle cx="200" cy="85" r="68" fill="none" stroke="rgba(70,95,255,0.22)" strokeWidth="1" strokeDasharray="2 5"/>
      </svg>
    );
  } else {
    body = (
      <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="cmGrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0 L0 0 0 22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="400" height="170" fill="#0A0F19"/>
        <rect width="400" height="170" fill="url(#cmGrid)"/>
        <path d="M0 80 C 80 60, 140 110, 200 80 S 320 60, 400 90" stroke="rgba(70,95,255,0.22)" strokeWidth="2" fill="none"/>
        <path d="M0 110 C 80 95, 140 140, 200 115 S 320 90, 400 120" stroke="rgba(70,95,255,0.10)" strokeWidth="2" fill="none"/>
        <path d="M40 20 L 200 85 L 360 20" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none"/>
        <path d="M30 150 L 200 85 L 370 150" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none"/>
      </svg>
    );
  }

  return (
    <div className="contact-map" aria-hidden="true">
      {body}
      <span className="pin"></span>
      <span className="pin-label">{t.contact.pinLabel}</span>
    </div>
  );
}

function Contact({ tweaks }) {
  const t = useT();
  const [form, setForm] = React.useState({
    name: "", company: "", email: "", phone: "", role: "", message: "",
  });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [consent, setConsent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched(t => ({ ...t, [k]: true }));

  const validate = (state) => {
    const e = {};
    if (!state.name.trim())     e.name    = t.contact.errors.name;
    if (!state.company.trim())  e.company = t.contact.errors.company;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) e.email = t.contact.errors.email;
    if (!state.message.trim())  e.message = t.contact.errors.message;
    return e;
  };

  React.useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, company: true, email: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length || !consent) return;
    setSending(true);
    try {
      // Best-effort POST. Will silently fail in the prototype; UI flips to success either way.
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => {});
      // GTM event for conversion tracking
      if (window.dataLayer) {
        window.dataLayer.push({ event: "contact_submit", form_id: "lds_admin_contact" });
      }
    } finally {
      setTimeout(() => { setSending(false); setSent(true); }, 500);
    }
  };

  const showErr = (k) => touched[k] && errors[k];

  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="container">
        <div className="contact-card">
          {/* form side */}
          <div className="contact-form-side">
            {sent ? (
              <div className="contact-success" role="status" aria-live="polite">
                <span className="check-ring">
                  <span className="check-circle">
                    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12 L10 17 L19 7"/>
                    </svg>
                  </span>
                </span>
                <h3>{t.contact.success.h}</h3>
                <p>{t.contact.success.p}</p>
              </div>
            ) : (
              <>
                <h2>{t.contact.h2}</h2>
                <p className="sub">{t.contact.sub}</p>
                <form className="contact-form" onSubmit={onSubmit} action="/api/contact" method="post" noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="c-name">{t.contact.labels.name}</label>
                      <input id="c-name" name="name" type="text"
                        placeholder={t.contact.placeholders.name}
                        value={form.name} onChange={set("name")} onBlur={blur("name")}
                        aria-invalid={!!showErr("name")} required autoComplete="name"
                      />
                      {showErr("name") && <span className="err"><i data-lucide="alert-circle"></i>{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="c-company">{t.contact.labels.company}</label>
                      <input id="c-company" name="company" type="text"
                        placeholder={t.contact.placeholders.company}
                        value={form.company} onChange={set("company")} onBlur={blur("company")}
                        aria-invalid={!!showErr("company")} required autoComplete="organization"
                      />
                      {showErr("company") && <span className="err"><i data-lucide="alert-circle"></i>{errors.company}</span>}
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="c-email">{t.contact.labels.email}</label>
                      <input id="c-email" name="email" type="email"
                        placeholder={t.contact.placeholders.email}
                        value={form.email} onChange={set("email")} onBlur={blur("email")}
                        aria-invalid={!!showErr("email")} required autoComplete="email"
                      />
                      {showErr("email") && <span className="err"><i data-lucide="alert-circle"></i>{errors.email}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="c-phone">{t.contact.labels.phone} <span className="opt">{t.contact.labels.optional}</span></label>
                      <input id="c-phone" name="phone" type="tel"
                        placeholder={t.contact.placeholders.phone}
                        value={form.phone} onChange={set("phone")} autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="c-role">{t.contact.labels.role} <span className="opt">{t.contact.labels.optional}</span></label>
                    <select id="c-role" name="role" value={form.role} onChange={set("role")}>
                      <option value="">{t.contact.labels.select}</option>
                      {t.contact.roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="c-message">{t.contact.labels.message}</label>
                    <textarea id="c-message" name="message" rows="4"
                      placeholder={t.contact.placeholders.message}
                      value={form.message} onChange={set("message")} onBlur={blur("message")}
                      aria-invalid={!!showErr("message")} required
                    />
                    {showErr("message") && <span className="err"><i data-lucide="alert-circle"></i>{errors.message}</span>}
                  </div>

                  <label className="consent">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                    <span className="box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12 L10 17 L19 7"/>
                      </svg>
                    </span>
                    <span>
                      {t.contact.labels.consent}{" "}
                      <a href="#privacy">{t.contact.labels.consentLink}</a>.
                    </span>
                  </label>

                  <button type="submit" className="btn btn--primary btn--block" disabled={!consent || sending}>
                    {sending ? t.contact.labels.sending : t.contact.labels.submit}
                    {!sending && <span aria-hidden>→</span>}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* info side */}
          <aside className="contact-info-side">
            <h3>{t === I18N.cs ? "Kontaktní údaje" : "Contact details"}</h3>
            <div className="info-list">
              <div className="info-row">
                <span className="ic"><i data-lucide="mail"></i></span>
                <div>
                  <div className="k">{t.contact.info.email}</div>
                  <div className="v"><a href="mailto:sales@lds-admin.cz">sales@lds-admin.cz</a></div>
                </div>
              </div>
              <div className="info-row">
                <span className="ic"><i data-lucide="phone"></i></span>
                <div>
                  <div className="k">{t.contact.info.phone}</div>
                  <div className="v"><a href="tel:+420226211400">+420 226 211 400</a></div>
                </div>
              </div>
              <div className="info-row">
                <span className="ic"><i data-lucide="map-pin"></i></span>
                <div>
                  <div className="k">{t.contact.info.address}</div>
                  <div className="v">{t.contact.info.addressValue}</div>
                </div>
              </div>
            </div>

            <ContactMap tweaks={tweaks} />

            <div className="trust-badges">
              <span className="tbadge"><i data-lucide="lock"></i> {t.contact.badges[0]}</span>
              <span className="tbadge"><i data-lucide="shield-check"></i> {t.contact.badges[1]}</span>
              <span className="tbadge"><i data-lucide="badge-check"></i> {t.contact.badges[2]}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Contact });
