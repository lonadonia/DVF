import React from 'react';
import { useT } from './i18n';

const FEATURE_ICONS = ["activity","map","radio-tower","gauge","clipboard-check","users"];

export default function FeatureGrid() {
  const t = useT();
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">{t.features.eyebrow}</div>
          <h2>{t.features.h2}</h2>
          <p>{t.features.sub}</p>
        </div>
        <div className="features-grid">
          {t.features.items.map((f, i) => (
            <article className="feature" key={f.title}>
              <span className="feature-ic"><i data-lucide={FEATURE_ICONS[i]}></i></span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
