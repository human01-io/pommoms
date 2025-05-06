export const pomStyles = {
    // Layout
    container: "max-w-7xl mx-auto px-4 sm:px-6",
    
    // Text styles
    logo: "text-xl font-bold text-transparent bg-clip-text bg-title-gradient",
    heading: {
      h1: "text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-pom-text",
      h2: "text-3xl font-bold mb-6 text-pom-text",
      h3: "text-xl font-semibold mb-2 text-transparent bg-clip-text bg-feature-gradient",
    },
    paragraph: {
      default: "text-pom-text",
      light: "text-pom-accent-light",
      secondary: "text-pom-text-secondary",
      muted: "text-pom-text-muted text-sm",
    },
    
    // Navigation
    nav: {
      container: "flex justify-between items-center py-4 px-6 bg-navbar-gradient border-b border-pom-border sticky top-0 z-50",
      link: "text-sm text-pom-text-secondary hover:text-pom-text transition",
      linkContainer: "hidden md:flex gap-6 text-sm text-pom-text-secondary",
    },
    
    // Buttons
    button: {
      primary: "bg-pom-bg-tertiary text-pom-text px-6 py-3 rounded-xl border border-pom-border-dark shadow-inner hover:bg-pom-accent-dark transition-all",
      small: "bg-pom-bg-tertiary text-pom-text px-4 py-2 rounded-xl border border-pom-border-dark shadow-inner hover:bg-pom-accent-dark transition-all",
    },
    
    // Language Switcher
    langSwitcher: {
      buttonBase: "px-2 py-1 rounded",
      buttonActive: "bg-pom-bg-tertiary text-pom-accent",
      buttonInactive: "text-pom-text-secondary hover:text-pom-text",
    },
    
    // Sections
    section: {
      default: "py-20 px-6 bg-pom-bg",
      hero: "flex flex-col items-center justify-center text-center py-28 px-6 bg-hero-gradient",
    },
    
    // Cards
    card: "bg-pom-bg-secondary p-6 rounded-2xl shadow-card border border-pom-border",
    
    // Footer
    footer: "bg-pom-bg border-t border-pom-border mt-12 py-6 px-6 text-center text-pom-text-muted text-sm",
  };