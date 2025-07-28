# Metadata System Documentation

## Overview

This document describes the per-page meta tags system implemented for the Delpat website. The system provides comprehensive SEO optimization with custom titles, descriptions, keywords, Open Graph tags, and Twitter Card metadata for each page.

## Architecture

### Core Files

- `src/lib/metadata.ts` - Central metadata configuration and generation functions
- Layout files in each page directory - Handle metadata for client components

### Key Components

1. **Metadata Configuration** (`src/lib/metadata.ts`)
   - `PageMetadata` interface - Defines the structure for page metadata
   - `pagesMetadata` object - Contains metadata for all pages
   - `generateMetadata()` function - Generates metadata for static pages
   - `generateDynamicMetadata()` function - Handles dynamic routes

2. **Layout Files**
   - Each page has a `layout.tsx` file that exports metadata
   - Handles metadata for client components that can't export metadata directly
   - Uses the appropriate metadata generation function

## Page Metadata Structure

Each page's metadata includes:

```typescript
{
  title: string;           // Page title
  description: string;     // Meta description
  keywords: string;        // Meta keywords
  openGraph?: {           // Open Graph tags
    title?: string;
    description?: string;
    type?: 'website' | 'article' | ...;
    url?: string;
    image?: string;
  };
  twitter?: {             // Twitter Card tags
    card?: 'summary' | 'summary_large_image' | ...;
    title?: string;
    description?: string;
    image?: string;
  };
}
```

## Supported Pages

The system currently supports metadata for the following pages:

### Static Pages
- `home` - Homepage
- `about` - About page
- `services` - Services page
- `contact` - Contact page
- `pricing` - Pricing page
- `proof` - Portfolio/Work page
- `how-we-work` - Process page
- `who-we-help` - Clients page
- `why-delpat` - Differentiators page
- `collaborate` - Partnership page
- `resources` - Resources page
- `test-analytics` - Development tools page

### Legal Pages
- `legal/privacy` - Privacy Policy
- `legal/terms` - Terms of Service

### Dynamic Pages
- `proof/[id]` - Individual case study pages
- `resources/[slug]` - Individual resource/blog pages

## Implementation Details

### For Static Pages

1. **Create a layout file** in the page directory:
   ```typescript
   // src/app/about/layout.tsx
   import { generateMetadata } from '@/lib/metadata';
   
   export const metadata = generateMetadata('about');
   
   export default function AboutLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return children;
   }
   ```

2. **Add metadata configuration** in `src/lib/metadata.ts`:
   ```typescript
   about: {
     title: 'About Delpat - We Are the Execution Engine',
     description: 'Built by founders, for founders...',
     keywords: 'about Delpat, founders, execution engine...',
     openGraph: {
       title: 'About Delpat - We Are the Execution Engine',
       description: 'Built by founders, for founders...',
       type: 'website',
       url: 'https://delpat.com/about',
     },
     twitter: {
       card: 'summary_large_image',
       title: 'About Delpat - We Are the Execution Engine',
       description: 'Built by founders, for founders...',
     },
   },
   ```

### For Dynamic Pages

1. **Create a layout file** with dynamic metadata generation:
   ```typescript
   // src/app/proof/[id]/layout.tsx
   import { generateDynamicMetadata } from '@/lib/metadata';
   
   export async function generateMetadata({ params }: { params: { id: string } }) {
     return generateDynamicMetadata('proof', params);
   }
   
   export default function ProofIdLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return children;
   }
   ```

2. **Extend the dynamic metadata function** to handle specific cases:
   ```typescript
   export function generateDynamicMetadata(
     pageKey: string, 
     params: Record<string, string | string[]>
   ): Metadata {
     const baseMetadata = generateMetadata(pageKey);
     
     // Customize metadata based on dynamic parameters
     if (pageKey === 'proof' && params.id) {
       // Fetch case study data and customize metadata
       return {
         ...baseMetadata,
         title: `Case Study: ${params.id} | Delpat`,
         description: `See how we helped with ${params.id}...`,
       };
     }
     
     return baseMetadata;
   }
   ```

## SEO Benefits

The metadata system provides:

1. **Custom Page Titles** - Each page has a unique, descriptive title
2. **Meta Descriptions** - Compelling descriptions for search results
3. **Keywords** - Relevant keywords for search engines
4. **Open Graph Tags** - Rich social media previews
5. **Twitter Cards** - Optimized Twitter sharing
6. **Structured Data** - Consistent metadata structure

## Best Practices

1. **Title Format**: `Page Name - Key Message | Brand`
2. **Description Length**: 150-160 characters for optimal display
3. **Keywords**: Include relevant, specific terms
4. **Open Graph**: Use compelling titles and descriptions for social sharing
5. **Consistency**: Maintain brand voice across all metadata

## Adding New Pages

To add metadata for a new page:

1. Add the page configuration to `pagesMetadata` in `src/lib/metadata.ts`
2. Create a `layout.tsx` file in the page directory
3. Import and use the appropriate metadata generation function
4. Test the metadata using browser dev tools or SEO tools

## Testing

You can test the metadata implementation by:

1. **Browser Dev Tools**: View page source and check meta tags
2. **Social Media Testing**: Use Facebook Sharing Debugger and Twitter Card Validator
3. **SEO Tools**: Use tools like Google Search Console to verify implementation
4. **Development**: Check console logs for dynamic route parameters

## Future Enhancements

Potential improvements to the metadata system:

1. **Dynamic Content**: Fetch real data for dynamic routes
2. **Image Optimization**: Add Open Graph images for each page
3. **Structured Data**: Add JSON-LD structured data
4. **Analytics**: Track metadata performance
5. **CMS Integration**: Connect to a content management system

## Maintenance

- Update metadata when page content changes
- Monitor SEO performance and adjust accordingly
- Keep keywords and descriptions current with business focus
- Test social media sharing regularly 