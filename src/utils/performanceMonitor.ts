interface PerformanceMetrics {
  fps: number;
  scrollLatency: number;
  memoryUsage?: number;
  isMobile: boolean;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private scrollStartTime = 0;
  private scrollLatency = 0;
  private isMonitoring = false;
  private rafId: number | null = null;

  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitorFPS();
    this.monitorScroll();
  }

  stopMonitoring() {
    this.isMonitoring = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private monitorFPS() {
    const measureFPS = () => {
      this.frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        // Log performance issues
        if (this.fps < 30) {
          console.warn(`Low FPS detected: ${this.fps} FPS`);
        }
      }
      
      if (this.isMonitoring) {
        this.rafId = requestAnimationFrame(measureFPS);
      }
    };
    
    this.rafId = requestAnimationFrame(measureFPS);
  }

  private monitorScroll() {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      this.scrollStartTime = performance.now();
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.scrollLatency = performance.now() - this.scrollStartTime;
        
        // Log scroll performance issues
        if (this.scrollLatency > 16) { // 60fps = 16.67ms per frame
          console.warn(`Slow scroll detected: ${this.scrollLatency.toFixed(2)}ms latency`);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
  }

  getMetrics(): PerformanceMetrics {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    return {
      fps: this.fps,
      scrollLatency: this.scrollLatency,
      memoryUsage: (performance as any).memory?.usedJSHeapSize,
      isMobile,
    };
  }

  // Utility to check if device is low-end
  isLowEndDevice(): boolean {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const memory = (performance as any).memory?.totalJSHeapSize;
    const cores = navigator.hardwareConcurrency || 1;
    
    return isMobile && (memory < 50 * 1024 * 1024 || cores < 4); // Less than 50MB or less than 4 cores
  }

  // Utility to suggest optimizations
  getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];
    const metrics = this.getMetrics();
    
    if (metrics.fps < 30) {
      suggestions.push('Consider reducing animation complexity');
      suggestions.push('Disable heavy WebGL effects on mobile');
    }
    
    if (metrics.scrollLatency > 16) {
      suggestions.push('Optimize scroll event handlers');
      suggestions.push('Use passive event listeners');
    }
    
    if (this.isLowEndDevice()) {
      suggestions.push('Disable non-essential animations');
      suggestions.push('Reduce image quality for mobile');
    }
    
    return suggestions;
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Development-only performance logging
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.startMonitoring();
  
  // Log performance metrics every 5 seconds
  setInterval(() => {
    const metrics = performanceMonitor.getMetrics();
    console.log('Performance Metrics:', metrics);
    
    const suggestions = performanceMonitor.getOptimizationSuggestions();
    if (suggestions.length > 0) {
      console.log('Optimization Suggestions:', suggestions);
    }
  }, 5000);
}

export default PerformanceMonitor; 