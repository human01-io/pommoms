import { ReactNode } from 'react';
import { pomStyles } from '@/styles/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`${pomStyles.card} ${className}`}>
    {children}
  </div>
);

export default Card;