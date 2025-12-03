/**
 * Mobile utilities and constants
 * Provides device detection, breakpoints, and mobile-specific helpers
 */

// Breakpoint constants matching Tailwind config
export const MOBILE_BREAKPOINTS = {
  mobile: 320,
  'mobile-lg': 414,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof MOBILE_BREAKPOINTS;

/**
 * Detects if the current viewport is mobile-sized
 * @param breakpoint - Breakpoint to check against (default: 'md')
 * @returns boolean
 */
export const isMobileViewport = (breakpoint: Breakpoint = 'md'): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINTS[breakpoint];
};

/**
 * Detects if the device is a touch device
 * @returns boolean
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
};

/**
 * Gets the current viewport width
 * @returns number
 */
export const getViewportWidth = (): number => {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth;
};

/**
 * Gets the current viewport height
 * @returns number
 */
export const getViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  return window.innerHeight;
};

/**
 * Gets the current breakpoint based on viewport width
 * @returns Breakpoint name
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'mobile';
  
  const width = window.innerWidth;
  
  if (width >= MOBILE_BREAKPOINTS['2xl']) return '2xl';
  if (width >= MOBILE_BREAKPOINTS.xl) return 'xl';
  if (width >= MOBILE_BREAKPOINTS.lg) return 'lg';
  if (width >= MOBILE_BREAKPOINTS.md) return 'md';
  if (width >= MOBILE_BREAKPOINTS.sm) return 'sm';
  if (width >= MOBILE_BREAKPOINTS['mobile-lg']) return 'mobile-lg';
  return 'mobile';
};

/**
 * Checks if device is in landscape orientation
 * @returns boolean
 */
export const isLandscape = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > window.innerHeight;
};

/**
 * Checks if device is in portrait orientation
 * @returns boolean
 */
export const isPortrait = (): boolean => {
  return !isLandscape();
};

/**
 * Gets safe area insets (for devices with notches)
 * Returns fallback values if not available
 */
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0', 10),
    bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0', 10),
    left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0', 10),
    right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0', 10),
  };
};

/**
 * Minimum touch target size (Apple HIG recommendation)
 */
export const MIN_TOUCH_TARGET = 44; // pixels

/**
 * Comfortable touch target size
 */
export const COMFORTABLE_TOUCH_TARGET = 48; // pixels

