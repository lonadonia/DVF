/* AudienceVisual — visual shown next to the active audience tab.
   For "operator" it's a grid map; "facility" is a building schematic;
   "industry" is a substation/plant diagram. The map style is tweakable. */

function MapStyleGrid({ tweaks }) {
  // grid + paths + nodes
  return (
    <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="gridMap" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0 L0 0 0 32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        </pattern>
        <radialGradient id="gridGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(70,95,255,0.18)" />
          <stop offset="100%" stopColor="rgba(70,95,255,0)" />
        </radialGradient>
      </defs>
      <rect width="500" height="400" fill="#0A0F19"/>
      <rect width="500" height="400" fill="url(#gridGlow)"/>
      <rect width="500" height="400" fill="url(#gridMap)"/>
      {/* main rings around Praha 4 */}
      <circle cx="250" cy="220" r="40"  fill="none" stroke="rgba(70,95,255,0.45)" strokeWidth="1.25"/>
      <circle cx="250" cy="220" r="100" fill="none" stroke="rgba(70,95,255,0.25)" strokeWidth="1"/>
      <circle cx="250" cy="220" r="170" fill="none" stroke="rgba(70,95,255,0.12)" strokeWidth="1"/>
      {/* feeder lines */}
      <path d="M250,220 L120,90"  stroke="rgba(70,95,255,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M250,220 L380,120" stroke="rgba(70,95,255,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M250,220 L100,300" stroke="rgba(70,95,255,0.4)" strokeWidth="1.25" fill="none"/>
      <path d="M250,220 L400,310" stroke="rgba(70,95,255,0.5)" strokeWidth="1.5" fill="none"/>
      <path d="M250,220 L230,360" stroke="rgba(70,95,255,0.4)" strokeWidth="1.25" fill="none"/>
    </svg>
  );
}

function MapStyleSatellite({ tweaks }) {
  return (
    <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="satBg" cx="40%" cy="40%" r="80%">
          <stop offset="0%"  stopColor="#1F3A56" />
          <stop offset="50%" stopColor="#0F1E2E" />
          <stop offset="100%" stopColor="#070C13" />
        </radialGradient>
        <pattern id="satTexture" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="rgba(255,255,255,0)"/>
          <circle cx="3" cy="3" r="0.4" fill="rgba(255,255,255,0.04)"/>
        </pattern>
      </defs>
      <rect width="500" height="400" fill="url(#satBg)"/>
      <rect width="500" height="400" fill="url(#satTexture)"/>
      {/* Vltava-like river */}
      <path d="M-20 280 C 80 220, 160 320, 240 240 S 380 200, 520 260"
            stroke="rgba(80,140,200,0.45)" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <path d="M-20 280 C 80 220, 160 320, 240 240 S 380 200, 520 260"
            stroke="rgba(180,210,240,0.18)" strokeWidth="2" fill="none"/>
      {/* roads */}
      <path d="M40 60 L 250 220 L 460 80" stroke="rgba(255,200,120,0.18)" strokeWidth="2" fill="none"/>
      <path d="M60 380 L 250 220 L 450 360" stroke="rgba(255,200,120,0.12)" strokeWidth="1.5" fill="none"/>
      <path d="M120 0 L 120 400" stroke="rgba(255,200,120,0.10)" strokeWidth="1" fill="none"/>
      <path d="M380 0 L 380 400" stroke="rgba(255,200,120,0.10)" strokeWidth="1" fill="none"/>
      {/* district blocks */}
      <g fill="rgba(255,255,255,0.04)">
        <rect x="80"  y="90"  width="50" height="34" rx="3"/>
        <rect x="310" y="60"  width="60" height="28" rx="3"/>
        <rect x="40"  y="160" width="60" height="36" rx="3"/>
        <rect x="350" y="160" width="58" height="42" rx="3"/>
        <rect x="60"  y="340" width="60" height="34" rx="3"/>
        <rect x="380" y="320" width="56" height="42" rx="3"/>
      </g>
    </svg>
  );
}

function MapStyleDark({ tweaks }) {
  return (
    <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="500" height="400" fill="#06070C"/>
      {/* dotted matrix */}
      <g fill="rgba(70,95,255,0.18)">
        {Array.from({length: 22}).map((_, ri) =>
          Array.from({length: 28}).map((__, ci) => (
            <circle key={`${ri}-${ci}`} cx={10 + ci*18} cy={10 + ri*18} r="0.8"/>
          ))
        )}
      </g>
      {/* concentric tower rings */}
      <circle cx="250" cy="200" r="48"  fill="none" stroke="rgba(70,95,255,0.5)" strokeWidth="1"/>
      <circle cx="250" cy="200" r="100" fill="none" stroke="rgba(70,95,255,0.3)" strokeWidth="1" strokeDasharray="3 5"/>
      <circle cx="250" cy="200" r="160" fill="none" stroke="rgba(70,95,255,0.15)" strokeWidth="1" strokeDasharray="2 6"/>
      {/* feeders */}
      <path d="M250 200 L110 80"  stroke="rgba(70,95,255,0.7)" strokeWidth="1.25" fill="none"/>
      <path d="M250 200 L390 110" stroke="rgba(70,95,255,0.6)" strokeWidth="1.25" fill="none"/>
      <path d="M250 200 L420 320" stroke="rgba(70,95,255,0.5)" strokeWidth="1.25" fill="none"/>
      <path d="M250 200 L 90 320" stroke="rgba(70,95,255,0.5)" strokeWidth="1.25" fill="none"/>
    </svg>
  );
}

function MapVisual({ tweaks }) {
  const style = tweaks.mapStyle || "grid";
  const Body =
    style === "satellite" ? MapStyleSatellite :
    style === "dots"      ? MapStyleDark      :
                            MapStyleGrid;
  return (
    <div className="map-illu">
      <Body tweaks={tweaks} />
      {/* Substation nodes */}
      <span className="node" style={{ left: "50%", top: "55%" }}></span>
      <span className="node ok" style={{ left: "24%", top: "22%" }}></span>
      <span className="node warn" style={{ left: "78%", top: "30%" }}></span>
      <span className="node ok" style={{ left: "78%", top: "77%" }}></span>
      <span className="node err" style={{ left: "20%", top: "75%" }}></span>
      <span className="node" style={{ left: "46%", top: "92%" }}></span>
      {/* Labels */}
      <span className="label" style={{ left: "calc(50% + 14px)", top: "calc(55% + 4px)" }}>TR-Spořilov · 22 kV</span>
      <span className="label" style={{ left: "calc(24% + 14px)", top: "calc(22% - 22px)" }}>FED-04 Vršovice</span>
      <span className="label" style={{ left: "calc(78% - 110px)", top: "calc(30% - 22px)" }}>TR-098 Cheb-V · ⚠</span>
      <span className="label" style={{ left: "calc(20% + 14px)", top: "calc(75% + 6px)" }}>TR-014 Plzeň-jih · ⚠</span>
    </div>
  );
}

function FacilityVisual({ tweaks }) {
  return (
    <div className="aud-visual--building" aria-hidden="true">
      <svg viewBox="0 0 500 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bldgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(70,95,255,0.18)"/>
            <stop offset="100%" stopColor="rgba(70,95,255,0)"/>
          </linearGradient>
        </defs>
        {/* Skyline */}
        <g fill="#1A2434" stroke="rgba(255,255,255,0.06)">
          <rect x="40"  y="200" width="60"  height="160"/>
          <rect x="110" y="150" width="70"  height="210"/>
          <rect x="190" y="100" width="90"  height="260"/>
          <rect x="290" y="180" width="60"  height="180"/>
          <rect x="360" y="130" width="80"  height="230"/>
        </g>
        {/* Floors / windows for the main tower */}
        <g fill="rgba(70,95,255,0.55)">
          {Array.from({length: 10}).map((_, r) =>
            Array.from({length: 4}).map((__, c) => (
              <rect key={`w-${r}-${c}`}
                x={205 + c*18} y={115 + r*22}
                width="10" height="10" rx="1.5"
                opacity={Math.random() > 0.4 ? 1 : 0.18}
              />
            ))
          )}
        </g>
        {/* Smart meter ping */}
        <g>
          <circle cx="235" cy="125" r="10" fill="none" stroke="var(--brand-500)" strokeWidth="1.5">
            <animate attributeName="r" values="6;18;6" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite"/>
          </circle>
        </g>
        {/* Bus line under */}
        <rect x="0" y="358" width="500" height="2" fill="rgba(255,255,255,0.06)"/>
        <rect x="0" y="358" width="500" height="42" fill="url(#bldgGrad)"/>
      </svg>
      <div className="label" style={{ position: "absolute", left: 24, top: 24 }}>OC Letňany · floor 3 · meter LZN-04812</div>
      <div className="label" style={{ position: "absolute", right: 24, bottom: 24 }}>
        Δ 12,4 kW · 230,1 V · cos φ 0,97
      </div>
    </div>
  );
}

function IndustryVisual({ tweaks }) {
  return (
    <div className="aud-visual--factory" aria-hidden="true">
      <svg viewBox="0 0 500 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {/* Substation diagram */}
        <g stroke="rgba(70,95,255,0.7)" strokeWidth="1.5" fill="none">
          {/* HV busbar */}
          <line x1="40"  y1="80"  x2="460" y2="80"/>
          <line x1="40"  y1="84"  x2="460" y2="84"/>
          {/* breakers */}
          {[120, 220, 320, 420].map(x => (
            <g key={x}>
              <line x1={x} y1="84" x2={x} y2="120"/>
              <rect x={x-6} y="120" width="12" height="12" fill="rgba(70,95,255,0.12)"/>
              <line x1={x} y1="132" x2={x} y2="170"/>
              <circle cx={x} cy="178" r="8" fill="none"/>
              <line x1={x} y1="186" x2={x} y2="230"/>
              {/* transformer */}
              <circle cx={x-8} cy="240" r="10"/>
              <circle cx={x+8} cy="240" r="10"/>
              <line x1={x} y1="250" x2={x} y2="290"/>
            </g>
          ))}
          {/* LV bus */}
          <line x1="40" y1="290" x2="460" y2="290"/>
          {/* feeders */}
          {[80, 160, 240, 320, 400].map(x => (
            <line key={`f-${x}`} x1={x} y1="290" x2={x} y2="360"/>
          ))}
        </g>
        {/* HV label */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(255,255,255,0.55)">
          <text x="44" y="72">22 kV</text>
          <text x="44" y="300">0.4 kV</text>
        </g>
        {/* Status dots on breakers */}
        <g>
          <circle cx="120" cy="178" r="3" fill="var(--success-500)"/>
          <circle cx="220" cy="178" r="3" fill="var(--success-500)"/>
          <circle cx="320" cy="178" r="3" fill="var(--warning-500)"/>
          <circle cx="420" cy="178" r="3" fill="var(--success-500)"/>
        </g>
        {/* Animated load arrow */}
        <g>
          <circle cx="220" cy="240" r="3" fill="var(--brand-400)">
            <animate attributeName="cy" values="120;240;290" dur="2.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="2.6s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
      <div className="label" style={{ position: "absolute", left: 24, top: 24 }}>RS-2 · ŠKO-ENERGO · in service</div>
      <div className="label" style={{ position: "absolute", right: 24, bottom: 24 }}>P 4,82 MW · Pmax 6,30 MW · cos φ 0,93</div>
    </div>
  );
}

function AudienceTabs({ tweaks }) {
  const t = useT();
  const [active, setActive] = React.useState(0);
  const tab = t.audience.tabs[active];

  const visualByIdx = [<MapVisual tweaks={tweaks} key="0" />, <FacilityVisual tweaks={tweaks} key="1" />, <IndustryVisual tweaks={tweaks} key="2" />];

  return (
    <section className="audience" id="audience" data-screen-label="Audience">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t.audience.eyebrow}</div>
          <h2>{t.audience.h2}</h2>
        </div>
        <div className="audience-tabs-wrap">
          <div className="audience-tabs" role="tablist" aria-label={t.audience.eyebrow}>
            {t.audience.tabs.map((tb, i) => (
              <button
                key={tb.id}
                className={i === active ? "on" : ""}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
                aria-controls={`aud-panel-${tb.id}`}
                id={`aud-tab-${tb.id}`}
              >
                <i data-lucide={tb.icon}></i>
                {tb.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="audience-panel"
          role="tabpanel"
          id={`aud-panel-${tab.id}`}
          aria-labelledby={`aud-tab-${tab.id}`}
          key={tab.id}
        >
          <div className="copy">
            <h3>{tab.title}</h3>
            <p>{tab.desc}</p>
            <ul className="bullets">
              {tab.bullets.map((b, i) => (
                <li key={i}>
                  <span className="check"><i data-lucide="check"></i></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a className="btn btn--primary" href="#contact">
              {t === I18N.cs ? "Promluvit s námi" : "Talk to us"} <span aria-hidden>→</span>
            </a>
          </div>
          <div className="visual">
            {visualByIdx[active]}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AudienceTabs });
