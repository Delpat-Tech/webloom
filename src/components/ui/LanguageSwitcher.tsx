'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/components/layout/TranslationProvider';
import { SUPPORTED_LOCALES, getTextDirection } from '@/lib/translation';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons' | 'minimal';
  showFlags?: boolean;
  showNativeNames?: boolean;
}

export function LanguageSwitcher({ 
  className = '', 
  variant = 'dropdown',
  showFlags = true,
  showNativeNames = false
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languageOptions.find(lang => lang.code === locale) || languageOptions[0];

  const handleLanguageChange = (languageCode: string) => {
    setLocale(languageCode);
    setIsOpen(false);
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {languageOptions.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              locale === language.code
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            dir={getTextDirection(language.code)}
          >
            {showFlags && <span className="mr-1">{language.flag}</span>}
            {showNativeNames ? language.nativeName : language.name}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Globe size={16} />
          <span>{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[150px]">
            {languageOptions.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  locale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                dir={getTextDirection(language.code)}
              >
                {showFlags && <span className="mr-2">{language.flag}</span>}
                {showNativeNames ? language.nativeName : language.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        {showFlags && <span>{currentLanguage.flag}</span>}
        <span className="text-sm font-medium">
          {showNativeNames ? currentLanguage.nativeName : currentLanguage.name}
        </span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px] max-h-60 overflow-y-auto">
            {languageOptions.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                  locale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                dir={getTextDirection(language.code)}
              >
                <div className="flex items-center space-x-3">
                  {showFlags && <span className="text-lg">{language.flag}</span>}
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {showNativeNames ? language.nativeName : language.name}
                    </span>
                    {showNativeNames && language.nativeName !== language.name && (
                      <span className="text-xs text-gray-500">{language.name}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 