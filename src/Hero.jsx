import React from 'react';
import { useT } from './i18n';
import DashboardMock from './DashboardMock';

function HeroMapBg() {
  return (
    <div className="hero-map-bg" aria-hidden="true">
      <svg viewBox="0 0 1400 680" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <radialGradient id="mapEdgeFade" cx="35%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
            <stop offset="55%" stopColor="#fff" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0.88"/>
          </radialGradient>
          <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="lineGlow" x="-10%" y="-200%" width="120%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal streets */}
        <rect x="0" y="88" width="1400" height="16" fill="rgba(0,0,0,0.055)"/>
        <rect x="0" y="204" width="1400" height="16" fill="rgba(0,0,0,0.055)"/>
        <rect x="0" y="330" width="1400" height="16" fill="rgba(0,0,0,0.05)"/>
        <rect x="0" y="446" width="1400" height="16" fill="rgba(0,0,0,0.055)"/>
        <rect x="0" y="570" width="1400" height="16" fill="rgba(0,0,0,0.055)"/>

        {/* Vertical streets */}
        <rect x="88" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="246" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="394" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="534" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="654" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="774" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="914" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="1054" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="1194" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>
        <rect x="1334" y="0" width="14" height="680" fill="rgba(0,0,0,0.055)"/>

        {/* Block fill variation */}
        <rect x="102" y="0" width="144" height="88" fill="rgba(0,0,0,0.025)"/>
        <rect x="260" y="104" width="134" height="100" fill="rgba(70,95,255,0.03)"/>
        <rect x="408" y="220" width="126" height="110" fill="rgba(0,0,0,0.025)"/>
        <rect x="548" y="0" width="106" height="88" fill="rgba(70,95,255,0.03)"/>
        <rect x="668" y="346" width="106" height="100" fill="rgba(0,0,0,0.025)"/>
        <rect x="788" y="104" width="126" height="100" fill="rgba(70,95,255,0.03)"/>
        <rect x="928" y="220" width="126" height="110" fill="rgba(0,0,0,0.025)"/>
        <rect x="1068" y="462" width="126" height="108" fill="rgba(70,95,255,0.03)"/>
        <rect x="1208" y="346" width="126" height="100" fill="rgba(0,0,0,0.025)"/>
        <rect x="102" y="462" width="144" height="108" fill="rgba(70,95,255,0.03)"/>
        <rect x="548" y="462" width="106" height="108" fill="rgba(0,0,0,0.025)"/>

        {/* Minor cross-streets */}
        <rect x="170" y="0" width="8" height="88" fill="rgba(0,0,0,0.03)"/>
        <rect x="170" y="104" width="8" height="100" fill="rgba(0,0,0,0.03)"/>
        <rect x="460" y="220" width="8" height="110" fill="rgba(0,0,0,0.03)"/>
        <rect x="840" y="104" width="8" height="100" fill="rgba(0,0,0,0.03)"/>
        <rect x="980" y="346" width="8" height="100" fill="rgba(0,0,0,0.03)"/>
        <rect x="0" y="150" width="88" height="8" fill="rgba(0,0,0,0.03)"/>
        <rect x="260" y="150" width="134" height="8" fill="rgba(0,0,0,0.03)"/>
        <rect x="668" y="390" width="106" height="8" fill="rgba(0,0,0,0.03)"/>

        {/* Main distribution trunk line */}
        <path
          d="M 95,338 L 246,220 L 394,220 L 534,220 L 654,338 L 774,338 L 914,454 L 1054,338 L 1194,338 L 1334,220"
          stroke="#465FFF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          filter="url(#lineGlow)" opacity="0.75"/>

        {/* Branch distribution lines */}
        <line x1="246" y1="104" x2="246" y2="220" stroke="#465FFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
        <line x1="394" y1="220" x2="394" y2="346" stroke="#465FFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
        <line x1="534" y1="104" x2="534" y2="220" stroke="#465FFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
        <line x1="534" y1="220" x2="534" y2="346" stroke="#465FFF" strokeWidth="1.5" opacity="0.45" strokeLinecap="round"/>
        <line x1="654" y1="346" x2="654" y2="462" stroke="#465FFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
        <line x1="774" y1="220" x2="774" y2="338" stroke="#465FFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
        <line x1="914" y1="454" x2="914" y2="570" stroke="#465FFF" strokeWidth="1.5" opacity="0.45" strokeLinecap="round"/>
        <line x1="1054" y1="220" x2="1054" y2="338" stroke="#465FFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
        <line x1="1194" y1="220" x2="1194" y2="338" stroke="#465FFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>

        {/* Trunk junction nodes */}
        <circle cx="246" cy="220" r="5.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="394" cy="220" r="5.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="534" cy="220" r="5.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="654" cy="338" r="5.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="774" cy="338" r="5.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="914" cy="454" r="5.5" fill="#F59E0B" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="1054" cy="338" r="5.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="1194" cy="338" r="5.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.85"/>

        {/* Branch endpoint transformer nodes */}
        <circle cx="246" cy="104" r="4.5" fill="#10B981" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="394" cy="346" r="4.5" fill="#10B981" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="534" cy="104" r="4.5" fill="#EF4444" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="534" cy="346" r="4.5" fill="#10B981" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="654" cy="462" r="4.5" fill="#10B981" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="774" cy="220" r="4.5" fill="#F59E0B" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="914" cy="570" r="4.5" fill="#10B981" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="1054" cy="220" r="4.5" fill="#10B981" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="1194" cy="220" r="4.5" fill="#10B981" filter="url(#nodeGlow)" opacity="0.85"/>
        <circle cx="95" cy="338" r="4.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.8"/>
        <circle cx="1334" cy="220" r="4.5" fill="#465FFF" filter="url(#nodeGlow)" opacity="0.8"/>

        {/* Selected zone highlight */}
        <rect x="408" y="236" width="126" height="110" fill="rgba(70,95,255,0.05)" stroke="#465FFF" strokeWidth="1.5" opacity="0.5" rx="2"/>

        {/* Edge fade to white */}
        <rect width="1400" height="680" fill="url(#mapEdgeFade)"/>
      </svg>
    </div>
  );
}

export default function Hero() {
  const t = useT();
  return (
    <section className="hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <HeroMapBg />
      <div className="hero-copy-scrim" aria-hidden="true"></div>
      <span className="hero-trace t1" aria-hidden="true"></span>
      <span className="hero-trace t2" aria-hidden="true"></span>
      <span className="hero-trace t3" aria-hidden="true"></span>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true"></span>
              {t.hero.eyebrow}
            </p>
            <h1>{t.hero.h1a} <span className="accent">{t.hero.h1b}</span></h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-cta">
              <a className="btn btn--primary btn--lg" href="https://main.ldsadmin.cz">
                {t.hero.cta1}
                <i data-lucide="arrow-right" aria-hidden="true"></i>
              </a>
              <a className="btn btn--ghost-dark btn--lg hero-demo-btn" href="#contact">
                <span className="hero-demo-play" aria-hidden="true">
                  <i data-lucide="play" aria-hidden="true"></i>
                </span>
                {t.hero.cta2}
              </a>
            </div>
            <div className="hero-trust">
              <span className="hero-trust-chip">
                <span className="dot" aria-hidden="true"></span>
                {t.hero.trust1}
              </span>
              <span className="hero-trust-chip">
                <i data-lucide="shield-check" aria-hidden="true"></i>
                <b>{t.hero.trust2a}</b>&nbsp;{t.hero.trust2b}
              </span>
              <span className="hero-trust-chip">
                <i data-lucide="activity" aria-hidden="true"></i>
                <b>{t.hero.trust3a}</b>&nbsp;{t.hero.trust3b}
              </span>
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
