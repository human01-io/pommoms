import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { pomStyles } from '@/styles/utils';
import { H1, Paragraph } from './ui/Typography';
import Button from './ui/Button';

const Hero = () => {
  const { t } = useTranslation('common');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Run once on mount
    checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className={pomStyles.container}>
        {isMobile ? (
          // Mobile layout - stacked with image in the middle
          <div className="flex flex-col items-center text-center">
            <H1>{t('hero.title')}</H1>
            <Paragraph variant="light" className="text-lg mb-6">
              {t('hero.description')}
            </Paragraph>
            
            {/* Image positioned between text and button */}
            <div className="hero-image-container my-6">
              <Image 
                src="/images/hero.png" 
                alt="Cute Pomeranian dog in space" 
                width={300}
                height={300}
                className="hero-image"
                priority
              />
            </div>
            
            <Link href="#waitlist">
              <Button>{t('hero.cta')}</Button>
            </Link>
          </div>
        ) : (
          // Desktop layout - side by side
          <div className="flex flex-row items-center">
            <div className="w-1/2 pr-8">
              <H1>{t('hero.title')}</H1>
              <Paragraph variant="light" className="text-lg mb-8">
                {t('hero.description')}
              </Paragraph>
              <Link href="#waitlist">
                <Button>{t('hero.cta')}</Button>
              </Link>
            </div>
            
            <div className="w-1/2 hero-image-container">
              <Image 
                src="/images/hero.png" 
                alt="Cute Pomeranian dog in space" 
                width={500}
                height={500}
                className="hero-image"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;