import React from "react";
import classNames from "classnames";

export interface DualListOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface DualListboxProps {
  options: DualListOption[];
  value: string[]; // selected IDs (right side)
  onChange: (value: string[]) => void;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
  testId?: string;
}

export const DualListbox: React.FC<DualListboxProps> = ({
  options,
  value,
  onChange,
  leftLabel = "Available",
  rightLabel = "Selected",
  className,
  testId = "dual-listbox",
}) => {
  const [leftQuery, setLeftQuery] = React.useState("");
  const [rightQuery, setRightQuery] = React.useState("");
  const [leftSelected, setLeftSelected] = React.useState<Set<string>>(new Set());
  const [rightSelected, setRightSelected] = React.useState<Set<string>>(new Set());

  const selectedSet = new Set(value);
  const left = options.filter((o) => !selectedSet.has(o.id));
  const right = options.filter((o) => selectedSet.has(o.id));

  const filter = (list: DualListOption[], q: string) => {
    const qq = q.trim().toLowerCase();
    if (!qq) return list;
    return list.filter((o) => o.label.toLowerCase().includes(qq));
  };

  const moveRight = () => {
    const ids = Array.from(leftSelected);
    onChange([...value, ...ids].filter((id, idx, arr) => arr.indexOf(id) === idx));
    setLeftSelected(new Set());
  };
  const moveLeft = () => {
    const ids = new Set(rightSelected);
    onChange(value.filter((id) => !ids.has(id)));
    setRightSelected(new Set());
  };

  const List = ({
    label,
    items,
    query,
    setQuery,
    selected,
    setSelected,
  }: {
    label: string;
    items: DualListOption[];
    query: string;
    setQuery: (v: string) => void;
    selected: Set<string>;
    setSelected: (s: Set<string>) => void;
  }) => (
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-text-primary mb-2">{label}</div>
      <input
        className="w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand"
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-2 max-h-64 overflow-auto rounded-2xl border border-border-secondary bg-bg-primary">
        {items.length === 0 ? (
          <div className="px-3 py-2 text-sm text-text-tertiary">No items</div>
        ) : (
          items.map((o) => {
            const isSelected = selected.has(o.id);
            return (
              <button
                key={o.id}
                type="button"
                disabled={o.disabled}
                className={classNames(
                  "w-full text-left px-3 py-2 text-sm border-b border-border-secondary",
                  isSelected ? "bg-bg-secondary" : "hover:bg-bg-secondary",
                  o.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                )}
                onClick={() => {
                  if (o.disabled) return;
                  const next = new Set(selected);
                  if (next.has(o.id)) next.delete(o.id);
                  else next.add(o.id);
                  setSelected(next);
                }}
              >
                {o.label}
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  const leftFiltered = filter(left, leftQuery);
  const rightFiltered = filter(right, rightQuery);

  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-4", className)} data-testid={testId}>
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <List
          label={leftLabel}
          items={leftFiltered}
          query={leftQuery}
          setQuery={setLeftQuery}
          selected={leftSelected}
          setSelected={setLeftSelected}
        />
        <div className="flex md:flex-col gap-2 justify-center items-center">
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-semibold border border-border-secondary bg-bg-secondary hover:bg-bg-active"
            onClick={moveRight}
            disabled={leftSelected.size === 0}
          >
            →
          </button>
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-semibold border border-border-secondary bg-bg-secondary hover:bg-bg-active"
            onClick={moveLeft}
            disabled={rightSelected.size === 0}
          >
            ←
          </button>
        </div>
        <List
          label={rightLabel}
          items={rightFiltered}
          query={rightQuery}
          setQuery={setRightQuery}
          selected={rightSelected}
          setSelected={setRightSelected}
        />
      </div>
    </div>
  );
};

export default DualListbox;

