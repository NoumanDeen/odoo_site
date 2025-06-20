// Performance optimization utilities

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
}

// Lazy load images with intersection observer
export function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Optimize font loading
export function optimizeFontLoading() {
  if ('fonts' in document) {
    // Preload critical fonts
    const criticalFonts = [
      'Inter',
      'Noto Sans Arabic'
    ];
    
    criticalFonts.forEach(fontFamily => {
      document.fonts.load(`400 16px ${fontFamily}`);
      document.fonts.load(`600 16px ${fontFamily}`);
    });
  }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Critical resource hints
export function addResourceHints() {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if ('crossorigin' in hint) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Measure and report performance metrics
export function measurePerformance() {
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Measure Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Measure First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    
    // Measure Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}

// Pagination utilities
export function createPagination(totalItems: number, itemsPerPage: number, currentPage: number = 0) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages - 1;
  const hasPrevPage = currentPage > 0;
  
  return {
    totalPages,
    currentPage,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? currentPage + 1 : null,
    prevPage: hasPrevPage ? currentPage - 1 : null,
    startItem: currentPage * itemsPerPage,
    endItem: Math.min((currentPage + 1) * itemsPerPage - 1, totalItems - 1),
    totalItems
  };
}

// Image optimization utilities
export function getOptimizedImageUrl(url: string, width: number = 800) {
  // For external images like Pexels, we can't modify the URL
  if (url.startsWith('https://images.pexels.com')) {
    return url;
  }
  
  // For local images, we could implement resizing logic here
  // This is a placeholder for future implementation
  return url;
}

// Detect slow connections and adjust loading strategy
export function detectSlowConnection() {
  const connection = (navigator as any).connection;
  
  if (connection) {
    const isSlowConnection = connection.effectiveType === '2g' || 
                            connection.effectiveType === 'slow-2g' ||
                            connection.saveData === true;
    
    return isSlowConnection;
  }
  
  return false; // Default to assuming fast connection if API not available
}