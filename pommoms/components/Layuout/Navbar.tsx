import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { pomStyles } from '../../styles/utils';
import { Logo } from '../ui/Typography';
import Button from '../ui/Button';
import LanguageSwitcher from '../LanguageSwitcher';
import { useState } from 'react';

const Navbar = () => {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={pomStyles.nav.container}>
      <Logo>PomMoms</Logo>
      
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
      
      <Button size="small">{t('header.join')}</Button>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-pom-text-secondary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-pom-bg-secondary border-b border-pom-border z-40">
          <div className="p-4 flex flex-col space-y-4">
            <Link href="#about" className={pomStyles.nav.link} onClick={() => setIsMenuOpen(false)}>
              {t('header.about')}
            </Link>
            <Link href="#features" className={pomStyles.nav.link} onClick={() => setIsMenuOpen(false)}>
              {t('header.features')}
            </Link>
            <Link href="#waitlist" className={pomStyles.nav.link} onClick={() => setIsMenuOpen(false)}>
              {t('header.join')}
            </Link>
            <div className="py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;