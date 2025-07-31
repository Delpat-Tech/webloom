'use client';

import React from 'react';
import { useTranslation } from '@/components/layout/TranslationProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function TranslationExample() {
  const { t, locale, formatDate, formatNumber, formatCurrency, geoLocation } = useTranslation();

  const currentDate = new Date();
  const sampleNumber = 1234567.89;
  const sampleAmount = 999.99;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          {t('pages.home.content.heroTitle')}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          {t('pages.home.content.heroSubtitle')}
        </p>
        
        {/* Language Switcher */}
        <div className="flex justify-center mb-8">
          <LanguageSwitcher variant="dropdown" showFlags={true} showNativeNames={true} />
        </div>
      </div>

      {/* Current Language Info */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Current Language Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Current Locale:</strong> {locale}</p>
            <p><strong>Detected Country:</strong> {geoLocation?.country || 'Unknown'}</p>
            <p><strong>Country Code:</strong> {geoLocation?.countryCode || 'Unknown'}</p>
            <p><strong>City:</strong> {geoLocation?.city || 'Unknown'}</p>
          </div>
          <div>
            <p><strong>Formatted Date:</strong> {formatDate(currentDate, { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p><strong>Formatted Number:</strong> {formatNumber(sampleNumber)}</p>
            <p><strong>Formatted Currency:</strong> {formatCurrency(sampleAmount)}</p>
          </div>
        </div>
      </Card>

      {/* Navigation Example */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Navigation Example</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">{t('common.navigation.home')}</Button>
          <Button variant="secondary">{t('common.navigation.about')}</Button>
          <Button variant="secondary">{t('common.navigation.services')}</Button>
          <Button variant="secondary">{t('common.navigation.contact')}</Button>
        </div>
      </Card>

      {/* Form Example */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Form Example</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('common.forms.name')} *
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-border rounded-md"
              placeholder={t('common.forms.name')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('common.forms.email')} *
            </label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-border rounded-md"
              placeholder={t('common.forms.email')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('common.forms.company')}
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-border rounded-md"
              placeholder={t('common.forms.company')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('common.forms.phone')}
            </label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-border rounded-md"
              placeholder={t('common.forms.phone')}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            {t('common.forms.message')}
          </label>
          <textarea 
            className="w-full px-3 py-2 border border-border rounded-md"
            rows={4}
            placeholder={t('common.forms.message')}
          />
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="primary">{t('common.buttons.submit')}</Button>
          <Button variant="secondary">{t('common.buttons.cancel')}</Button>
        </div>
      </Card>

      {/* Error Messages Example */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Error Messages Example</h2>
        <div className="space-y-2">
          <p className="text-red-600">{t('common.errors.required')}</p>
          <p className="text-red-600">{t('common.errors.invalidEmail')}</p>
          <p className="text-red-600">{t('common.errors.minLength', { min: 8 })}</p>
          <p className="text-red-600">{t('common.errors.maxLength', { max: 100 })}</p>
        </div>
      </Card>

      {/* Status Messages Example */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Status Messages Example</h2>
        <div className="flex gap-2">
          <Button variant="secondary">{t('common.status.loading')}</Button>
          <Button variant="secondary">{t('common.status.success')}</Button>
          <Button variant="secondary">{t('common.status.error')}</Button>
          <Button variant="secondary">{t('common.status.warning')}</Button>
        </div>
      </Card>

      {/* Time References Example */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Time References Example</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Button variant="outline" size="sm">{t('common.time.today')}</Button>
          <Button variant="outline" size="sm">{t('common.time.yesterday')}</Button>
          <Button variant="outline" size="sm">{t('common.time.tomorrow')}</Button>
          <Button variant="outline" size="sm">{t('common.time.thisWeek')}</Button>
          <Button variant="outline" size="sm">{t('common.time.lastWeek')}</Button>
        </div>
      </Card>
    </div>
  );
} 