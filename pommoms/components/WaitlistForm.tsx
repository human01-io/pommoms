import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { pomStyles } from '@/styles/utils';
import { H2, Paragraph } from './ui/Typography';
import Button from './ui/Button';
import Card from './ui/Card';
import PrivacyPolicyModal from './policies/PrivacyPolicyModal';
import SelectionCard from './ui/SelectionCard';
import MultiSelectionCard from './ui/MultiSelectionCard';

// MailerLite group IDs
const MAILERLITE_GROUPS = {
  POM_OWNERS_ACTIVE: '153765771134108692',
  POM_OWNERS_FUTURE: '153765785676809359',
  SOLANA_ENTHUSIASTS: '153765798470485960',
  PET_COMMUNITY_GENERAL: '153765822724048721'
};

// Form states
type UserType = 'pom_owner' | 'future_pom_owner' | 'solana_enthusiast' | 'general_follower';
type FormStep = 'email' | 'user_type' | 'details' | 'interests' | 'complete';

const WaitlistForm = () => {
  const { t } = useTranslation('common');
  
  // Form state
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType | ''>('');
  const [solanaExperience, setSolanaExperience] = useState('');
  const [numPoms, setNumPoms] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [otherInfo, setOtherInfo] = useState('');
  
  // UI state
  const [formStep, setFormStep] = useState<FormStep>('email');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  // Handlers
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if privacy policy is accepted
    if (!privacyChecked) {
      setPrivacyError(true);
      return;
    }
    
    setPrivacyError(false);
    setFormStep('user_type');
  };

  const handleUserTypeSelected = (type: UserType) => {
    setUserType(type);
    if (type === 'pom_owner' || type === 'future_pom_owner') {
      setFormStep('details');
    } else {
      setFormStep('interests');
    }
  };

  const handleNumPomsSelected = (num: string) => {
    setNumPoms(num);
    setFormStep('interests');
  };

  const handleSolanaExperienceSelected = (level: string) => {
    setSolanaExperience(level);
  };

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
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
  
  const handleFormSubmit = async (e: React.FormEvent) => {
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
          primaryInterest: interests.join(','),
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
  
  // Renders different form steps
  const renderFormStep = () => {
    switch (formStep) {
      case 'email':
        return (
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
        );
        
      case 'user_type':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-[var(--pom-text)]">
              {t('waitlist.user_type_label')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectionCard
                id="user-type-pom-owner"
                value="pom_owner"
                label={t('waitlist.user_type_pom_owner')}
                emoji="🐕"
                isSelected={userType === 'pom_owner'}
                onClick={() => handleUserTypeSelected('pom_owner')}
              />
              
              <SelectionCard
                id="user-type-future-pom-owner"
                value="future_pom_owner"
                label={t('waitlist.user_type_future_pom_owner')}
                emoji="🐾"
                isSelected={userType === 'future_pom_owner'}
                onClick={() => handleUserTypeSelected('future_pom_owner')}
              />
              
              <SelectionCard
                id="user-type-solana-enthusiast"
                value="solana_enthusiast"
                label={t('waitlist.user_type_solana_enthusiast')}
                emoji="💰"
                isSelected={userType === 'solana_enthusiast'}
                onClick={() => handleUserTypeSelected('solana_enthusiast')}
              />
              
              <SelectionCard
                id="user-type-general-follower"
                value="general_follower"
                label={t('waitlist.user_type_general_follower')}
                emoji="❤️"
                isSelected={userType === 'general_follower'}
                onClick={() => handleUserTypeSelected('general_follower')}
              />
            </div>
            
            <div>
              <Button 
                type="button" 
                onClick={() => setFormStep('email')}
                className="bg-[var(--pom-bg-secondary)]"
              >
                {t('waitlist.back_button')}
              </Button>
            </div>
          </div>
        );
        
      case 'details':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-[var(--pom-text)]">
              {t('waitlist.num_poms_label')}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SelectionCard
                id="num-poms-0"
                value="0"
                label={t('waitlist.num_poms_0')}
                emoji="0️⃣"
                isSelected={numPoms === '0'}
                onClick={handleNumPomsSelected}
              />
              
              <SelectionCard
                id="num-poms-1"
                value="1"
                label={t('waitlist.num_poms_1')}
                emoji="1️⃣"
                isSelected={numPoms === '1'}
                onClick={handleNumPomsSelected}
              />
              
              <SelectionCard
                id="num-poms-2"
                value="2"
                label={t('waitlist.num_poms_2')}
                emoji="2️⃣"
                isSelected={numPoms === '2'}
                onClick={handleNumPomsSelected}
              />
              
              <SelectionCard
                id="num-poms-3+"
                value="3+"
                label={t('waitlist.num_poms_3plus')}
                emoji="3️⃣"
                isSelected={numPoms === '3+'}
                onClick={handleNumPomsSelected}
              />
            </div>
            
            <div>
              <Button 
                type="button" 
                onClick={() => setFormStep('user_type')}
                className="bg-[var(--pom-bg-secondary)]"
              >
                {t('waitlist.back_button')}
              </Button>
            </div>
          </div>
        );
        
      case 'interests':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-[var(--pom-text)] mb-4">
                {t('waitlist.solana_experience_label')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <SelectionCard
                  id="solana-exp-none"
                  value="none"
                  label={t('waitlist.solana_exp_none')}
                  emoji="❓"
                  isSelected={solanaExperience === 'none'}
                  onClick={handleSolanaExperienceSelected}
                />
                
                <SelectionCard
                  id="solana-exp-beginner"
                  value="beginner"
                  label={t('waitlist.solana_exp_beginner')}
                  emoji="🔰"
                  isSelected={solanaExperience === 'beginner'}
                  onClick={handleSolanaExperienceSelected}
                />
                
                <SelectionCard
                  id="solana-exp-intermediate"
                  value="intermediate"
                  label={t('waitlist.solana_exp_intermediate')}
                  emoji="💼"
                  isSelected={solanaExperience === 'intermediate'}
                  onClick={handleSolanaExperienceSelected}
                />
                
                <SelectionCard
                  id="solana-exp-advanced"
                  value="advanced"
                  label={t('waitlist.solana_exp_advanced')}
                  emoji="🚀"
                  isSelected={solanaExperience === 'advanced'}
                  onClick={handleSolanaExperienceSelected}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-[var(--pom-text)] mb-4">
                {t('waitlist.primary_interest_label')} <span className="text-sm font-normal">{t('waitlist.select_multiple')}</span>
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <MultiSelectionCard
                  id="interest-community"
                  value="community"
                  label={t('waitlist.interest_community')}
                  emoji="👪"
                  isSelected={interests.includes('community')}
                  onClick={handleInterestToggle}
                />
                
                <MultiSelectionCard
                  id="interest-rewards"
                  value="rewards"
                  label={t('waitlist.interest_rewards')}
                  emoji="🎁"
                  isSelected={interests.includes('rewards')}
                  onClick={handleInterestToggle}
                />
                
                <MultiSelectionCard
                  id="interest-profiles"
                  value="profiles"
                  label={t('waitlist.interest_profiles')}
                  emoji="📋"
                  isSelected={interests.includes('profiles')}
                  onClick={handleInterestToggle}
                />
                
                <MultiSelectionCard
                  id="interest-events"
                  value="events"
                  label={t('waitlist.interest_events')}
                  emoji="🎉"
                  isSelected={interests.includes('events')}
                  onClick={handleInterestToggle}
                />
                
                <MultiSelectionCard
                  id="interest-adoption"
                  value="adoption"
                  label={t('waitlist.interest_adoption')}
                  emoji="🏠"
                  isSelected={interests.includes('adoption')}
                  onClick={handleInterestToggle}
                />
                
                <MultiSelectionCard
                  id="interest-solana"
                  value="solana"
                  label={t('waitlist.interest_solana')}
                  emoji="⚡"
                  isSelected={interests.includes('solana')}
                  onClick={handleInterestToggle}
                />
              </div>
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
                onClick={() => setFormStep(userType === 'pom_owner' || userType === 'future_pom_owner' ? 'details' : 'user_type')}
                className="bg-[var(--pom-bg-secondary)]"
              >
                {t('waitlist.back_button')}
              </Button>
              <Button 
                type="submit"
                disabled={!solanaExperience || interests.length === 0 || status === 'loading'}
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
        );
        
      case 'complete':
        return (
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
                href="https://instagram.com/pommoms.sol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--pom-accent)] hover:text-[var(--pom-accent-light)]"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com/pommoms.sol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--pom-accent)] hover:text-[var(--pom-accent-light)]"
              >
                Twitter
              </a>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <section id="waitlist" className={pomStyles.section.default}>
        <div className={`${pomStyles.container} text-center`}>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <H2>{t('waitlist.title')}</H2>
              <Paragraph variant="secondary" className="mb-8">
                {t('waitlist.subtitle')}
              </Paragraph>
              
              {renderFormStep()}
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