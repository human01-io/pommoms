import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Helper function for loading translations
export const getI18nProps = async (locale: string, ns = ['common']) => {
  return {
    ...(await serverSideTranslations(locale, ns)),
  };
};