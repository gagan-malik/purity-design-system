import { useState, useEffect } from 'react';
import { getSafeAreaInsets } from '../utils/mobile';

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Hook to get safe area insets for devices with notches/rounded corners
 * @returns SafeAreaInsets object
 */
export const useSafeArea = (): SafeAreaInsets => {
  const [insets, setInsets] = useState<SafeAreaInsets>(() => getSafeAreaInsets());

  useEffect(() => {
    const updateInsets = () => {
      setInsets(getSafeAreaInsets());
    };

    // Update on resize/orientation change
    window.addEventListener('resize', updateInsets);
    window.addEventListener('orientationchange', updateInsets);

    // Initial update
    updateInsets();

    return () => {
      window.removeEventListener('resize', updateInsets);
      window.removeEventListener('orientationchange', updateInsets);
    };
  }, []);

  return insets;
};

export default useSafeArea;

