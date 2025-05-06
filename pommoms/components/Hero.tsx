import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { pomStyles } from '@/styles/utils';
import { H1, Paragraph } from './ui/Typography';
import Button from './ui/Button';

const Hero = () => {
  const { t } = useTranslation('common');

  return (
    <section className={pomStyles.section.hero}>
      <div className={pomStyles.container}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <H1>{t('hero.title')}</H1>
            <Paragraph variant="light" className="text-lg max-w-xl mb-8">
              {t('hero.description')}
            </Paragraph>
            <Link href="#waitlist">
              <Button>{t('hero.cta')}</Button>
            </Link>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-96 w-full">
            <Image 
              src="/images/hero-pom.webp" 
              alt="Cute Pomeranian dog" 
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