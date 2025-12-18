import React from "react";
import classNames from "classnames";

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  defaultExpandedIds?: string[];
  className?: string;
  testId?: string;
}

export const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  className,
  testId = "tree-view",
}) => {
  const [expanded, setExpanded] = React.useState<Set<string>>(() => new Set(defaultExpandedIds));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (n: TreeNode, depth: number) => {
    const hasChildren = !!(n.children && n.children.length);
    const isExpanded = expanded.has(n.id);
    const isSelected = n.id === selectedId;

    return (
      <div key={n.id}>
        <div
          className={classNames(
            "flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm",
            isSelected ? "bg-bg-secondary text-text-primary" : "text-text-primary hover:bg-bg-secondary",
            n.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
          )}
          style={{ paddingLeft: 8 + depth * 14 }}
          role="treeitem"
          aria-selected={isSelected}
          aria-expanded={hasChildren ? isExpanded : undefined}
          tabIndex={0}
          onClick={() => {
            if (n.disabled) return;
            onSelect?.(n.id);
            if (hasChildren) toggle(n.id);
          }}
          onKeyDown={(e) => {
            if (n.disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect?.(n.id);
              if (hasChildren) toggle(n.id);
            } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
              e.preventDefault();
              toggle(n.id);
            } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
              e.preventDefault();
              toggle(n.id);
            }
          }}
        >
          {hasChildren ? (
            <span className="text-xs w-4 text-center" aria-hidden="true">
              {isExpanded ? "▾" : "▸"}
            </span>
          ) : (
            <span className="w-4" aria-hidden="true" />
          )}
          <span className="truncate">{n.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div role="group">
            {n.children!.map((c) => renderNode(c, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-3", className)}
      role="tree"
      data-testid={testId}
    >
      <div className="space-y-1">{nodes.map((n) => renderNode(n, 0))}</div>
    </div>
  );
};

export default TreeView;

