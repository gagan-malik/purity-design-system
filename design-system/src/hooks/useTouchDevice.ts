import { useState, useEffect } from 'react';
import { isTouchDevice } from '../utils/mobile';

/**
 * Hook to detect if the device supports touch
 * @returns boolean indicating if device is touch-enabled
 */
export const useTouchDevice = (): boolean => {
  const [touchDevice, setTouchDevice] = useState(() => isTouchDevice());

  useEffect(() => {
    setTouchDevice(isTouchDevice());
  }, []);

  return touchDevice;
};

export default useTouchDevice;

