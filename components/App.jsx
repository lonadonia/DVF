/* App — root component. Owns language state + tweaks; composes the site. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "cs",
  "surface": "light",
  "density": "comfortable",
  "status": "default",
  "mapStyle": "grid"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const setLang = React.useCallback((v) => setTweak("lang", v), [setTweak]);

  // Refresh Lucide icons when key visual state changes
  React.useEffect(() => {
    requestAnimationFrame(() => window.lucide && window.lucide.createIcons());
  }, [tweaks.lang, tweaks.surface, tweaks.density, tweaks.status, tweaks.mapStyle]);

  const langValue = React.useMemo(() => ({ lang: tweaks.lang, setLang }), [tweaks.lang, setLang]);

  return (
    <LangContext.Provider value={langValue}>
      <div
        className="page"
        data-screen-label="LDS Admin Landing"
        data-surface={tweaks.surface}
        data-density={tweaks.density}
        data-status={tweaks.status}
        lang={tweaks.lang}
      >
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
          <TweakSection label={tweaks.lang === "cs" ? "Jazyk" : "Language"} />
          <TweakRadio
            label={tweaks.lang === "cs" ? "Jazyk obsahu" : "Content language"}
            value={tweaks.lang}
            options={[
              { value: "cs", label: "Čeština" },
              { value: "en", label: "English" },
            ]}
            onChange={(v) => setTweak("lang", v)}
          />

          <TweakSection label={tweaks.lang === "cs" ? "Vzhled" : "Appearance"} />
          <TweakRadio
            label={tweaks.lang === "cs" ? "Plocha sekcí" : "Section surface"}
            value={tweaks.surface}
            options={[
              { value: "light", label: tweaks.lang === "cs" ? "Světlá" : "Light" },
              { value: "muted", label: tweaks.lang === "cs" ? "Tlumená" : "Muted" },
              { value: "dark",  label: tweaks.lang === "cs" ? "Tmavá"   : "Dark" },
            ]}
            onChange={(v) => setTweak("surface", v)}
          />
          <TweakRadio
            label={tweaks.lang === "cs" ? "Hustota informací" : "Information density"}
            value={tweaks.density}
            options={[
              { value: "comfortable", label: tweaks.lang === "cs" ? "Vzdušná" : "Comfortable" },
              { value: "compact",     label: tweaks.lang === "cs" ? "Sevřená" : "Compact" },
              { value: "dense",       label: tweaks.lang === "cs" ? "Hustá"   : "Dense" },
            ]}
            onChange={(v) => setTweak("density", v)}
          />

          <TweakSection label={tweaks.lang === "cs" ? "Status & mapa" : "Status & map"} />
          <TweakRadio
            label={tweaks.lang === "cs" ? "Stavové barvy" : "Status colors"}
            value={tweaks.status}
            options={[
              { value: "default", label: tweaks.lang === "cs" ? "Standardní" : "Standard" },
              { value: "cbsafe",  label: tweaks.lang === "cs" ? "Pro daltonisty" : "Colorblind" },
              { value: "mono",    label: tweaks.lang === "cs" ? "Mono"       : "Mono" },
            ]}
            onChange={(v) => setTweak("status", v)}
          />
          <TweakRadio
            label={tweaks.lang === "cs" ? "Styl mapy" : "Map style"}
            value={tweaks.mapStyle}
            options={[
              { value: "grid",      label: tweaks.lang === "cs" ? "Mřížka"  : "Grid" },
              { value: "satellite", label: tweaks.lang === "cs" ? "Satelit" : "Satellite" },
              { value: "dots",      label: tweaks.lang === "cs" ? "Body"    : "Dots" },
            ]}
            onChange={(v) => setTweak("mapStyle", v)}
          />
        </TweaksPanel>
      </div>
    </LangContext.Provider>
  );
}

Object.assign(window, { App, TWEAK_DEFAULTS });
