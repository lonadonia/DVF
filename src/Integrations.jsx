import React from 'react';
import { useT, I18N } from './i18n';

export default function Integrations() {
  const t = useT();
  const isCS = t === I18N.cs;
  return (
    <section className="integrations" id="integrations">
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
              <span className="status">{isCS ? "Aktivní" : "Active"}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
