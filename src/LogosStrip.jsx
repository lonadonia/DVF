import React from 'react';
import { useT } from './i18n';

const PARTNERS = [
  { name: "PRE Distribuce", icon: "zap" },
  { name: "EG.D",           icon: "radio-tower" },
  { name: "Pražské služby", icon: "factory" },
  { name: "Mervis",         icon: "gauge" },
  { name: "GridSync",       icon: "git-branch" },
];

export default function LogosStrip() {
  const t = useT();
  return (
    <section className="logos-strip">
      <div className="container">
        <div className="caption">{t.logos.caption}</div>
        <div className="logos-row">
          {PARTNERS.map(p => (
            <div className="logo-cell" key={p.name}>
              <span className="partner-mark"><i data-lucide={p.icon}></i> {p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
