import { ReactNode } from 'react';
import { pomStyles } from '@/styles/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const Logo = ({ children, className = '' }: TypographyProps) => (
  <div className={`${pomStyles.logo} ${className}`}>{children}</div>
);

export const H1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`${pomStyles.heading.h1} ${className}`}>{children}</h1>
);

export const H2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`${pomStyles.heading.h2} ${className}`}>{children}</h2>
);

export const H3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`${pomStyles.heading.h3} ${className}`}>{children}</h3>
);

export const Paragraph = ({ children, className = '', variant = 'default' }: TypographyProps & { variant?: 'default' | 'light' | 'secondary' | 'muted' }) => (
  <p className={`${pomStyles.paragraph[variant]} ${className}`}>{children}</p>
);