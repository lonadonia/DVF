import React from 'react';
import { useT, LangContext } from './i18n';

export default function Navbar() {
  const t = useT();
  const { lang, setLang, surface, setSurface } = React.useContext(LangContext);
  const [scrolled, setScrolled] = React.useState(false);
  const isDark = surface === 'dark';

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // White nav in light mode always needs the dark logo; dark mode always uses white logo
  const logoSrc = isDark ? '/assets/logo-dark.png' : '/assets/logo-light.png';

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '') + (isDark ? ' dark-mode' : '')}>
      <div className="container">
        <a className="nav-logo" href="#">
          <img src={logoSrc} alt="LDS Admin" />
        </a>
        <div className="nav-links">
          <a href="#features">{t.nav.features}</a>
          <a href="#audience">{t.nav.audience}</a>
          <a href="#integrations">{t.nav.integrations}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="nav-right">
          <button
            className="theme-btn"
            onClick={() => setSurface(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i data-lucide={isDark ? 'sun' : 'moon'}></i>
          </button>
          <div className="lang">
            <button className={lang === 'cs' ? 'on' : ''} onClick={() => setLang('cs')}>CZ</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="btn btn--primary" href="https://main.ldsadmin.cz">
            {t.nav.signin} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
