interface SelectionCardProps {
  id: string;
  value: string;
  label: string;
  emoji: string;
  isSelected: boolean;
  onClick: (value: string) => void;
  className?: string;
}

const SelectionCard = ({ 
  id, 
  value, 
  label, 
  emoji, 
  isSelected, 
  onClick, 
  className = '' 
}: SelectionCardProps) => {
  return (
    <div 
      className={`
        cursor-pointer p-4 rounded-xl transition-all duration-200 relative
        ${isSelected 
          ? 'bg-[var(--pom-accent)] border-2 border-[var(--pom-accent)] shadow-md transform scale-105' 
          : 'bg-[var(--pom-bg-secondary)] border border-[var(--pom-border)] hover:border-[var(--pom-accent-light)]'
        }
        ${className}
      `}
      onClick={() => onClick(value)}
    >
      <input
        type="radio"
        id={id}
        name={id}
        value={value}
        checked={isSelected}
        onChange={() => {}}
        className="sr-only"
      />
      <div className="flex flex-col items-center">
        <div className="text-3xl mb-3">
          {emoji}
        </div>
        <label 
          htmlFor={id}
          className={`text-center font-medium ${isSelected ? 'text-white' : 'text-[var(--pom-text)]'}`}
        >
          {label}
        </label>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--pom-accent)]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SelectionCard;