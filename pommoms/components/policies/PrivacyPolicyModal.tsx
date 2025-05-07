import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';
import { H2, Paragraph } from '../ui/Typography';
import Button from '../ui/Button';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  const { t } = useTranslation('common');
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-[var(--pom-bg-secondary)] rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto border border-[var(--pom-border)] shadow-xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <H2 className="mb-0">{t('privacy.title')}</H2>
            <button 
              onClick={onClose}
              className="text-[var(--pom-text-secondary)] hover:text-[var(--pom-text)] transition"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4 text-left mb-6">
            <Paragraph variant="secondary">
              {t('privacy.intro')}
            </Paragraph>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section1.title')}</h3>
              <Paragraph variant="secondary">
                {t('privacy.section1.content')}
              </Paragraph>
              <Paragraph variant="secondary">
                {t('privacy.section1.contact')}
              </Paragraph>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section2.title')}</h3>
              <ul className="list-disc pl-5 text-[var(--pom-text-secondary)]">
                <li>{t('privacy.section2.item1')}</li>
                <li>{t('privacy.section2.item2')}</li>
                <li>{t('privacy.section2.item3')}</li>
                <li>{t('privacy.section2.item4')}</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section3.title')}</h3>
              <Paragraph variant="secondary">
                {t('privacy.section3.content')}
              </Paragraph>
              <ul className="list-disc pl-5 text-[var(--pom-text-secondary)]">
                <li>{t('privacy.section3.item1')}</li>
                <li>{t('privacy.section3.item2')}</li>
                <li>{t('privacy.section3.item3')}</li>
                <li>{t('privacy.section3.item4')}</li>
              </ul>
              <Paragraph variant="secondary">
                {t('privacy.section3.secondary_title')}
              </Paragraph>
              <ul className="list-disc pl-5 text-[var(--pom-text-secondary)]">
                <li>{t('privacy.section3.secondary_item1')}</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section4.title')}</h3>
              <Paragraph variant="secondary">
                {t('privacy.section4.content')}
              </Paragraph>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section5.title')}</h3>
              <Paragraph variant="secondary">
                {t('privacy.section5.content')}
              </Paragraph>
              <ul className="list-disc pl-5 text-[var(--pom-text-secondary)]">
                <li>{t('privacy.section5.item1')}</li>
                <li>{t('privacy.section5.item2')}</li>
                <li>{t('privacy.section5.item3')}</li>
                <li>{t('privacy.section5.item4')}</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section6.title')}</h3>
              <Paragraph variant="secondary">
                {t('privacy.section6.content')}
              </Paragraph>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section7.title')}</h3>
              <Paragraph variant="secondary">
                {t('privacy.section7.content')}
              </Paragraph>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--pom-text)]">{t('privacy.section8.title')}</h3>
              <Paragraph variant="secondary">
                {t('privacy.section8.content')}
              </Paragraph>
            </div>
            
            <Paragraph variant="secondary">
              {t('privacy.last_updated')}: {t('privacy.update_date')}
            </Paragraph>
          </div>
          
          <div className="flex justify-end">
            <Button size="small" onClick={onClose}>
              {t('privacy.close_button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;