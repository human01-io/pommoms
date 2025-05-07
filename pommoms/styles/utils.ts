export const pomStyles = {
    // Layout
    container: "max-w-7xl mx-auto px-4 sm:px-6",
    
    // Text styles
    logo: "text-xl font-bold text-transparent bg-clip-text bg-title-gradient",
    heading: {
      h1: "text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-[var(--pom-text)] text-transparent bg-clip-text bg-title-gradient",
      h2: "text-3xl font-bold mb-6 text-[var(--pom-text)]",
      h3: "text-xl font-semibold mb-2 text-transparent bg-clip-text bg-feature-gradient",
    },
    paragraph: {
      default: "text-[var(--pom-text)]",
      light: "text-[var(--pom-accent-light)]",
      secondary: "text-[var(--pom-text-secondary)]",
      muted: "text-[var(--pom-text-muted)] text-sm",
    },
    
    // Navigation
    nav: {
      container: "flex justify-between items-center py-4 px-6 bg-navbar-gradient border-b border-[var(--pom-border)] sticky top-0 z-50",
      link: "text-sm text-[var(--pom-text-secondary)] hover:text-[var(--pom-text)] transition",
      linkContainer: "hidden md:flex gap-6 text-sm text-[var(--pom-text-secondary)]",
    },
    
    // Buttons
    button: {
      primary: "bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] px-6 py-3 rounded-xl border border-[var(--pom-border-dark)] shadow-inner hover:bg-[var(--pom-accent-dark)] transition-all",
      small: "bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] px-4 py-2 rounded-xl border border-[var(--pom-border-dark)] shadow-inner hover:bg-[var(--pom-accent-dark)] transition-all",
    },
    
    // Language Switcher
    langSwitcher: {
      buttonBase: "px-2 py-1 rounded",
      buttonActive: "bg-[var(--pom-bg-tertiary)] text-[var(--pom-accent)]",
      buttonInactive: "text-[var(--pom-text-secondary)] hover:text-[var(--pom-text)]",
    },
    
    // Sections
    section: {
      default: "py-20 px-6 bg-[var(--pom-bg)]",
      hero: "flex flex-col items-center justify-center text-center py-28 px-6 bg-hero-gradient",
    },
    
    // Cards
    card: "bg-[var(--pom-bg-secondary)] p-6 rounded-2xl shadow-card border border-[var(--pom-border)]",
    
    // Footer
    footer: "bg-[var(--pom-bg)] border-t border-[var(--pom-border)] mt-12 py-6 px-6 text-center text-[var(--pom-text-muted)] text-sm",
  };