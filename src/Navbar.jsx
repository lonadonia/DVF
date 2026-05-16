import React from 'react';
import { useT, LangContext } from './i18n';

export default function Navbar() {
  const t = useT();
  const { lang, setLang } = React.useContext(LangContext);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container">
        <a className="nav-logo" href="#"><img src="/assets/logo-dark.png" alt="LDS Admin" /></a>
        <div className="nav-links">
          <a href="#features">{t.nav.features}</a>
          <a href="#audience">{t.nav.audience}</a>
          <a href="#integrations">{t.nav.integrations}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="nav-right">
          <div className="lang">
            <button className={lang === 'cs' ? 'on' : ''} onClick={() => setLang('cs')}>CZ</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="btn btn--primary" href="https://main.ldsadmin.cz">{t.nav.signin} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </nav>
  );
}
