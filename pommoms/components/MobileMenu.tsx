import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import Button from './ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Handle language change
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    onClose();
  };

  return (
    <div className={`mobile-menu ${isOpen ? 'mobile-menu-visible' : 'mobile-menu-hidden'}`}>
      <button 
        className="mobile-menu-close" 
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="mobile-menu-links">
        <Link 
          href="#about" 
          className="mobile-menu-link"
          onClick={onClose}
        >
          {t('header.about')}
        </Link>
        <Link 
          href="#features" 
          className="mobile-menu-link"
          onClick={onClose}
        >
          {t('header.features')}
        </Link>
        <Link 
          href="#waitlist" 
          className="mobile-menu-link"
          onClick={onClose}
        >
          {t('header.join')}
        </Link>
      </div>
      
      <div className="mobile-menu-language">
        <div className="mobile-menu-language-title">
          {t('language.select')}
        </div>
        <div className="mobile-menu-language-options">
          <button 
            className={`mobile-menu-language-option ${router.locale === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
          <button 
            className={`mobile-menu-language-option ${router.locale === 'es' ? 'active' : ''}`}
            onClick={() => changeLanguage('es')}
          >
            ES
          </button>
        </div>
      </div>
      
      <div className="mobile-menu-cta">
        <Link href="#waitlist">
          <Button onClick={onClose}>{t('header.join')}</Button>
        </Link>
      </div>
      
      <div className="mobile-menu-footer">
        © 2025 PomMoms
      </div>
    </div>
  );
};

export default MobileMenu;