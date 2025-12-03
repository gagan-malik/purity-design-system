/**
 * Gesture utilities for touch interactions
 * Provides swipe, pinch, and long-press detection
 */

export interface SwipeDirection {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export interface SwipeData {
  direction: SwipeDirection;
  distance: number;
  velocity: number;
  deltaX: number;
  deltaY: number;
}

export interface SwipeOptions {
  threshold?: number; // Minimum distance in pixels to trigger swipe
  velocityThreshold?: number; // Minimum velocity to trigger swipe
  onSwipe?: (data: SwipeData) => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  preventDefault?: boolean;
}

export interface LongPressOptions {
  threshold?: number; // Time in milliseconds
  onLongPress?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
}

/**
 * Detects swipe direction from delta values
 */
export const getSwipeDirection = (
  deltaX: number,
  deltaY: number,
  threshold: number = 10
): SwipeDirection => {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (absX < threshold && absY < threshold) {
    return { up: false, down: false, left: false, right: false };
  }

  if (absX > absY) {
    return {
      up: false,
      down: false,
      left: deltaX < 0,
      right: deltaX > 0,
    };
  } else {
    return {
      up: deltaY < 0,
      down: deltaY > 0,
      left: false,
      right: false,
    };
  }
};

/**
 * Calculates velocity from distance and time
 */
export const calculateVelocity = (
  distance: number,
  time: number
): number => {
  if (time === 0) return 0;
  return Math.abs(distance / time);
};

/**
 * Creates touch event handlers for swipe detection
 */
export const createSwipeHandlers = (options: SwipeOptions = {}) => {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    onSwipe,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    preventDefault = false,
  } = options;

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let isTracking = false;

  const handleTouchStart = (e: TouchEvent) => {
    if (preventDefault) e.preventDefault();
    
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
    isTracking = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (preventDefault) e.preventDefault();
    if (!isTracking) return;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (preventDefault) e.preventDefault();
    if (!isTracking) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const time = Date.now() - startTime;
    const velocity = calculateVelocity(distance, time);

    isTracking = false;

    if (distance < threshold && velocity < velocityThreshold) {
      return; // Not a swipe
    }

    const direction = getSwipeDirection(deltaX, deltaY);
    const swipeData: SwipeData = {
      direction,
      distance,
      velocity,
      deltaX,
      deltaY,
    };

    onSwipe?.(swipeData);

    if (direction.up) onSwipeUp?.();
    if (direction.down) onSwipeDown?.();
    if (direction.left) onSwipeLeft?.();
    if (direction.right) onSwipeRight?.();
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};

/**
 * Creates mouse event handlers for swipe detection (for desktop testing)
 */
export const createMouseSwipeHandlers = (options: SwipeOptions = {}) => {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    onSwipe,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    preventDefault = false,
  } = options;

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let isTracking = false;

  const handleMouseDown = (e: MouseEvent) => {
    if (preventDefault) e.preventDefault();
    
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    isTracking = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (preventDefault) e.preventDefault();
    if (!isTracking) return;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (preventDefault) e.preventDefault();
    if (!isTracking) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const time = Date.now() - startTime;
    const velocity = calculateVelocity(distance, time);

    isTracking = false;

    if (distance < threshold && velocity < velocityThreshold) {
      return; // Not a swipe
    }

    const direction = getSwipeDirection(deltaX, deltaY);
    const swipeData: SwipeData = {
      direction,
      distance,
      velocity,
      deltaX,
      deltaY,
    };

    onSwipe?.(swipeData);

    if (direction.up) onSwipeUp?.();
    if (direction.down) onSwipeDown?.();
    if (direction.left) onSwipeLeft?.();
    if (direction.right) onSwipeRight?.();
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
  };
};

