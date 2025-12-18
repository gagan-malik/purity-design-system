import React from "react";
import classNames from "classnames";

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Visual variant
   */
  variant?: "default" | "outline";
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
  /**
   * Render as a different element or component
   */
  asChild?: boolean;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, variant = "default", size = "md", asChild, className, ...props }, ref) => {
    const variantClasses = {
      default: "",
      outline: "border border-border rounded-md",
    };

    const sizeClasses = {
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    };

    const Component = asChild ? React.Fragment : "div";

    if (asChild) {
      return <>{children}</>;
    }

    return (
      <div
        ref={ref}
        className={classNames(
          "flex items-center gap-3",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Item.displayName = "Item";

export interface ItemMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "icon" | "avatar" | "image" | "default";
}

export const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    const variantClasses = {
      icon: "flex-shrink-0",
      avatar: "flex-shrink-0",
      image: "flex-shrink-0",
      default: "flex-shrink-0",
    };

    return (
      <div
        ref={ref}
        className={classNames(variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemMedia.displayName = "ItemMedia";

export interface ItemContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ItemContent = React.forwardRef<HTMLDivElement, ItemContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("flex-1 min-w-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemContent.displayName = "ItemContent";

export interface ItemTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const ItemTitle = React.forwardRef<HTMLHeadingElement, ItemTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={classNames("text-sm font-medium text-foreground", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

ItemTitle.displayName = "ItemTitle";

export interface ItemDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  ItemDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={classNames("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});

ItemDescription.displayName = "ItemDescription";

export interface ItemActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ItemActions = React.forwardRef<HTMLDivElement, ItemActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("flex items-center gap-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemActions.displayName = "ItemActions";

export interface ItemGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ItemGroup = React.forwardRef<HTMLDivElement, ItemGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("flex flex-col gap-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ItemGroup.displayName = "ItemGroup";

export interface ItemSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export const ItemSeparator = React.forwardRef<
  HTMLHRElement,
  ItemSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <hr
      ref={ref}
      className={classNames("border-t border-border my-1", className)}
      {...props}
    />
  );
});

ItemSeparator.displayName = "ItemSeparator";
