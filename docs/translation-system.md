# Dynamic Content Translation System

This document explains how to implement and use the dynamic content translation system based on IP geolocation in your Next.js application.

## Overview

The translation system automatically detects a user's location based on their IP address and serves content in their preferred language. It supports 13 languages and includes fallback mechanisms for optimal user experience.

## Features

- **IP-based Geolocation**: Automatically detects user's country and suggests appropriate language
- **Browser Language Detection**: Falls back to browser language preferences
- **Manual Language Selection**: Users can manually switch languages
- **URL Parameter Support**: Language can be set via URL parameter (`?lang=fr`)
- **Local Storage Persistence**: Remembers user's language preference
- **RTL Support**: Automatic text direction for Arabic and other RTL languages
- **Number/Date/Currency Formatting**: Locale-aware formatting
- **Fallback System**: Graceful fallback to English if translation is missing

## Supported Languages

| Language | Code | Countries |
|----------|------|-----------|
| English | `en` | Default |
| French | `fr` | France, Canada, Belgium, Switzerland, Luxembourg, Monaco |
| Spanish | `es` | Spain, Mexico, Argentina, Colombia, Peru, Venezuela, Chile, Ecuador, Guatemala, Cuba, Bolivia, Dominican Republic, Honduras, Paraguay, El Salvador, Nicaragua, Costa Rica, Panama, Equatorial Guinea, Uruguay |
| German | `de` | Germany, Austria, Liechtenstein |
| Italian | `it` | Italy, San Marino, Vatican City |
| Portuguese | `pt` | Portugal, Brazil, Angola, Mozambique, Guinea-Bissau, Cape Verde, São Tomé and Príncipe, East Timor, Macau |
| Dutch | `nl` | Netherlands, Belgium |
| Japanese | `ja` | Japan |
| Korean | `ko` | South Korea |
| Chinese | `zh` | China, Taiwan, Hong Kong, Macau, Singapore |
| Arabic | `ar` | Saudi Arabia, Egypt, UAE, Iraq, Syria, Jordan, Lebanon, Libya, Morocco, Algeria, Tunisia, Oman, Kuwait, Qatar, Bahrain, Yemen, Sudan, Somalia, Djibouti, Comoros, Chad, Eritrea |
| Hindi | `hi` | India |
| Russian | `ru` | Russia, Belarus, Kazakhstan, Kyrgyzstan, Tajikistan, Uzbekistan, Turkmenistan, Moldova, Georgia, Armenia, Azerbaijan |

## Installation

The system is already integrated into your project. The following dependencies are required:

```bash
npm install next-intl @maxmind/geoip2-node
```

## Usage

### 1. Basic Translation

Use the `useTranslation` hook to access translation functions:

```tsx
import { useTranslation } from '@/components/layout/TranslationProvider';

function MyComponent() {
  const { t, locale, geoLocation } = useTranslation();

  return (
    <div>
      <h1>{t('pages.home.content.heroTitle')}</h1>
      <p>{t('pages.home.content.heroSubtitle')}</p>
      <p>Current language: {locale}</p>
      <p>Detected country: {geoLocation?.country}</p>
    </div>
  );
}
```

### 2. Translation with Parameters

Use parameter interpolation for dynamic content:

```tsx
const { t } = useTranslation();

// In translation file: "Welcome {name}!"
const message = t('common.welcome', { name: 'John' });

// In translation file: "Must be at least {min} characters"
const error = t('common.errors.minLength', { min: 8 });
```

### 3. Formatting Functions

Use locale-aware formatting functions:

```tsx
const { formatDate, formatNumber, formatCurrency } = useTranslation();

const date = formatDate(new Date(), { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

const number = formatNumber(1234567.89);
const currency = formatCurrency(999.99);
```

### 4. Language Switcher Component

Add a language switcher to your UI:

```tsx
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

// Dropdown variant
<LanguageSwitcher variant="dropdown" showFlags={true} showNativeNames={true} />

// Button variant
<LanguageSwitcher variant="buttons" showFlags={true} />

// Minimal variant
<LanguageSwitcher variant="minimal" showFlags={true} />
```

## Translation File Structure

Translation files are located in `src/locales/` and follow this structure:

```json
{
  "common": {
    "navigation": {
      "home": "Home",
      "about": "About"
    },
    "buttons": {
      "submit": "Submit",
      "cancel": "Cancel"
    },
    "forms": {
      "name": "Name",
      "email": "Email"
    },
    "errors": {
      "required": "This field is required",
      "minLength": "Must be at least {min} characters"
    }
  },
  "pages": {
    "home": {
      "title": "Page Title",
      "description": "Page description",
      "content": {
        "heroTitle": "Hero Title",
        "heroSubtitle": "Hero subtitle"
      }
    }
  }
}
```

## Adding New Languages

1. Create a new translation file in `src/locales/` (e.g., `de.json`)
2. Add the language to the `SUPPORTED_LOCALES` array in `src/lib/translation.ts`
3. Add country mappings in `LANGUAGE_COUNTRY_MAP`
4. Import the translation file in `TranslationProvider.tsx`

## API Endpoints

### Geolocation API

`GET /api/geolocation`

Returns geolocation data based on the client's IP address:

```json
{
  "success": true,
  "geoLocation": {
    "country": "France",
    "countryCode": "FR",
    "region": "Île-de-France",
    "city": "Paris",
    "timezone": "Europe/Paris",
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "ip": "203.0.113.1"
}
```

## Configuration

### Translation Configuration

Modify `src/lib/translation.ts` to customize:

- Supported languages
- Country-to-language mappings
- Default locale
- Currency mappings

### Geolocation Service

The system uses `ipapi.co` as a free geolocation service. For production, consider:

- **MaxMind GeoIP2**: More accurate, paid service
- **Cloudflare**: If using Cloudflare, use their headers
- **Custom service**: Implement your own geolocation logic

## Best Practices

### 1. Translation Keys

Use descriptive, hierarchical keys:

```tsx
// Good
t('pages.contact.form.email.label')
t('common.buttons.submit')

// Avoid
t('email')
t('submit')
```

### 2. Parameter Interpolation

Use parameters for dynamic content:

```tsx
// Good
t('common.welcome', { name: userName })
t('common.items', { count: itemCount })

// Avoid
t(`common.welcome.${userName}`)
```

### 3. Fallback Strategy

Always provide English translations as fallbacks:

```tsx
// The system automatically falls back to English
const translation = t('some.key'); // Falls back to English if not found
```

### 4. RTL Support

For RTL languages, use the `getTextDirection` function:

```tsx
import { getTextDirection } from '@/lib/translation';

const direction = getTextDirection(locale); // 'ltr' or 'rtl'
```

## Testing

### Manual Testing

1. Use a VPN to test different countries
2. Change browser language settings
3. Test URL parameters: `?lang=fr`
4. Test localStorage persistence

### Automated Testing

```tsx
// Mock the translation context
const mockTranslation = {
  t: (key: string) => key,
  locale: 'en',
  setLocale: jest.fn(),
  geoLocation: null,
  isLoading: false
};

// Test component with mocked context
```

## Performance Considerations

1. **Bundle Size**: Translation files are loaded on demand
2. **Caching**: Geolocation data is cached in localStorage
3. **API Calls**: Geolocation API calls are minimized
4. **Tree Shaking**: Unused translations are excluded

## Troubleshooting

### Common Issues

1. **Translation not found**: Check if the key exists in the translation file
2. **Geolocation not working**: Check if the IP is localhost or private
3. **Language not switching**: Check if the locale is in `SUPPORTED_LOCALES`
4. **RTL not working**: Ensure the language is in the RTL list

### Debug Mode

Enable debug logging:

```tsx
// In TranslationProvider.tsx
const t = (key: string, params?: Record<string, any>): string => {
  // ... existing code ...
  
  if (!translation) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  return interpolateTranslation(translation, params);
};
```

## Migration Guide

If you're migrating from another translation system:

1. Convert existing translation files to the new JSON structure
2. Replace translation function calls with the new `t()` function
3. Update components to use the `useTranslation` hook
4. Test all language variants

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review the example components
3. Test with the `TranslationExample` component
4. Check browser console for error messages 