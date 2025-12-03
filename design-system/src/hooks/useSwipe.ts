import { useRef, useCallback, useEffect, useMemo } from 'react';
import {
  createSwipeHandlers,
  createMouseSwipeHandlers,
  SwipeOptions,
} from '../utils/gestures';
import { useTouchDevice } from './useTouchDevice';

/**
 * Hook for swipe gesture detection
 * @param options - Swipe configuration options
 * @returns Object with swipe handlers and ref
 */
export const useSwipe = (options: SwipeOptions = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const isTouch = useTouchDevice();

  const touchHandlers = useMemo(() => createSwipeHandlers(options), [options]);
  const mouseHandlers = useMemo(() => createMouseSwipeHandlers(options), [options]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use touch handlers for touch devices, mouse for others
    if (isTouch) {
      element.addEventListener('touchstart', touchHandlers.onTouchStart);
      element.addEventListener('touchmove', touchHandlers.onTouchMove);
      element.addEventListener('touchend', touchHandlers.onTouchEnd);

      return () => {
        element.removeEventListener('touchstart', touchHandlers.onTouchStart);
        element.removeEventListener('touchmove', touchHandlers.onTouchMove);
        element.removeEventListener('touchend', touchHandlers.onTouchEnd);
      };
    } else {
      element.addEventListener('mousedown', mouseHandlers.onMouseDown);
      element.addEventListener('mousemove', mouseHandlers.onMouseMove);
      element.addEventListener('mouseup', mouseHandlers.onMouseUp);

      return () => {
        element.removeEventListener('mousedown', mouseHandlers.onMouseDown);
        element.removeEventListener('mousemove', mouseHandlers.onMouseMove);
        element.removeEventListener('mouseup', mouseHandlers.onMouseUp);
      };
    }
  }, [isTouch, touchHandlers, mouseHandlers]);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  const swipeHandlers = useMemo(
    () =>
      isTouch
        ? {
            onTouchStart: touchHandlers.onTouchStart,
            onTouchMove: touchHandlers.onTouchMove,
            onTouchEnd: touchHandlers.onTouchEnd,
          }
        : {
            onMouseDown: mouseHandlers.onMouseDown,
            onMouseMove: mouseHandlers.onMouseMove,
            onMouseUp: mouseHandlers.onMouseUp,
          },
    [isTouch, touchHandlers, mouseHandlers]
  );

  return {
    ref: elementRef,
    setRef,
    swipeHandlers,
  };
};

export default useSwipe;

