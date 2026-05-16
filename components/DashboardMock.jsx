/* DashboardMock — stylized dark dashboard inside the hero */
function DashboardMock() {
  const t = useT();
  const stats = t === I18N.cs
    ? [
        { k: "Aktivní zátěž", v: "182,4", u: "MW", d: "▲ 3.1%", bad: false },
        { k: "Trafostanice online", v: "214", u: "/ 216", d: "▲ 2 offline", bad: true },
        { k: "Otevřené tickety", v: "7", u: "", d: "▼ 12%", bad: false },
      ]
    : [
        { k: "Active load", v: "182.4", u: "MW", d: "▲ 3.1%", bad: false },
        { k: "Substations online", v: "214", u: "/ 216", d: "▲ 2 offline", bad: true },
        { k: "Open tickets", v: "7", u: "", d: "▼ 12%", bad: false },
      ];

  const alarms = t === I18N.cs
    ? [
        { dot: "err",  name: "TR-014 Plzeň-jih",   meta: "U < 207V" },
        { dot: "warn", name: "FED-22 Linka 4",     meta: "I 1.18×" },
        { dot: "warn", name: "TR-098 Cheb-V",      meta: "temp 78°" },
        { dot: "ok",   name: "TR-101 Sokolov",     meta: "OK" },
        { dot: "ok",   name: "FED-08 Linka 2",     meta: "OK" },
      ]
    : [
        { dot: "err",  name: "TR-014 Plzeň-South", meta: "U < 207V" },
        { dot: "warn", name: "FED-22 Line 4",      meta: "I 1.18×" },
        { dot: "warn", name: "TR-098 Cheb-V",      meta: "temp 78°" },
        { dot: "ok",   name: "TR-101 Sokolov",     meta: "OK" },
        { dot: "ok",   name: "FED-08 Line 2",      meta: "OK" },
      ];

  return (
    <div className="dm" aria-hidden="true">
      <div className="dm-bar">
        <span className="d r"></span><span className="d y"></span><span className="d g"></span>
        <span className="crumb">app.lds-admin.cz / dispatch / overview</span>
      </div>
      <div className="dm-body">
        <aside className="dm-side">
          <div className="sicon active"><i data-lucide="activity"></i></div>
          <div className="sicon"><i data-lucide="map"></i></div>
          <div className="sicon"><i data-lucide="radio-tower"></i></div>
          <div className="sicon"><i data-lucide="gauge"></i></div>
          <div className="sicon"><i data-lucide="clipboard-check"></i></div>
          <div className="sicon"><i data-lucide="users"></i></div>
        </aside>
        <div className="dm-main">
          <div className="dm-h">
            <span className="t">{t === I18N.cs ? "Síťový přehled" : "Network overview"}</span>
            <span className="tag">{t === I18N.cs ? "Online" : "Online"}</span>
            <span className="right">14:22 · live</span>
          </div>

          <div className="dm-stats">
            {stats.map(s => (
              <div className="dm-stat" key={s.k}>
                <div className="k">{s.k}</div>
                <div className="v">{s.v}{s.u && <span className="u">{s.u}</span>}</div>
                <div className={"d" + (s.bad ? " bad" : "")}>{s.d}</div>
              </div>
            ))}
          </div>

          <div className="dm-cards">
            <div className="dm-card">
              <div className="cap">
                <span className="l">{t === I18N.cs ? "Zátěž · 24 h" : "Load · 24 h"}</span>
                <span className="r">MW</span>
              </div>
              <div className="dm-chart">
                <svg viewBox="0 0 320 110" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"  stopColor="#465FFF" stopOpacity="0.35"/>
                      <stop offset="100%" stopColor="#465FFF" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {[0,1,2,3].map(i => (
                    <line key={i} x1="0" x2="320" y1={20 + i*25} y2={20 + i*25} stroke="rgba(255,255,255,0.05)"/>
                  ))}
                  <path d="M0,82 L20,74 L40,68 L60,72 L80,58 L100,52 L120,48 L140,40 L160,44 L180,36 L200,30 L220,40 L240,52 L260,46 L280,38 L300,28 L320,22 L320,110 L0,110 Z"
                        fill="url(#gFill)"/>
                  <path d="M0,82 L20,74 L40,68 L60,72 L80,58 L100,52 L120,48 L140,40 L160,44 L180,36 L200,30 L220,40 L240,52 L260,46 L280,38 L300,28 L320,22"
                        fill="none" stroke="#6B80FF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0,90 L40,88 L80,80 L120,76 L160,70 L200,66 L240,68 L280,60 L320,56"
                        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.25" strokeDasharray="3 3"/>
                </svg>
              </div>
            </div>
            <div className="dm-card">
              <div className="cap">
                <span className="l">{t === I18N.cs ? "Alarmy" : "Alarms"}</span>
                <span className="r">Live</span>
              </div>
              <div className="dm-list">
                {alarms.map((a, i) => (
                  <div className="dm-li" key={i}>
                    <span className={"dot " + a.dot}></span>
                    <span className="name">{a.name}</span>
                    <span className="meta">{a.meta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardMock });
