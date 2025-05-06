import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`px-2 py-1 rounded ${router.locale === 'en' ? 'bg-pink-100 text-pink-700' : 'text-gray-500 hover:text-pink-700'}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 rounded ${router.locale === 'es' ? 'bg-pink-100 text-pink-700' : 'text-gray-500 hover:text-pink-700'}`}
        onClick={() => changeLanguage('es')}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;