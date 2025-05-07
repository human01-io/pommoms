import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { pomStyles } from '@/styles/utils';
import { Logo } from './ui/Typography';
import Button from './ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { t } = useTranslation('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--pom-bg)] bg-opacity-95 backdrop-blur-sm shadow-md py-2' 
          : 'py-4'
      }`}>
        <div className={pomStyles.container}>
          <div className="flex justify-between items-center">
            <Logo>PomMoms</Logo>
            
            {/* Desktop links */}
            <div className={pomStyles.nav.linkContainer}>
              <Link href="#about" className={pomStyles.nav.link}>
                {t('header.about')}
              </Link>
              <Link href="#features" className={pomStyles.nav.link}>
                {t('header.features')}
              </Link>
              <Link href="#waitlist" className={pomStyles.nav.link}>
                {t('header.join')}
              </Link>
              <LanguageSwitcher />
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link href="#waitlist">
                <Button size="small">{t('header.join')}</Button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[var(--pom-bg-secondary)] text-[var(--pom-text-secondary)]"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Navbar;