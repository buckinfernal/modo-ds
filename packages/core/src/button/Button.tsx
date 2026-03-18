import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, fullWidth = false, children, className, disabled, ...rest }, ref) => {
    const isDisabled = disabled || isLoading;
    return (
      <button
        ref={ref}
        className={[styles.button, styles[`variant-${variant}`], styles[`size-${size}`], fullWidth ? styles.fullWidth : '', isLoading ? styles.loading : '', className ?? ''].filter(Boolean).join(' ')}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" role="presentation" />}
        {!isLoading && leftIcon && <span className={styles.iconLeft} aria-hidden="true">{leftIcon}</span>}
        <span className={styles.label}>{children}</span>
        {!isLoading && rightIcon && <span className={styles.iconRight} aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';
