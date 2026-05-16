import React from 'react';

export function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues(prev => ({ ...prev, ...edits }));
  }, []);
  return [values, setTweak];
}

export function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clamp = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxR = Math.max(PAD, window.innerWidth  - w - PAD);
    const maxB = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxR, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxB, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right  = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clamp();
    window.addEventListener('resize', clamp);
    return () => window.removeEventListener('resize', clamp);
  }, [open, clamp]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode')   setOpen(true);
      if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!open) return null;

  const panelStyle = {
    position: 'fixed', right: offsetRef.current.x, bottom: offsetRef.current.y,
    zIndex: 2147483646, width: 280, maxHeight: 'calc(100vh - 32px)',
    display: 'flex', flexDirection: 'column',
    background: 'rgba(250,249,247,.92)', color: '#29261b',
    border: '.5px solid rgba(255,255,255,.6)', borderRadius: 14,
    boxShadow: '0 12px 40px rgba(0,0,0,.18)',
    font: '11.5px/1.4 system-ui,sans-serif', overflow: 'hidden',
  };

  return (
    <div ref={dragRef} style={panelStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px 10px 14px', cursor: 'move', userSelect: 'none' }}>
        <b style={{ fontSize: 12, fontWeight: 600 }}>{title}</b>
        <button onClick={() => setOpen(false)} style={{ appearance: 'none', border: 0, background: 'transparent', color: 'rgba(41,38,27,.55)', width: 22, height: 22, borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>✕</button>
      </div>
      <div style={{ padding: '2px 14px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export function TweakSection({ label }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(41,38,27,.45)', paddingTop: 10 }}>
      {label}
    </div>
  );
}

export function TweakRadio({ label, value, options, onChange }) {
  const opts = options.map(o => typeof o === 'object' ? o : { value: o, label: String(o) });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(41,38,27,.72)' }}>{label}</div>
      <div style={{ position: 'relative', display: 'flex', padding: 2, borderRadius: 8, background: 'rgba(0,0,0,.06)', userSelect: 'none' }}>
        <div style={{ position: 'absolute', top: 2, bottom: 2, borderRadius: 6, background: 'rgba(255,255,255,.9)', boxShadow: '0 1px 2px rgba(0,0,0,.12)', transition: 'left .15s, width .15s', left: `calc(2px + ${idx} * (100% - 4px) / ${n})`, width: `calc((100% - 4px) / ${n})` }} />
        {opts.map(o => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}
            onClick={() => onChange(o.value)}
            style={{ appearance: 'none', position: 'relative', zIndex: 1, flex: 1, border: 0, background: 'transparent', color: 'inherit', fontSize: 'inherit', fontWeight: 500, minHeight: 22, borderRadius: 6, cursor: 'pointer', padding: '4px 6px', lineHeight: 1.2 }}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
