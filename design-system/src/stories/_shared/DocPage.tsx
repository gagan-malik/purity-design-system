import React from "react";
import classNames from "classnames";

export function DocPage({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("space-y-6 max-w-5xl", className)}>
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-text-primary">{title}</h1>
        {subtitle ? <p className="text-text-tertiary">{subtitle}</p> : null}
      </header>
      {children}
    </div>
  );
}

export function Section({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={classNames("rounded-3xl border border-border-secondary bg-bg-primary p-5 space-y-3", className)}>
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        {description ? <div className="text-sm text-text-tertiary">{description}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function SpecTable({
  rows,
}: {
  rows: Array<{ key: string; value: React.ReactNode }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-secondary">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-border-secondary first:border-t-0">
              <td className="w-[180px] px-4 py-3 font-medium text-text-primary align-top">{r.key}</td>
              <td className="px-4 py-3 text-text-tertiary">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DoDont({
  doItems,
  dontItems,
}: {
  doItems: React.ReactNode[];
  dontItems: React.ReactNode[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-border-secondary bg-bg-primary p-4 space-y-2">
        <div className="text-xs font-semibold text-text-primary">Do</div>
        <ul className="list-disc pl-5 text-sm text-text-tertiary space-y-1">
          {doItems.map((x, idx) => (
            <li key={idx}>{x}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-border-secondary bg-bg-primary p-4 space-y-2">
        <div className="text-xs font-semibold text-text-primary">Don’t</div>
        <ul className="list-disc pl-5 text-sm text-text-tertiary space-y-1">
          {dontItems.map((x, idx) => (
            <li key={idx}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-auto rounded-2xl border border-border-secondary bg-bg-secondary p-4 text-xs text-text-primary">
      <code>{children}</code>
    </pre>
  );
}

