/* StatsBanner — four counters; animate when scrolled into view */
function useCountUp(target, opts = {}) {
  const { duration = 1400, when = true } = opts;
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!when || target == null) return;
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, when]);
  return val;
}

function StatNum({ value, suffix, decimals = 0, when, lang }) {
  const n = useCountUp(value, { when });
  const text = decimals > 0
    ? (lang === "cs" ? n.toFixed(decimals).replace(".", ",") : n.toFixed(decimals))
    : Math.floor(n).toLocaleString(lang === "cs" ? "cs-CZ" : "en-US");
  return <span className="num">{text}<span className="suffix">{suffix}</span></span>;
}

function StatText({ label }) {
  return <span className="num"><span className="suffix">{label}</span></span>;
}

function StatsBanner() {
  const t = useT();
  const { lang } = React.useContext(LangContext);
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stats = [t.stats.s1, t.stats.s2, t.stats.s3, t.stats.s4];
  return (
    <section className="stats" ref={ref} aria-label="Key stats" data-screen-label="Stats">
      <div className="container">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              {s.num != null
                ? <StatNum value={s.num} suffix={s.suffix} decimals={s.decimals || 0} when={visible} lang={lang} />
                : <StatText label={s.text} />}
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StatsBanner });
