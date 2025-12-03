import { useRef, useCallback, useEffect } from 'react';
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

  const handlers = isTouch
    ? createSwipeHandlers(options)
    : createMouseSwipeHandlers(options);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use touch handlers for touch devices, mouse for others
    if (isTouch) {
      element.addEventListener('touchstart', handlers.onTouchStart as EventListener);
      element.addEventListener('touchmove', handlers.onTouchMove as EventListener);
      element.addEventListener('touchend', handlers.onTouchEnd as EventListener);

      return () => {
        element.removeEventListener('touchstart', handlers.onTouchStart as EventListener);
        element.removeEventListener('touchmove', handlers.onTouchMove as EventListener);
        element.removeEventListener('touchend', handlers.onTouchEnd as EventListener);
      };
    } else {
      element.addEventListener('mousedown', handlers.onMouseDown as EventListener);
      element.addEventListener('mousemove', handlers.onMouseMove as EventListener);
      element.addEventListener('mouseup', handlers.onMouseUp as EventListener);

      return () => {
        element.removeEventListener('mousedown', handlers.onMouseDown as EventListener);
        element.removeEventListener('mousemove', handlers.onMouseMove as EventListener);
        element.removeEventListener('mouseup', handlers.onMouseUp as EventListener);
      };
    }
  }, [isTouch, handlers]);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  return {
    ref: elementRef,
    setRef,
    swipeHandlers: isTouch
      ? {
          onTouchStart: handlers.onTouchStart,
          onTouchMove: handlers.onTouchMove,
          onTouchEnd: handlers.onTouchEnd,
        }
      : {
          onMouseDown: handlers.onMouseDown,
          onMouseMove: handlers.onMouseMove,
          onMouseUp: handlers.onMouseUp,
        },
  };
};

export default useSwipe;

