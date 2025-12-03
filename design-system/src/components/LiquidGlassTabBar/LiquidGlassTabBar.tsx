import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import classNames from "classnames";

// Constants
const POSITIONS = {
  TOP: "top",
  BOTTOM: "bottom",
} as const;

const VARIANTS = {
  DEFAULT: "default",
  COMPACT: "compact",
} as const;

const INDICATOR_TRANSITION_DURATION = 500;
const RESIZE_DEBOUNCE_DELAY = 100;

// Types
export type TabBarPosition = typeof POSITIONS[keyof typeof POSITIONS];
export type TabBarVariant = typeof VARIANTS[keyof typeof VARIANTS];

export interface LiquidGlassTabItem {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  /** Optional aria-label for accessibility. Falls back to label if not provided */
  ariaLabel?: string;
}

export interface LiquidGlassTabBarProps {
  /** Array of tab items to display */
  tabs: LiquidGlassTabItem[];
  /** Controlled active tab ID */
  activeTab?: string;
  /** Default active tab ID (uncontrolled mode) */
  defaultTab?: string;
  /** Callback fired when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Position of the tab bar */
  position?: TabBarPosition;
  /** Additional CSS classes */
  className?: string;
  /** Size variant of the tab bar */
  variant?: TabBarVariant;
  /** Test ID for testing */
  testId?: string;
}

interface IndicatorStyle {
  left: string;
  width: string;
  opacity: number;
}

/**
 * LiquidGlassTabBar - A beautiful tab bar navigation component with glassmorphism effect
 * and smooth animated indicator
 */
export const LiquidGlassTabBar: React.FC<LiquidGlassTabBarProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onTabChange,
  position = POSITIONS.BOTTOM,
  className = "",
  variant = VARIANTS.DEFAULT,
  testId = "liquid-glass-tab-bar",
}) => {
  // State
  const [internalActiveTab, setInternalActiveTab] = useState<string>(() => {
    if (defaultTab) return defaultTab;
    const firstEnabledTab = tabs.find((tab) => !tab.disabled);
    return firstEnabledTab?.id || tabs[0]?.id || "";
  });

  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: "0px",
    width: "0px",
    opacity: 0,
  });

  // Refs
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Computed values
  const activeTab = useMemo(
    () => (controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab),
    [controlledActiveTab, internalActiveTab]
  );

  const isControlled = useMemo(() => controlledActiveTab !== undefined, [controlledActiveTab]);

  // Validate tabs
  useEffect(() => {
    if (!tabs || tabs.length === 0) {
      console.warn("LiquidGlassTabBar: tabs array is empty or undefined");
    }
  }, [tabs]);

  // Update indicator position
  const updateIndicator = useCallback(() => {
    const activeTabElement = tabRefs.current.get(activeTab);
    const container = containerRef.current;

    if (!activeTabElement || !container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTabElement.getBoundingClientRect();

    const left = tabRect.left - containerRect.left;
    const width = tabRect.width;

    setIndicatorStyle({
      left: `${left}px`,
      width: `${width}px`,
      opacity: 1,
    });
  }, [activeTab]);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      updateIndicator();
    }, RESIZE_DEBOUNCE_DELAY);
  }, [updateIndicator]);

  // Effect for indicator positioning
  useEffect(() => {
    // Initial update with slight delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      updateIndicator();
    }, 0);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [activeTab, tabs, updateIndicator, handleResize]);

  // Tab click handler
  const handleTabClick = useCallback(
    (tabId: string, disabled?: boolean) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalActiveTab(tabId);
      }

      onTabChange?.(tabId);
    },
    [isControlled, onTabChange]
  );

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, tabId: string, index: number) => {
      const enabledTabs = tabs.filter((tab) => !tab.disabled);
      const currentIndex = enabledTabs.findIndex((tab) => tab.id === tabId);

      let targetIndex = currentIndex;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          targetIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          targetIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
          break;
        case "Home":
          event.preventDefault();
          targetIndex = 0;
          break;
        case "End":
          event.preventDefault();
          targetIndex = enabledTabs.length - 1;
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          handleTabClick(tabId);
          return;
        default:
          return;
      }

      const targetTab = enabledTabs[targetIndex];
      if (targetTab) {
        const targetElement = tabRefs.current.get(targetTab.id);
        targetElement?.focus();
        handleTabClick(targetTab.id, targetTab.disabled);
      }
    },
    [tabs, handleTabClick]
  );

  // Set tab ref
  const setTabRef = useCallback((tabId: string, element: HTMLButtonElement | null) => {
    if (element) {
      tabRefs.current.set(tabId, element);
    } else {
      tabRefs.current.delete(tabId);
    }
  }, []);

  // Memoized class names
  const containerClasses = useMemo(
    () =>
      classNames(
        "fixed left-1/2 transform -translate-x-1/2 z-50 rounded-full shadow-2xl transition-all duration-300",
        position === POSITIONS.TOP ? "top-0" : "bottom-0",
        variant === VARIANTS.COMPACT ? "px-3 py-2" : "px-4 py-3",
        className
      ),
    [position, variant, className]
  );

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
    }),
    []
  );

  const indicatorHeight = useMemo(
    () => (variant === VARIANTS.COMPACT ? "calc(100% - 8px)" : "calc(100% - 12px)"),
    [variant]
  );

  const indicatorTop = useMemo(
    () => (variant === VARIANTS.COMPACT ? "4px" : "6px"),
    [variant]
  );

  const tabPaddingClasses = useMemo(
    () => (variant === VARIANTS.COMPACT ? "px-4 py-2" : "px-6 py-3"),
    [variant]
  );

  // Render tab button
  const renderTab = useCallback(
    (tab: LiquidGlassTabItem, index: number) => {
      const isActive = activeTab === tab.id;
      const isDisabled = tab.disabled ?? false;
      const ariaLabel = tab.ariaLabel || tab.label;

      const tabClasses = classNames(
        "relative rounded-full font-semibold text-sm transition-all duration-300",
        "flex items-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        tabPaddingClasses,
        {
          "text-text-primary": isActive,
          "text-text-disabled cursor-not-allowed": isDisabled,
          "text-text-quaternary hover:text-text-secondary": !isActive && !isDisabled,
          "hover:bg-bg-primary_hover/30": !isDisabled && !isActive,
        }
      );

      const dotPosition = position === POSITIONS.TOP ? "-bottom-1" : "-top-1";

      return (
        <button
          key={tab.id}
          ref={(el) => setTabRef(tab.id, el)}
          onClick={() => handleTabClick(tab.id, isDisabled)}
          onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
          disabled={isDisabled}
          role="tab"
          aria-selected={isActive}
          aria-label={ariaLabel}
          aria-controls={`tabpanel-${tab.id}`}
          tabIndex={isActive && !isDisabled ? 0 : isDisabled ? -1 : -1}
          className={tabClasses}
          data-testid={`tab-${tab.id}`}
        >
          {/* Icon */}
          {tab.icon && (
            <span className="flex items-center justify-center" aria-hidden="true">
              {typeof tab.icon === "string" ? (
                <img src={tab.icon} alt="" className="w-5 h-5" role="presentation" />
              ) : (
                tab.icon
              )}
            </span>
          )}

          {/* Label */}
          <span>{tab.label}</span>

          {/* Active indicator dot */}
          {isActive && (
            <span
              className={classNames(
                "absolute left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-500 transition-all duration-300",
                dotPosition
              )}
              style={{
                boxShadow: "0 0 8px rgba(59, 130, 246, 0.8)",
              }}
              aria-hidden="true"
            />
          )}
        </button>
      );
    },
    [
      activeTab,
      position,
      tabPaddingClasses,
      handleTabClick,
      handleKeyDown,
      setTabRef,
    ]
  );

  // Early return if no tabs
  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <nav
      ref={containerRef}
      className={containerClasses}
      style={containerStyle}
      role="tablist"
      aria-label="Tab navigation"
      data-testid={testId}
    >
      <div className="relative flex items-center gap-2">
        {/* Liquid indicator background */}
        <div
          className="absolute h-full bg-bg-secondary/40 rounded-full pointer-events-none"
          style={{
            ...indicatorStyle,
            height: indicatorHeight,
            top: indicatorTop,
            borderRadius: "9999px",
            backdropFilter: "blur(10px)",
            boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: `left ${INDICATOR_TRANSITION_DURATION}ms ease-out, width ${INDICATOR_TRANSITION_DURATION}ms ease-out, opacity ${INDICATOR_TRANSITION_DURATION}ms ease-out`,
          }}
          aria-hidden="true"
        />

        {/* Tabs */}
        {tabs.map((tab, index) => renderTab(tab, index))}
      </div>
    </nav>
  );
};

export default LiquidGlassTabBar;
