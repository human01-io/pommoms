import { useRouter } from 'next/router';
import { pomStyles } from '@/styles/utils';

const LanguageSwitcher = () => {
  const router = useRouter();
  
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`${pomStyles.langSwitcher.buttonBase} ${
          router.locale === 'en' 
            ? pomStyles.langSwitcher.buttonActive 
            : pomStyles.langSwitcher.buttonInactive
        }`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`${pomStyles.langSwitcher.buttonBase} ${
          router.locale === 'es' 
            ? pomStyles.langSwitcher.buttonActive 
            : pomStyles.langSwitcher.buttonInactive
        }`}
        onClick={() => changeLanguage('es')}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;