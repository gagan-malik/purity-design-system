import React from "react";
import classNames from "classnames";

export interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  header,
  sidebar,
  children,
  className,
  testId = "app-shell",
}) => {
  return (
    <div className={classNames("w-full min-h-screen bg-bg-primary text-text-primary", className)} data-testid={testId}>
      {header && <div className="sticky top-0 z-10 border-b border-border-secondary bg-bg-primary">{header}</div>}
      <div className="flex w-full">
        {sidebar && (
          <aside className="hidden md:block w-[280px] border-r border-border-secondary min-h-[calc(100vh-56px)]">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;

