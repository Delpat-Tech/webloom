'use client';

import { useEffect, useState } from 'react';
import { testAnalytics, triggerTestEvents } from '@/utils/testAnalytics';
import { trackCTAClick, trackContactForm } from '@/lib/analytics';
import Button from '@/components/ui/Button';

export default function TestAnalyticsPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    // Test analytics on page load
    setTimeout(() => {
      testAnalytics();
      setTestResults(prev => [...prev, '✅ Analytics test completed']);
    }, 1000);
  }, []);

  const handleTestEvents = () => {
    triggerTestEvents();
    setTestResults(prev => [...prev, '✅ Test events triggered']);
  };

  const handleTestCTA = () => {
    trackCTAClick('test_button', 'test_analytics_page');
    setTestResults(prev => [...prev, '✅ CTA click tracked']);
  };

  const handleTestForm = () => {
    trackContactForm('test_form');
    setTestResults(prev => [...prev, '✅ Form submission tracked']);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🧪 Analytics Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📊 Analytics Status</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg">Google Analytics ID:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                process.env.NEXT_PUBLIC_GA_ID 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {process.env.NEXT_PUBLIC_GA_ID ? '✅ Set' : '❌ Missing'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-lg">Hotjar ID:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                process.env.NEXT_PUBLIC_HOTJAR_ID 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {process.env.NEXT_PUBLIC_HOTJAR_ID ? '✅ Set' : '❌ Missing'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🧪 Test Analytics Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button 
              onClick={handleTestEvents}
              variant="primary"
              className="w-full"
            >
              Test GA Events
            </Button>
            
            <Button 
              onClick={handleTestCTA}
              variant="gradient-monotone"
              className="w-full"
            >
              Test CTA Click
            </Button>
            
            <Button 
              onClick={handleTestForm}
              variant="secondary"
              className="w-full"
            >
              Test Form Submit
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm text-gray-700">
                  {result}
                </div>
              ))}
              {testResults.length === 0 && (
                <div className="text-sm text-gray-500">
                  No tests run yet. Click the buttons above to test analytics.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 What to Check</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">🔍 Browser Console</h3>
              <p className="text-gray-600">
                Press F12 → Console tab. You should see analytics test messages.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">📈 Google Analytics</h3>
              <p className="text-gray-600">
                Go to GA4 → Realtime → Overview. You should see yourself as an active user.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">🔥 Hotjar</h3>
              <p className="text-gray-600">
                Go to Hotjar → Recordings. Wait 5-10 minutes to see your session.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">🚀 Deployment Checklist</h2>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✅</span>
              <div>
                <p className="font-medium">Set environment variables in your hosting platform</p>
                <p className="text-sm text-gray-600">Vercel: Settings → Environment Variables</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✅</span>
              <div>
                <p className="font-medium">Deploy your website</p>
                <p className="text-sm text-gray-600">Analytics will start working immediately</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✅</span>
              <div>
                <p className="font-medium">Check real-time data</p>
                <p className="text-sm text-gray-600">Visit your live site and check analytics dashboards</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-xl">⏰</span>
              <div>
                <p className="font-medium">Wait for historical reports</p>
                <p className="text-sm text-gray-600">Takes 24-48 hours for full data to appear</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 