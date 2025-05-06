import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const WaitlistForm = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Here you would normally send the data to your backend
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration purposes, let's just show success
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };
  
  return (
    <section id="waitlist" className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('waitlist.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('waitlist.subtitle')}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('waitlist.placeholder')}
              className="px-4 py-3 w-full md:flex-grow rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-md transition duration-300 ${
                status === 'loading' ? 'bg-gray-400' : status === 'success' ? 'bg-green-500' : 'bg-pink-500 hover:bg-pink-600'
              } text-white font-medium`}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? '...' : status === 'success' ? '✓' : t('waitlist.button')}
            </button>
          </form>
          
          {status === 'success' && (
            <p className="mt-4 text-green-600">{t('waitlist.success')}</p>
          )}
          
          {status === 'error' && (
            <p className="mt-4 text-red-600">{t('waitlist.error')}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;