import { useTranslation } from 'next-i18next';

const About = () => {
  const { t } = useTranslation('common');

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('about.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;