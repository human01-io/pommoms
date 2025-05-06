import { useTranslation } from 'next-i18next';
import { pomStyles } from '@/styles/utils';
import { H2, Paragraph } from './ui/Typography';

const About = () => {
  const { t } = useTranslation('common');

  return (
    <section id="about" className={pomStyles.section.default}>
      <div className={`${pomStyles.container} text-center`}>
        <div className="max-w-3xl mx-auto">
          <H2>{t('about.title')}</H2>
          <Paragraph variant="secondary" className="text-xl">
            {t('about.description')}
          </Paragraph>
        </div>
      </div>
    </section>
  );
};

export default About;