/* Hero — dark navy, animated grid, dashboard mock on right */
function Hero() {
  const t = useT();
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <span className="hero-trace t1" aria-hidden="true"></span>
      <span className="hero-trace t2" aria-hidden="true"></span>
      <span className="hero-trace t3" aria-hidden="true"></span>
      <div className="container">
        <div className="hero-inner">
          <div>
            <h1>
              {t.hero.h1a} <span className="accent">{t.hero.h1b}</span>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-cta">
              <a className="btn btn--primary btn--lg" href="https://main.ldsadmin.cz" data-cta="hero-signin">
                {t.hero.cta1} <span aria-hidden>→</span>
              </a>
              <a className="btn btn--ghost-dark btn--lg" href="#contact" data-cta="hero-demo">
                {t.hero.cta2}
              </a>
            </div>
            <div className="hero-trust">
              <span><span className="dot"></span> {t.hero.trust1}</span>
              <span className="sep">·</span>
              <span><b>{t.hero.trust2a}</b> {t.hero.trust2b}</span>
              <span className="sep">·</span>
              <span><b>{t.hero.trust3a}</b> {t.hero.trust3b}</span>
            </div>
          </div>
          <div className="hero-mock-wrap">
            <div className="glow" aria-hidden="true"></div>
            <div className="mock"><DashboardMock /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
