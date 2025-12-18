import React from "react";
import classNames from "classnames";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Orientation of the field
   */
  orientation?: "vertical" | "horizontal" | "responsive";
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ children, orientation = "vertical", className, ...props }, ref) => {
    const orientationClasses = {
      vertical: "flex flex-col gap-2",
      horizontal: "flex flex-row items-center gap-4",
      responsive: "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4",
    };

    return (
      <div
        ref={ref}
        className={classNames(orientationClasses[orientation], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Field.displayName = "Field";

export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={classNames(
          "text-sm font-medium text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

FieldLabel.displayName = "FieldLabel";

export interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={classNames(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

FieldDescription.displayName = "FieldDescription";

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  FieldErrorProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={classNames("text-sm text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});

FieldError.displayName = "FieldError";

export interface FieldContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FieldContent = React.forwardRef<HTMLDivElement, FieldContentProps>(
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

FieldContent.displayName = "FieldContent";

export interface FieldSetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode;
}

export const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={classNames("space-y-4", className)}
        {...props}
      >
        {children}
      </fieldset>
    );
  }
);

FieldSet.displayName = "FieldSet";

export interface FieldLegendProps
  extends React.HTMLAttributes<HTMLLegendElement> {
  children: React.ReactNode;
  variant?: "default" | "label";
}

export const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  FieldLegendProps
>(({ children, variant = "default", className, ...props }, ref) => {
  return (
    <legend
      ref={ref}
      className={classNames(
        variant === "label"
          ? "text-sm font-medium text-foreground"
          : "text-base font-semibold text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </legend>
  );
});

FieldLegend.displayName = "FieldLegend";

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("space-y-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FieldGroup.displayName = "FieldGroup";

export interface FieldSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export const FieldSeparator = React.forwardRef<
  HTMLHRElement,
  FieldSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <hr
      ref={ref}
      className={classNames("border-t border-border", className)}
      {...props}
    />
  );
});

FieldSeparator.displayName = "FieldSeparator";

export interface FieldTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const FieldTitle = React.forwardRef<HTMLHeadingElement, FieldTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={classNames("text-sm font-semibold text-foreground", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

FieldTitle.displayName = "FieldTitle";
