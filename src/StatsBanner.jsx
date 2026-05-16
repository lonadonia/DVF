import React from 'react';
import { useT, LangContext } from './i18n';

function useCountUp(target, duration, when) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!when || target == null) return;
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / (duration || 1400));
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, when]);
  return val;
}

function StatCell({ s, visible, lang }) {
  const n = useCountUp(s.num, 1400, visible);
  const text = s.num == null ? null
    : s.decimals > 0
      ? (lang === 'cs' ? n.toFixed(s.decimals).replace('.', ',') : n.toFixed(s.decimals))
      : Math.floor(n).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US');
  return (
    <div className="stat">
      <span className="num">
        {s.num != null ? text : s.text}
        <span className="suffix">{s.num != null ? s.suffix : ''}</span>
      </span>
      <div className="lbl">{s.label}</div>
    </div>
  );
}

export default function StatsBanner() {
  const t = useT();
  const { lang } = React.useContext(LangContext);
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stats = [t.stats.s1, t.stats.s2, t.stats.s3, t.stats.s4];
  return (
    <section className="stats" ref={ref}>
      <div className="container">
        <div className="stats-inner">
          {stats.map((s, i) => <StatCell key={i} s={s} visible={visible} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}
