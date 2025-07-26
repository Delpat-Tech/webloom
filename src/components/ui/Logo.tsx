import Image from 'next/image';
import { useState } from 'react';
import { LogoProps } from '@/types';

export default function Logo({ 
  variant = 'png', 
  size = 'md', 
  showText = true, 
  className = '' 
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {showText ? (
        <div className={`flex items-center space-x-3 ${className}`}>
          <div className={`${sizeClasses[size]} rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-background`}>
            {variant === 'svg' && !imageError ? (
              <Image
                src="/images/logo.svg"
                alt="Delpat Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            ) : (
              <Image
                src="/images/delpatlogo.png"
                alt="Delpat Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            )}
          </div>
          <span className={`font-bold text-foreground ${textSizes[size]}`}>
            Delpat
          </span>
        </div>
      ) : (
        <Image
          src={variant === 'svg' && !imageError ? "/images/logo.svg" : "/images/delpatlogo.png"}
          alt="Delpat Logo"
          width={48}
          height={48}
          className={`${sizeClasses[size]} ${className}`}
          onError={handleImageError}
        />
      )}
    </>
  );
} 