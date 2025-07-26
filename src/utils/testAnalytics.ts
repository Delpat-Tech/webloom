// Test utility to verify analytics is working
export const testAnalytics = () => {
  console.log('🔍 Testing Analytics Setup...');
  
  // Check if environment variables are set
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
  
  console.log('📊 Google Analytics ID:', gaId ? '✅ Set' : '❌ Missing');
  console.log('🔥 Hotjar ID:', hotjarId ? '✅ Set' : '❌ Missing');
  
  // Check if gtag is available (Google Analytics)
  if (typeof window !== 'undefined') {
    console.log('🌐 Window object:', '✅ Available');
    
    if (window.gtag) {
      console.log('📈 Google Analytics (gtag):', '✅ Loaded');
    } else {
      console.log('📈 Google Analytics (gtag):', '❌ Not loaded');
    }
    
    if ((window as any).hj) {
      console.log('🔥 Hotjar:', '✅ Loaded');
    } else {
      console.log('🔥 Hotjar:', '❌ Not loaded');
    }
  }
  
  console.log('🎯 Analytics Test Complete!');
  console.log('💡 If you see ❌ marks, check your .env.local file');
};

// Function to manually trigger test events
export const triggerTestEvents = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('🧪 Triggering test analytics events...');
    
    // Test page view
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_title: 'Test Page',
      page_location: window.location.href,
    });
    
    // Test custom event
    window.gtag('event', 'test_event', {
      event_category: 'testing',
      event_label: 'analytics_setup_test',
    });
    
    console.log('✅ Test events triggered! Check Google Analytics Realtime reports.');
  }
}; 