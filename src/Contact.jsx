import React from 'react';
import { useT, I18N } from './i18n';

export default function Contact({ tweaks }) {
  const t = useT();
  const isCS = t === I18N.cs;
  const [form, setForm] = React.useState({ name: '', company: '', email: '', phone: '', role: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [consent, setConsent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched(p => ({ ...p, [k]: true }));

  const validate = (state) => {
    const e = {};
    if (!state.name.trim())    e.name    = t.contact.errors.name;
    if (!state.company.trim()) e.company = t.contact.errors.company;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) e.email = t.contact.errors.email;
    if (!state.message.trim()) e.message = t.contact.errors.message;
    return e;
  };

  React.useEffect(() => { setErrors(validate(form)); }, [form, t]);

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, company: true, email: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length || !consent) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  };

  const showErr = (k) => touched[k] && errors[k];

  const mapStyle = tweaks?.mapStyle || 'grid';

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-card">
          <div className="contact-form-side">
            {sent ? (
              <div className="contact-success" role="status">
                <span className="check-ring"><span className="check-circle">
                  <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 L10 17 L19 7"/></svg>
                </span></span>
                <h3>{t.contact.success.h}</h3>
                <p>{t.contact.success.p}</p>
              </div>
            ) : (
              <>
                <h2>{t.contact.h2}</h2>
                <p className="sub">{t.contact.sub}</p>
                <form className="contact-form" onSubmit={onSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="c-name">{t.contact.labels.name}</label>
                      <input id="c-name" type="text" placeholder={t.contact.placeholders.name} value={form.name} onChange={set('name')} onBlur={blur('name')} required autoComplete="name"/>
                      {showErr('name') && <span className="err">{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="c-company">{t.contact.labels.company}</label>
                      <input id="c-company" type="text" placeholder={t.contact.placeholders.company} value={form.company} onChange={set('company')} onBlur={blur('company')} required autoComplete="organization"/>
                      {showErr('company') && <span className="err">{errors.company}</span>}
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="c-email">{t.contact.labels.email}</label>
                      <input id="c-email" type="email" placeholder={t.contact.placeholders.email} value={form.email} onChange={set('email')} onBlur={blur('email')} required autoComplete="email"/>
                      {showErr('email') && <span className="err">{errors.email}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="c-phone">{t.contact.labels.phone} <span className="opt">{t.contact.labels.optional}</span></label>
                      <input id="c-phone" type="tel" placeholder={t.contact.placeholders.phone} value={form.phone} onChange={set('phone')} autoComplete="tel"/>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="c-role">{t.contact.labels.role} <span className="opt">{t.contact.labels.optional}</span></label>
                    <select id="c-role" value={form.role} onChange={set('role')}>
                      <option value="">{t.contact.labels.select}</option>
                      {t.contact.roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="c-message">{t.contact.labels.message}</label>
                    <textarea id="c-message" rows="4" placeholder={t.contact.placeholders.message} value={form.message} onChange={set('message')} onBlur={blur('message')} required/>
                    {showErr('message') && <span className="err">{errors.message}</span>}
                  </div>
                  <label className="consent">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}/>
                    <span className="box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 L10 17 L19 7"/></svg></span>
                    <span>{t.contact.labels.consent} <a href="#privacy">{t.contact.labels.consentLink}</a>.</span>
                  </label>
                  <button type="submit" className="btn btn--primary btn--block" disabled={!consent || sending}>
                    {sending ? t.contact.labels.sending : t.contact.labels.submit}
                    {!sending && <span aria-hidden="true">→</span>}
                  </button>
                </form>
              </>
            )}
          </div>
          <aside className="contact-info-side">
            <h3>{isCS ? "Kontaktní údaje" : "Contact details"}</h3>
            <div className="info-list">
              <div className="info-row"><span className="ic"><i data-lucide="mail"></i></span><div><div className="k">{t.contact.info.email}</div><div className="v"><a href="mailto:sales@lds-admin.cz">sales@lds-admin.cz</a></div></div></div>
              <div className="info-row"><span className="ic"><i data-lucide="phone"></i></span><div><div className="k">{t.contact.info.phone}</div><div className="v"><a href="tel:+420226211400">+420 226 211 400</a></div></div></div>
              <div className="info-row"><span className="ic"><i data-lucide="map-pin"></i></span><div><div className="k">{t.contact.info.address}</div><div className="v">{t.contact.info.addressValue}</div></div></div>
            </div>
            <div className="contact-map">
              <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
                <defs><pattern id="cmGrid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0 L0 0 0 22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/></pattern></defs>
                <rect width="400" height="170" fill="#0A0F19"/>
                <rect width="400" height="170" fill="url(#cmGrid)"/>
                <path d="M0 80 C 80 60, 140 110, 200 80 S 320 60, 400 90" stroke="rgba(70,95,255,0.22)" strokeWidth="2" fill="none"/>
              </svg>
              <span className="pin"></span>
              <span className="pin-label">{t.contact.pinLabel}</span>
            </div>
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
