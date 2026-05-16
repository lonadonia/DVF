/* Footer — link grid + bottom bar */
function FlagCZ() {
  return (
    <span className="flag" aria-hidden="true">
      <svg viewBox="0 0 6 4">
        <rect width="6" height="2" fill="#FFFFFF"/>
        <rect y="2" width="6" height="2" fill="#11457E"/>
        <polygon points="0,0 3,2 0,4" fill="#D7141A"/>
      </svg>
    </span>
  );
}
function FlagGB() {
  return (
    <span className="flag" aria-hidden="true">
      <svg viewBox="0 0 60 30">
        <clipPath id="ft"><rect width="60" height="30"/></clipPath>
        <rect width="60" height="30" fill="#012169"/>
        <g clipPath="url(#ft)">
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#FFF" strokeWidth="10"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    </span>
  );
}

function Footer() {
  const t = useT();
  const { lang, setLang } = React.useContext(LangContext);

  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="assets/logo-dark.png" alt="LDS Admin" />
            <p className="tagline">{t.footer.tagline}</p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>
              <a href="#" aria-label="GitHub"><i data-lucide="github"></i></a>
              <a href="#" aria-label="YouTube"><i data-lucide="youtube"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t.footer.groups.platform}</h4>
            <ul>{t.footer.platform.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer.groups.company}</h4>
            <ul>{t.footer.company.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer.groups.legal}</h4>
            <ul>{t.footer.legal.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copy">{t.footer.copy}</div>
          <div className="lang" role="group" aria-label={t.nav.langLabel} style={{ background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.10)" }}>
            <button
              className={lang === "cs" ? "on" : ""}
              onClick={() => setLang("cs")}
              aria-pressed={lang === "cs"}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px" }}
            >
              <FlagCZ /> Czech
            </button>
            <button
              className={lang === "en" ? "on" : ""}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px" }}
            >
              <FlagGB /> English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
