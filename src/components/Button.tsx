
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'relative overflow-hidden rounded-md font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'bg-navy-800 text-white hover:bg-navy-700 focus:ring-navy-900': variant === 'primary',
            'bg-orange-400 text-white hover:bg-orange-500 focus:ring-orange-600': variant === 'secondary',
            'bg-transparent text-white hover:bg-navy-800 focus:ring-orange-400': variant === 'ghost',
            'bg-transparent border border-orange-400 text-orange-400 hover:bg-navy-800 focus:ring-orange-400': variant === 'outline',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
