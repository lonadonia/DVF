/* Navbar — sticky transparent over hero, solid after scroll */
function Navbar() {
  const t = useT();
  const { lang, setLang } = React.useContext(LangContext);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")} aria-label={t.nav.langLabel} data-screen-label="Navbar">
      <div className="container">
        <a className="nav-logo" href="#" aria-label="LDS Admin">
          <img src="assets/logo-dark.png" alt="LDS Admin" />
        </a>
        <div className="nav-links">
          <a href="#features">{t.nav.features}</a>
          <a href="#audience">{t.nav.audience}</a>
          <a href="#integrations">{t.nav.integrations}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div className="nav-right">
          <div className="lang" role="group" aria-label={t.nav.langLabel}>
            <button
              className={lang === "cs" ? "on" : ""}
              onClick={() => setLang("cs")}
              aria-pressed={lang === "cs"}
            >CZ</button>
            <button
              className={lang === "en" ? "on" : ""}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >EN</button>
          </div>
          <a
            className="btn btn--primary"
            href="https://main.ldsadmin.cz"
            data-cta="signin"
          >{t.nav.signin} <span aria-hidden>→</span></a>
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, { Navbar });
