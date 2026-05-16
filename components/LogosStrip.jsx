/* LogosStrip — trust bar with utility/partner brand marks */
const PARTNERS = [
  { name: "PRE Distribuce",    icon: "zap" },
  { name: "EG.D",              icon: "radio-tower" },
  { name: "Pražské služby",    icon: "factory" },
  { name: "Mervis",            icon: "gauge" },
  { name: "GridSync",          icon: "git-branch" },
];

function LogosStrip() {
  const t = useT();
  return (
    <section className="logos-strip" aria-label={t.logos.caption} data-screen-label="Logos">
      <div className="container">
        <div className="caption">{t.logos.caption}</div>
        <div className="logos-row">
          {PARTNERS.map(p => (
            <div className="logo-cell" key={p.name}>
              <span className="partner-mark">
                <i data-lucide={p.icon}></i>
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LogosStrip });
