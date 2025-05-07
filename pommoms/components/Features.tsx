import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { pomStyles } from '@/styles/utils';
import { H2, H3, Paragraph } from './ui/Typography';
import Card from './ui/Card';

// SVG icons for features
const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--pom-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--pom-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const AdoptionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--pom-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--pom-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3l-6-3m12-3l5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17m0-13l-6 3m0 0l-6-3m6 3l6-3" />
  </svg>
);

const MarketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--pom-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const EventIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--pom-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Solana token icon
const SolanaIcon = () => (
  <svg width="128" height="114" viewBox="0 0 128 114" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g fill="currentColor">
      <path d="M20.8 77.5c0.7-0.8 1.9-1.2 3-1.2h102.5c1.9 0 2.8 2.3 1.5 3.6l-20.3 20.3c-0.7 0.8-1.9 1.2-3 1.2H2.1c-1.9 0-2.8-2.3-1.5-3.6l20.2-20.3z"/>
      <path d="M20.8 20.7c0.7-0.8 1.9-1.2 3-1.2h102.5c1.9 0 2.8 2.3 1.5 3.6L107.5 43.4c-0.7 0.8-1.9 1.2-3 1.2H2.1c-1.9 0-2.8-2.3-1.5-3.6l20.2-20.3z"/>
      <path d="M107.5 49c-0.7-0.8-1.9-1.2-3-1.2H2c-1.9 0-2.8 2.3-1.5 3.6l20.3 20.2c0.7 0.8 1.9 1.2 3 1.2h102.5c1.9 0 2.8-2.3 1.5-3.6L107.5 49z"/>
  </g>
</svg>
);

const Features = () => {
  const { t } = useTranslation('common');
  
  const features = [
    { 
      icon: <ProfileIcon />, 
      title: t('features.profile_title'),
      description: t('features.profile_description')
    },
    { 
      icon: <AlertIcon />, 
      title: t('features.alert_title'),
      description: t('features.alert_description')
    },
    { 
      icon: <AdoptionIcon />, 
      title: t('features.adoption_title'),
      description: t('features.adoption_description')
    },
    { 
      icon: <MapIcon />, 
      title: t('features.map_title'),
      description: t('features.map_description')
    },
    { 
      icon: <MarketIcon />, 
      title: t('features.market_title'),
      description: t('features.market_description')
    },
    { 
      icon: <EventIcon />, 
      title: t('features.events_title'),
      description: t('features.events_description')
    }
  ];
  
  return (
    <section id="features" className={pomStyles.section.default}>
      <div className={`${pomStyles.container} text-center`}>
        <H2>{t('features.title')}</H2>
        <Paragraph variant="secondary" className="max-w-3xl mx-auto mb-10">
          {t('features.subtitle')}
        </Paragraph>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <H3>{feature.title}</H3>
              <Paragraph variant="secondary">{feature.description}</Paragraph>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-8 border-2 border-[var(--pom-accent-light)] bg-gradient-to-br from-[var(--pom-bg-secondary)] to-[var(--pom-bg-tertiary)]">
            <div className="flex justify-center mb-6">
              <SolanaIcon />
            </div>
            <H3>{t('features.blockchain_title')}</H3>
            <Paragraph variant="secondary" className="mb-4">
              {t('features.blockchain_description')}
            </Paragraph>
            <div className="flex items-center md:justify-start space-x-2 mt-4 p-4 bg-[var(--pom-bg-tertiary)] rounded-lg inline-block mx-auto">
              <Image 
                src="/images/solana-logo.svg" 
                alt="Solana Logo" 
                width={20} 
                height={20}
              />
              <span className="text-[var(--pom-accent-light)] font-medium">
                {t('features.powered_by_solana')}
              </span>
            </div>
          </Card>
        </div>
        
        <div className="mt-10 max-w-3xl mx-auto">
          <Card className="p-6">
            <H3>{t('features.early_adopter_title')}</H3>
            <Paragraph variant="secondary">
              {t('features.early_adopter_description')}
            </Paragraph>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;