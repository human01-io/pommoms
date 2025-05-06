import { useTranslation } from 'next-i18next';
import { pomStyles } from '@/styles/utils';
import Card from './ui/Card';
import { H2, H3, Paragraph } from './ui/Typography';

// Define an interface for the feature items
interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

const Features = () => {
  const { t } = useTranslation('common');
  
  // Cast the translated array to the correct type
  const featureItems = t('features.items', { returnObjects: true }) as FeatureItem[];
  
  return (
    <section id="features" className={pomStyles.section.default}>
      <div className={`${pomStyles.container} text-center`}>
        <H2>{t('features.title')}</H2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((feature: FeatureItem, index: number) => (
            <Card key={index}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <H3>{feature.title}</H3>
              <Paragraph variant="secondary">{feature.description}</Paragraph>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <Card>
            <H3>{t('register.title')}</H3>
            <Paragraph variant="secondary">
              {t('register.description')}
            </Paragraph>
          </Card>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <Card>
            <H3>{t('community.title')}</H3>
            <Paragraph variant="secondary">
              {t('community.description')}
            </Paragraph>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;