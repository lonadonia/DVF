/* Integrations — 8-tile grid of connectors */
function Integrations() {
  const t = useT();
  return (
    <section className="integrations" id="integrations" data-screen-label="Integrations">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t.integrations.eyebrow}</div>
          <h2>{t.integrations.h2}</h2>
          <p>{t.integrations.sub}</p>
        </div>
        <div className="integrations-grid">
          {t.integrations.items.map(it => (
            <article className="int-tile" key={it.name}>
              <div className="head">
                <span className="mark"><i data-lucide={it.icon}></i></span>
                <div>
                  <div className="name">{it.name}</div>
                  <div className="type">{it.type}</div>
                </div>
              </div>
              <p>{it.desc}</p>
              <span className="status">
                {t === I18N.cs ? "Aktivní" : "Active"}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Integrations });
