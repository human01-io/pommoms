import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { pomStyles } from '@/styles/utils';
import { H2, Paragraph } from './ui/Typography';
import Button from './ui/Button';
import Card from './ui/Card';
import PrivacyPolicyModal from './policies/PrivacyPolicyModal';

// Updated MailerLite group IDs
const MAILERLITE_GROUPS = {
  POM_OWNERS_ACTIVE: '153765771134108692',
  POM_OWNERS_FUTURE: '153765785676809359',
  SOLANA_ENTHUSIASTS: '153765798470485960',
  PET_COMMUNITY_GENERAL: '153765822724048721'
};

// Form states
type UserType = 'pom_owner' | 'future_pom_owner' | 'solana_enthusiast' | 'general_follower';
type FormStep = 'email' | 'details' | 'complete';

const WaitlistForm = () => {
  const { t } = useTranslation('common');
  
  // Form state
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType | ''>('');
  const [solanaExperience, setSolanaExperience] = useState('');
  const [numPoms, setNumPoms] = useState('');
  const [primaryInterest, setPrimaryInterest] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  
  // UI state
  const [formStep, setFormStep] = useState<FormStep>('email');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if privacy policy is accepted
    if (!privacyChecked) {
      setPrivacyError(true);
      return;
    }
    
    setPrivacyError(false);
    setFormStep('details');
  };

  // Function to determine which MailerLite group to use
  const getMailerGroupId = (type: UserType): string => {
    switch(type) {
      case 'pom_owner':
        return MAILERLITE_GROUPS.POM_OWNERS_ACTIVE;
      case 'future_pom_owner':
        return MAILERLITE_GROUPS.POM_OWNERS_FUTURE;
      case 'solana_enthusiast':
        return MAILERLITE_GROUPS.SOLANA_ENTHUSIASTS;
      case 'general_follower':
        return MAILERLITE_GROUPS.PET_COMMUNITY_GENERAL;
      default:
        return MAILERLITE_GROUPS.PET_COMMUNITY_GENERAL;
    }
  };
  
  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Determine which MailerLite group to use based on user type
    const groupId = getMailerGroupId(userType as UserType);
    
    try {
      // Submit data to API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userType,
          solanaExperience,
          numPoms,
          primaryInterest,
          otherInfo,
          language: navigator.language || 'en',
          groupId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        setStatus('error');
        return;
      }
      
      setStatus('success');
      setFormStep('complete');
    } catch (err) {
      console.error('Unexpected error:', err);
      setStatus('error');
    }
  };
  
  const openPrivacyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };
  
  return (
    <>
      <section id="waitlist" className={pomStyles.section.default}>
        <div className={`${pomStyles.container} text-center`}>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <H2>{t('waitlist.title')}</H2>
              <Paragraph variant="secondary" className="mb-8">
                {t('waitlist.subtitle')}
              </Paragraph>
              
              {formStep === 'email' && (
                <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-4">
                  <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('waitlist.placeholder')}
                      className="px-4 py-3 w-full md:flex-grow rounded-md border border-[var(--pom-border)] bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] focus:outline-none focus:ring-2 focus:ring-[var(--pom-accent)]"
                      required
                    />
                    <Button type="submit">
                      {t('waitlist.next_button')}
                    </Button>
                  </div>
                  
                  <div className="flex items-start mt-4 text-left">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy-checkbox"
                        type="checkbox"
                        checked={privacyChecked}
                        onChange={() => {
                          setPrivacyChecked(!privacyChecked);
                          if (privacyError) setPrivacyError(false);
                        }}
                        className="w-4 h-4 text-[var(--pom-accent)] bg-[var(--pom-bg-tertiary)] border-[var(--pom-border)] rounded focus:ring-[var(--pom-accent)] focus:ring-2"
                      />
                    </div>
                    <label 
                      htmlFor="privacy-checkbox" 
                      className="ml-2 text-sm text-[var(--pom-text-secondary)]"
                    >
                      {t('waitlist.privacy_agreement')} 
                      <button 
                        onClick={openPrivacyModal}
                        className="text-[var(--pom-accent)] hover:text-[var(--pom-accent-light)] ml-1 focus:outline-none"
                      >
                        {t('waitlist.privacy_link')}
                      </button>
                    </label>
                  </div>
                  
                  {privacyError && (
                    <p className="text-red-500 text-left text-sm">
                      {t('waitlist.privacy_error')}
                    </p>
                  )}
                </form>
              )}
              
              {formStep === 'details' && (
                <form onSubmit={handleDetailsSubmit} className="flex flex-col space-y-6 text-left">
                  <div>
                    <label className="block text-[var(--pom-text)] font-medium mb-2">
                      {t('waitlist.user_type_label')}
                    </label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value as UserType)}
                      className="w-full px-4 py-3 rounded-md border border-[var(--pom-border)] bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] focus:outline-none focus:ring-2 focus:ring-[var(--pom-accent)]"
                      required
                    >
                      <option value="">{t('waitlist.select_option')}</option>
                      <option value="pom_owner">{t('waitlist.user_type_pom_owner')}</option>
                      <option value="future_pom_owner">{t('waitlist.user_type_future_pom_owner')}</option>
                      <option value="solana_enthusiast">{t('waitlist.user_type_solana_enthusiast')}</option>
                      <option value="general_follower">{t('waitlist.user_type_general_follower')}</option>
                    </select>
                  </div>
                  
                  {(userType === 'pom_owner' || userType === 'future_pom_owner') && (
                    <div>
                      <label className="block text-[var(--pom-text)] font-medium mb-2">
                        {t('waitlist.num_poms_label')}
                      </label>
                      <select
                        value={numPoms}
                        onChange={(e) => setNumPoms(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-[var(--pom-border)] bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] focus:outline-none focus:ring-2 focus:ring-[var(--pom-accent)]"
                      >
                        <option value="">{t('waitlist.select_option')}</option>
                        <option value="0">{t('waitlist.num_poms_0')}</option>
                        <option value="1">{t('waitlist.num_poms_1')}</option>
                        <option value="2">{t('waitlist.num_poms_2')}</option>
                        <option value="3+">{t('waitlist.num_poms_3plus')}</option>
                      </select>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-[var(--pom-text)] font-medium mb-2">
                      {t('waitlist.solana_experience_label')}
                    </label>
                    <select
                      value={solanaExperience}
                      onChange={(e) => setSolanaExperience(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-[var(--pom-border)] bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] focus:outline-none focus:ring-2 focus:ring-[var(--pom-accent)]"
                    >
                      <option value="">{t('waitlist.select_option')}</option>
                      <option value="none">{t('waitlist.solana_exp_none')}</option>
                      <option value="beginner">{t('waitlist.solana_exp_beginner')}</option>
                      <option value="intermediate">{t('waitlist.solana_exp_intermediate')}</option>
                      <option value="advanced">{t('waitlist.solana_exp_advanced')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[var(--pom-text)] font-medium mb-2">
                      {t('waitlist.primary_interest_label')}
                    </label>
                    <select
                      value={primaryInterest}
                      onChange={(e) => setPrimaryInterest(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-[var(--pom-border)] bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] focus:outline-none focus:ring-2 focus:ring-[var(--pom-accent)]"
                    >
                      <option value="">{t('waitlist.select_option')}</option>
                      <option value="community">{t('waitlist.interest_community')}</option>
                      <option value="rewards">{t('waitlist.interest_rewards')}</option>
                      <option value="profiles">{t('waitlist.interest_profiles')}</option>
                      <option value="events">{t('waitlist.interest_events')}</option>
                      <option value="adoption">{t('waitlist.interest_adoption')}</option>
                      <option value="solana">{t('waitlist.interest_solana')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[var(--pom-text)] font-medium mb-2">
                      {t('waitlist.other_info_label')}
                    </label>
                    <textarea
                      value={otherInfo}
                      onChange={(e) => setOtherInfo(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-[var(--pom-border)] bg-[var(--pom-bg-tertiary)] text-[var(--pom-text)] focus:outline-none focus:ring-2 focus:ring-[var(--pom-accent)] h-24"
                      placeholder={t('waitlist.other_info_placeholder')}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={() => setFormStep('email')}
                      className="bg-[var(--pom-bg-secondary)]"
                    >
                      {t('waitlist.back_button')}
                    </Button>
                    <Button 
                      type="submit"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? '...' : t('waitlist.submit_button')}
                    </Button>
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-center">
                      {t('waitlist.error')}
                    </p>
                  )}
                </form>
              )}
              
              {formStep === 'complete' && (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <Paragraph variant="secondary" className="mb-4">
                    {t('waitlist.success')}
                  </Paragraph>
                  <Paragraph variant="secondary">
                    {t('waitlist.follow_socials')}
                  </Paragraph>
                  <div className="flex justify-center space-x-4 mt-6">
                    <a 
                      href="https://instagram.com/pom.moms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--pom-accent)] hover:text-[var(--pom-accent-light)]"
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://twitter.com/pommoms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--pom-accent)] hover:text-[var(--pom-accent-light)]"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>
      
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </>
  );
};

export default WaitlistForm;