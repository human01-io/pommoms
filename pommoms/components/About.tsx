import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { pomStyles } from '@/styles/utils';
import { H2, H3, Paragraph } from './ui/Typography';

const About = () => {
  const { t } = useTranslation('common');

  return (
    <section id="about" className={pomStyles.section.default}>
      <div className={`${pomStyles.container} text-center`}>
        <H2>{t('about.title')}</H2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg max-w-md transform transition-transform duration-300 hover:scale-105">
              <Image 
                src="/images/about-us.png" 
                alt="PomMoms family with their Pomeranian Bruno" 
                width={500} 
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
          
          <div className="text-left space-y-6">
            <H3>{t('about.story_title')}</H3>
            <Paragraph variant="secondary">
              {t('about.story_content')}
            </Paragraph>
            
            <Paragraph variant="secondary">
              {t('about.community_content')}
            </Paragraph>

            <div className="flex items-center space-x-2 justify-center md:justify-start mt-4">
              <Image 
                src="/images/solana-logo.svg" 
                alt="Solana Logo" 
                width={24} 
                height={24}
              />
              <Paragraph variant="light" className="font-medium">
                {t('about.blockchain_powered')}
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;