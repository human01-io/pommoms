import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { pomStyles } from '@/styles/utils';
import { H2, Paragraph } from './ui/Typography';
import Button from './ui/Button';
import Card from './ui/Card';

const WaitlistForm = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };
  
  return (
    <section id="waitlist" className={pomStyles.section.default}>
      <div className={`${pomStyles.container} text-center`}>
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <H2>{t('waitlist.title')}</H2>
            <Paragraph variant="secondary" className="mb-8">
              {t('waitlist.subtitle')}
            </Paragraph>
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('waitlist.placeholder')}
                className="px-4 py-3 w-full md:flex-grow rounded-md border border-pom-border bg-pom-bg text-pom-text focus:outline-none focus:ring-2 focus:ring-pom-accent"
                required
                disabled={status === 'loading' || status === 'success'}
              />
              <Button 
                type="submit"
                className={status === 'success' ? 'bg-green-500 border-green-600' : ''}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? '...' : status === 'success' ? '✓' : t('waitlist.button')}
              </Button>
            </form>
            
            {status === 'success' && (
              <p className="mt-4 text-green-500">{t('waitlist.success')}</p>
            )}
            
            {status === 'error' && (
              <p className="mt-4 text-red-500">{t('waitlist.error')}</p>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;