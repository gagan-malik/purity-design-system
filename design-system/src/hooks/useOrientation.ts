import { useState, useEffect } from 'react';

export type Orientation = 'portrait' | 'landscape';

/**
 * Hook to track device orientation
 * @returns Orientation state ('portrait' | 'landscape')
 */
export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(() => {
    if (typeof window === 'undefined') return 'portrait';
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      );
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Also use the orientation API if available
    if (window.screen?.orientation) {
      const handleScreenOrientation = () => {
        const angle = window.screen.orientation.angle;
        setOrientation(
          angle === 90 || angle === -90 ? 'landscape' : 'portrait'
        );
      };

      window.screen.orientation.addEventListener('change', handleScreenOrientation);

      return () => {
        window.removeEventListener('resize', handleOrientationChange);
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.screen.orientation.removeEventListener('change', handleScreenOrientation);
      };
    }

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
};

export default useOrientation;

