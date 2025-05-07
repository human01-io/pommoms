import { useTranslation } from 'next-i18next';
import { pomStyles } from '@/styles/utils';

const Footer = () => {
  const { t } = useTranslation('common');
  
  return (
    <footer className="bg-[var(--pom-bg)] border-t border-[var(--pom-border)] py-6 px-6 text-center text-[var(--pom-text-muted)] text-sm mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <span className="text-2xl mr-2">🐾</span>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-title-gradient">PomMoms</span>
          </div>
          <p className="mt-2 text-[var(--pom-text-muted)] text-center md:text-left">
            {t('footer.rights')}
          </p>
        </div>
        
        <div className="text-center md:text-right">
          <p className="font-medium text-[var(--pom-text-secondary)]">{t('footer.contact')}</p>
          <p className="mt-1">
            <a href="mailto:hello@pommoms.xyz" className="text-[var(--pom-accent)] hover:text-[var(--pom-accent-light)]">
              {t('footer.email')}
            </a>
          </p>
          <p className="mt-1">
            <a href="https://instagram.com/pom.moms" target="_blank" rel="noopener noreferrer" className="text-[var(--pom-accent)] hover:text-[var(--pom-accent-light)]">
              {t('footer.instagram')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;