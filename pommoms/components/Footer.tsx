import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-2xl mr-2">🐾</span>
              <span className="font-bold text-xl">PomMoms</span>
            </div>
            <p className="mt-2 text-gray-400 text-center md:text-left">
              {t('footer.rights')}
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="font-medium">{t('footer.contact')}</p>
            <p className="mt-1">
              <a href="mailto:hello@pommoms.xyz" className="text-pink-300 hover:text-pink-200">
                {t('footer.email')}
              </a>
            </p>
            <p className="mt-1">
              <a href="https://instagram.com/pom.moms" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200">
                {t('footer.instagram')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;