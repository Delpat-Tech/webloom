import Image from 'next/image';
import { LogoProps } from '@/types';

export default function Logo({ 
  variant = 'svg', 
  size = 'md', 
  showText = true, 
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
    '3xl': 'w-48 h-48'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
    '3xl': 'text-6xl'
  };

  return (
    <>
      {showText ? (
        <div className={`flex items-center space-x-3 ${className}`}>
          <div className={`${sizeClasses[size]} rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-background`}>
            <Image
              src="/images/logo.svg"
              alt="Delpat Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <span className={`font-bold text-foreground ${textSizes[size]}`}>
            Delpat
          </span>
        </div>
      ) : (
        <Image
          src="/images/logo.svg"
          alt="Delpat Logo"
          width={48}
          height={48}
          className={`${sizeClasses[size]} ${className}`}
          priority
        />
      )}
    </>
  );
} 