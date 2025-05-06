import { ReactNode } from 'react';
import { pomStyles } from '@/styles/utils';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'regular';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  size = 'regular',
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const sizeClass = size === 'small' ? pomStyles.button.small : pomStyles.button.primary;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;