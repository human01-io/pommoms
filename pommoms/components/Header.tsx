import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';

const Header = () => {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl text-pink-500 flex items-center">
            <span className="mr-2">🐾</span> PomMoms
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#about" className="text-gray-600 hover:text-pink-500">
            {t('header.about')}
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-pink-500">
            {t('header.features')}
          </Link>
          <Link href="#waitlist" className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
            {t('header.join')}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500" 
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link href="#about" className="text-gray-600 py-2 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              {t('header.about')}
            </Link>
            <Link href="#features" className="text-gray-600 py-2 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              {t('header.features')}
            </Link>
            <Link href="#waitlist" className="text-gray-600 py-2 hover:text-pink-500" onClick={() => setIsMenuOpen(false)}>
              {t('header.join')}
            </Link>
            <div className="py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;