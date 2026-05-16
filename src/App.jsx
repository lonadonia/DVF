import React from 'react';
import { LangContext } from './i18n';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio } from './TweaksPanel';
import Navbar from './Navbar';
import Hero from './Hero';
import LogosStrip from './LogosStrip';
import FeatureGrid from './FeatureGrid';
import StatsBanner from './StatsBanner';
import AudienceTabs from './AudienceTabs';
import Integrations from './Integrations';
import Contact from './Contact';
import Footer from './Footer';

const TWEAK_DEFAULTS = { lang: 'cs', surface: 'light', density: 'comfortable', status: 'default', mapStyle: 'grid' };

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', color: '#c00', background: '#fff0f0', minHeight: '100vh' }}>
          <h2>Render error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{String(this.state.error)}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 12, color: '#666' }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const setLang     = React.useCallback(v => setTweak('lang', v),    [setTweak]);
  const setSurface  = React.useCallback(v => setTweak('surface', v), [setTweak]);
  const langValue   = React.useMemo(() => ({
    lang: tweaks.lang, setLang,
    surface: tweaks.surface, setSurface,
  }), [tweaks.lang, setLang, tweaks.surface, setSurface]);

  return (
    <ErrorBoundary>
    <LangContext.Provider value={langValue}>
      <div className="page" data-surface={tweaks.surface} data-density={tweaks.density} data-status={tweaks.status} lang={tweaks.lang}>
        <Navbar />
        <Hero />
        <LogosStrip />
        <FeatureGrid />
        <StatsBanner />
        <AudienceTabs tweaks={tweaks} />
        <Integrations />
        <Contact tweaks={tweaks} />
        <Footer />
        <TweaksPanel title="Tweaks">
          <TweakSection label={tweaks.lang === 'cs' ? 'Jazyk' : 'Language'} />
          <TweakRadio label={tweaks.lang === 'cs' ? 'Jazyk obsahu' : 'Content language'} value={tweaks.lang} options={[{ value: 'cs', label: 'Čeština' }, { value: 'en', label: 'English' }]} onChange={v => setTweak('lang', v)} />
          <TweakSection label={tweaks.lang === 'cs' ? 'Vzhled' : 'Appearance'} />
          <TweakRadio label={tweaks.lang === 'cs' ? 'Plocha sekcí' : 'Section surface'} value={tweaks.surface} options={[{ value: 'light', label: tweaks.lang === 'cs' ? 'Světlá' : 'Light' }, { value: 'muted', label: tweaks.lang === 'cs' ? 'Tlumená' : 'Muted' }, { value: 'dark', label: tweaks.lang === 'cs' ? 'Tmavá' : 'Dark' }]} onChange={v => setTweak('surface', v)} />
          <TweakSection label={tweaks.lang === 'cs' ? 'Hustota' : 'Density'} />
          <TweakRadio label={tweaks.lang === 'cs' ? 'Hustota informací' : 'Information density'} value={tweaks.density} options={[{ value: 'comfortable', label: tweaks.lang === 'cs' ? 'Vzdušná' : 'Comfortable' }, { value: 'compact', label: tweaks.lang === 'cs' ? 'Sevřená' : 'Compact' }, { value: 'dense', label: tweaks.lang === 'cs' ? 'Hustá' : 'Dense' }]} onChange={v => setTweak('density', v)} />
          <TweakSection label={tweaks.lang === 'cs' ? 'Mapa' : 'Map'} />
          <TweakRadio label={tweaks.lang === 'cs' ? 'Styl mapy' : 'Map style'} value={tweaks.mapStyle} options={[{ value: 'grid', label: tweaks.lang === 'cs' ? 'Mřížka' : 'Grid' }, { value: 'satellite', label: tweaks.lang === 'cs' ? 'Satelit' : 'Satellite' }, { value: 'dots', label: tweaks.lang === 'cs' ? 'Body' : 'Dots' }]} onChange={v => setTweak('mapStyle', v)} />
        </TweaksPanel>
      </div>
    </LangContext.Provider>
    </ErrorBoundary>
  );
}
