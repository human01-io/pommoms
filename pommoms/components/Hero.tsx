import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const { t } = useTranslation('common');

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-pink-500">{t('hero.title')}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
              {t('hero.subtitle')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md">
              {t('hero.description')}
            </p>
            <Link href="#waitlist" className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 shadow-md transition duration-300 transform hover:scale-105">
              {t('hero.cta')}
            </Link>
          </div>
          <div className="md:w-1/2 relative h-72 md:h-96 w-full">
            <Image 
              src="/images/hero2.jpg" 
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;