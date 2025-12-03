import { useState, useEffect } from 'react';
import {
  getCurrentBreakpoint,
  getViewportWidth,
  getViewportHeight,
  isMobileViewport,
  isTouchDevice,
  Breakpoint,
} from '../utils/mobile';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: Breakpoint;
  width: number;
  height: number;
  isTouch: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
}

/**
 * Comprehensive responsive hook that provides all viewport information
 * @param mobileBreakpoint - Breakpoint to consider mobile (default: 'md')
 * @returns ResponsiveState object with all responsive information
 */
export const useResponsive = (mobileBreakpoint: Breakpoint = 'md'): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    const width = getViewportWidth();
    const height = getViewportHeight();
    const breakpoint = getCurrentBreakpoint();
    const isMobile = isMobileViewport(mobileBreakpoint);
    
    return {
      isMobile,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      breakpoint,
      width,
      height,
      isTouch: isTouchDevice(),
      isLandscape: width > height,
      isPortrait: width <= height,
    };
  });

  useEffect(() => {
    const updateState = () => {
      const width = getViewportWidth();
      const height = getViewportHeight();
      const breakpoint = getCurrentBreakpoint();
      const isMobile = isMobileViewport(mobileBreakpoint);

      setState({
        isMobile,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        breakpoint,
        width,
        height,
        isTouch: isTouchDevice(),
        isLandscape: width > height,
        isPortrait: width <= height,
      });
    };

    updateState();

    window.addEventListener('resize', updateState);
    window.addEventListener('orientationchange', updateState);

    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('orientationchange', updateState);
    };
  }, [mobileBreakpoint]);

  return state;
};

export default useResponsive;

