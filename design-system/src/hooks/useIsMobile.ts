import { useState, useEffect } from 'react';
import { isMobileViewport, Breakpoint } from '../utils/mobile';

/**
 * Hook to detect if current viewport is mobile-sized
 * @param breakpoint - Breakpoint to check against (default: 'md')
 * @returns boolean indicating if viewport is mobile
 */
export const useIsMobile = (breakpoint: Breakpoint = 'md'): boolean => {
  const [isMobile, setIsMobile] = useState(() => isMobileViewport(breakpoint));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileViewport(breakpoint));
    };

    // Set initial value
    setIsMobile(isMobileViewport(breakpoint));

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;

