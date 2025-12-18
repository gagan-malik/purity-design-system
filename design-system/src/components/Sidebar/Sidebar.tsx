import React from "react";
import classNames from "classnames";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Sidebar variant
   */
  variant?: "default" | "inset";
  /**
   * Sidebar width
   */
  width?: number | string;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, variant = "default", width = 240, className, ...props }, ref) => {
    const variantClasses = {
      default: "bg-background",
      inset: "bg-muted",
    };

    return (
      <div
        ref={ref}
        className={classNames(
          "flex flex-col h-full border-r border-border",
          variantClasses[variant],
          className
        )}
        style={{ width: typeof width === "number" ? `${width}px` : width }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

export interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  SidebarHeaderProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("p-4 border-b border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarHeader.displayName = "SidebarHeader";

export interface SidebarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  SidebarContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("flex-1 overflow-y-auto p-2", className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContent.displayName = "SidebarContent";

export interface SidebarFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  SidebarFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("p-4 border-t border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarFooter.displayName = "SidebarFooter";

export interface SidebarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label?: string;
}

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  SidebarGroupProps
>(({ children, label, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("mb-4", className)}
      {...props}
    >
      {label && (
        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
          {label}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
});

SidebarGroup.displayName = "SidebarGroup";

export interface SidebarMenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}

export const SidebarMenuItem = React.forwardRef<
  HTMLAnchorElement,
  SidebarMenuItemProps
>(({ children, active, icon, className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={classNames(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-muted",
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </a>
  );
});

SidebarMenuItem.displayName = "SidebarMenuItem";
