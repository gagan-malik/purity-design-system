import { useRef, useCallback, useEffect } from 'react';
import { LongPressOptions } from '../utils/gestures';
import { useTouchDevice } from './useTouchDevice';

/**
 * Hook for long press gesture detection
 * @param options - Long press configuration options
 * @returns Object with long press handlers
 */
export const useLongPress = (options: LongPressOptions = {}) => {
  const {
    threshold = 500, // 500ms default
    onLongPress,
    onStart,
    onEnd,
  } = options;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);
  const isTouch = useTouchDevice();

  const start = useCallback(() => {
    isLongPressRef.current = false;
    onStart?.();

    timeoutRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress?.();
    }, threshold);
  }, [threshold, onLongPress, onStart]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onEnd?.();
  }, [onEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    handlers: isTouch
      ? {
          onTouchStart: start,
          onTouchEnd: clear,
          onTouchCancel: clear,
        }
      : {
          onMouseDown: start,
          onMouseUp: clear,
          onMouseLeave: clear,
        },
    isLongPress: () => isLongPressRef.current,
  };
};

export default useLongPress;

