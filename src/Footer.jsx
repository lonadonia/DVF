import React from 'react';
import { useT, LangContext } from './i18n';

export default function Footer() {
  const t = useT();
  const { lang, setLang } = React.useContext(LangContext);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-dark.png" alt="LDS Admin"/>
            <p className="tagline">{t.footer.tagline}</p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>
              <a href="#" aria-label="GitHub"><i data-lucide="github"></i></a>
              <a href="#" aria-label="YouTube"><i data-lucide="youtube"></i></a>
            </div>
          </div>
          <div className="footer-col"><h4>{t.footer.groups.platform}</h4><ul>{t.footer.platform.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul></div>
          <div className="footer-col"><h4>{t.footer.groups.company}</h4><ul>{t.footer.company.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul></div>
          <div className="footer-col"><h4>{t.footer.groups.legal}</h4><ul>{t.footer.legal.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          <div className="copy">{t.footer.copy}</div>
          <div className="lang" style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.10)' }}>
            <button className={lang === 'cs' ? 'on' : ''} onClick={() => setLang('cs')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px' }}>CZ</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px' }}>EN</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
