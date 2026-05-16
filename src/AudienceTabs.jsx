import React from 'react';
import { useT, LangContext, I18N } from './i18n';

function MapVisual({ tweaks }) {
  const style = tweaks?.mapStyle || 'grid';
  return (
    <div className="map-illu">
      {style === 'satellite' ? (
        <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <radialGradient id="satBg" cx="40%" cy="40%" r="80%">
              <stop offset="0%"   stopColor="#1F3A56"/>
              <stop offset="50%"  stopColor="#0F1E2E"/>
              <stop offset="100%" stopColor="#070C13"/>
            </radialGradient>
          </defs>
          <rect width="500" height="400" fill="url(#satBg)"/>
          <path d="M-20 280 C 80 220, 160 320, 240 240 S 380 200, 520 260" stroke="rgba(80,140,200,0.45)" strokeWidth="14" fill="none" strokeLinecap="round"/>
          <path d="M40 60 L 250 220 L 460 80" stroke="rgba(255,200,120,0.18)" strokeWidth="2" fill="none"/>
        </svg>
      ) : style === 'dots' ? (
        <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect width="500" height="400" fill="#06070C"/>
          <circle cx="250" cy="200" r="48"  fill="none" stroke="rgba(70,95,255,0.5)"  strokeWidth="1"/>
          <circle cx="250" cy="200" r="100" fill="none" stroke="rgba(70,95,255,0.3)"  strokeWidth="1" strokeDasharray="3 5"/>
          <circle cx="250" cy="200" r="160" fill="none" stroke="rgba(70,95,255,0.15)" strokeWidth="1" strokeDasharray="2 6"/>
          <path d="M250 200 L110 80"  stroke="rgba(70,95,255,0.7)" strokeWidth="1.25" fill="none"/>
          <path d="M250 200 L390 110" stroke="rgba(70,95,255,0.6)" strokeWidth="1.25" fill="none"/>
          <path d="M250 200 L420 320" stroke="rgba(70,95,255,0.5)" strokeWidth="1.25" fill="none"/>
          <path d="M250 200 L 90 320" stroke="rgba(70,95,255,0.5)" strokeWidth="1.25" fill="none"/>
        </svg>
      ) : (
        <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <pattern id="gridMap" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0 L0 0 0 32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            </pattern>
            <radialGradient id="gridGlow" cx="50%" cy="40%" r="55%">
              <stop offset="0%"   stopColor="rgba(70,95,255,0.18)"/>
              <stop offset="100%" stopColor="rgba(70,95,255,0)"/>
            </radialGradient>
          </defs>
          <rect width="500" height="400" fill="#0A0F19"/>
          <rect width="500" height="400" fill="url(#gridGlow)"/>
          <rect width="500" height="400" fill="url(#gridMap)"/>
          <circle cx="250" cy="220" r="40"  fill="none" stroke="rgba(70,95,255,0.45)" strokeWidth="1.25"/>
          <circle cx="250" cy="220" r="100" fill="none" stroke="rgba(70,95,255,0.25)" strokeWidth="1"/>
          <circle cx="250" cy="220" r="170" fill="none" stroke="rgba(70,95,255,0.12)" strokeWidth="1"/>
          <path d="M250,220 L120,90"  stroke="rgba(70,95,255,0.6)" strokeWidth="1.5" fill="none"/>
          <path d="M250,220 L380,120" stroke="rgba(70,95,255,0.6)" strokeWidth="1.5" fill="none"/>
          <path d="M250,220 L100,300" stroke="rgba(70,95,255,0.4)" strokeWidth="1.25" fill="none"/>
          <path d="M250,220 L400,310" stroke="rgba(70,95,255,0.5)" strokeWidth="1.5"  fill="none"/>
        </svg>
      )}
      <span className="node"      style={{ left: "50%",  top: "55%" }}></span>
      <span className="node ok"   style={{ left: "24%",  top: "22%" }}></span>
      <span className="node warn"  style={{ left: "78%",  top: "30%" }}></span>
      <span className="node ok"   style={{ left: "78%",  top: "77%" }}></span>
      <span className="node err"  style={{ left: "20%",  top: "75%" }}></span>
      <span className="label"     style={{ left: "calc(50% + 14px)", top: "calc(55% + 4px)" }}>TR-Spořilov · 22 kV</span>
      <span className="label"     style={{ left: "calc(24% + 14px)", top: "calc(22% - 22px)" }}>FED-04 Vršovice</span>
      <span className="label"     style={{ left: "calc(78% - 110px)",top: "calc(30% - 22px)" }}>TR-098 Cheb-V · ⚠</span>
      <span className="label"     style={{ left: "calc(20% + 14px)", top: "calc(75% + 6px)"  }}>TR-014 Plzeň-jih · ⚠</span>
    </div>
  );
}

function FacilityVisual() {
  return (
    <div className="aud-visual--building">
      <svg viewBox="0 0 500 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <g fill="#1A2434" stroke="rgba(255,255,255,0.06)">
          <rect x="40"  y="200" width="60"  height="160"/>
          <rect x="110" y="150" width="70"  height="210"/>
          <rect x="190" y="100" width="90"  height="260"/>
          <rect x="290" y="180" width="60"  height="180"/>
          <rect x="360" y="130" width="80"  height="230"/>
        </g>
        <g fill="rgba(70,95,255,0.55)">
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 4 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={205 + c * 18} y={115 + r * 22} width="10" height="10" rx="1.5" opacity={(r * 4 + c) % 3 !== 0 ? 1 : 0.18}/>
            ))
          )}
        </g>
      </svg>
      <div className="label" style={{ position: "absolute", left: 24, top: 24 }}>OC Letňany · floor 3 · meter LZN-04812</div>
      <div className="label" style={{ position: "absolute", right: 24, bottom: 24 }}>Δ 12,4 kW · 230,1 V · cos φ 0,97</div>
    </div>
  );
}

function IndustryVisual() {
  return (
    <div className="aud-visual--factory">
      <svg viewBox="0 0 500 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <g stroke="rgba(70,95,255,0.7)" strokeWidth="1.5" fill="none">
          <line x1="40" y1="80" x2="460" y2="80"/>
          <line x1="40" y1="84" x2="460" y2="84"/>
          {[120, 220, 320, 420].map(x => (
            <g key={x}>
              <line x1={x} y1="84"  x2={x} y2="120"/>
              <rect x={x - 6} y="120" width="12" height="12" fill="rgba(70,95,255,0.12)"/>
              <line x1={x} y1="132" x2={x} y2="170"/>
              <circle cx={x} cy="178" r="8" fill="none"/>
              <line x1={x} y1="186" x2={x} y2="230"/>
              <circle cx={x - 8} cy="240" r="10"/>
              <circle cx={x + 8} cy="240" r="10"/>
              <line x1={x} y1="250" x2={x} y2="290"/>
            </g>
          ))}
          <line x1="40" y1="290" x2="460" y2="290"/>
          {[80, 160, 240, 320, 400].map(x => <line key={x} x1={x} y1="290" x2={x} y2="360"/>)}
        </g>
        <circle cx="120" cy="178" r="3" fill="var(--success-500)"/>
        <circle cx="220" cy="178" r="3" fill="var(--success-500)"/>
        <circle cx="320" cy="178" r="3" fill="var(--warning-500)"/>
        <circle cx="420" cy="178" r="3" fill="var(--success-500)"/>
      </svg>
      <div className="label" style={{ position: "absolute", left: 24, top: 24 }}>RS-2 · ŠKO-ENERGO · in service</div>
      <div className="label" style={{ position: "absolute", right: 24, bottom: 24 }}>P 4,82 MW · Pmax 6,30 MW · cos φ 0,93</div>
    </div>
  );
}

export default function AudienceTabs({ tweaks }) {
  const t = useT();
  const [active, setActive] = React.useState(0);
  const tab = t.audience.tabs[active];
  const isCS = t === I18N.cs;
  return (
    <section className="audience" id="audience">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t.audience.eyebrow}</div>
          <h2>{t.audience.h2}</h2>
        </div>
        <div className="audience-tabs-wrap">
          <div className="audience-tabs" role="tablist">
            {t.audience.tabs.map((tb, i) => (
              <button key={tb.id} className={i === active ? 'on' : ''} role="tab" aria-selected={i === active} onClick={() => setActive(i)}>
                <i data-lucide={tb.icon}></i> {tb.label}
              </button>
            ))}
          </div>
        </div>
        <div className="audience-panel" role="tabpanel">
          <div className="copy">
            <h3>{tab.title}</h3>
            <p>{tab.desc}</p>
            <ul className="bullets">
              {tab.bullets.map((b, i) => (
                <li key={i}><span className="check"><i data-lucide="check"></i></span><span>{b}</span></li>
              ))}
            </ul>
            <a className="btn btn--primary" href="#contact">{isCS ? "Promluvit s námi" : "Talk to us"} <span aria-hidden="true">→</span></a>
          </div>
          <div className="visual">
            {active === 0 ? <MapVisual tweaks={tweaks} /> : active === 1 ? <FacilityVisual /> : <IndustryVisual />}
          </div>
        </div>
      </div>
    </section>
  );
}
