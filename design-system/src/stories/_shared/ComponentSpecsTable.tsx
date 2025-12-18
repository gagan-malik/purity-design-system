import React from "react";

export interface TokenSpec {
  name: string;
  cssVariable: string;
  value?: string;
  description?: string;
  usage?: string;
}

export interface ComponentSpecsTableProps {
  tokens: TokenSpec[];
  title?: string;
  className?: string;
}

export const ComponentSpecsTable: React.FC<ComponentSpecsTableProps> = ({
  tokens,
  title = "Token Reference",
  className = "",
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          {title}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          CSS variables and tokens used by this component. Click on any token to copy its CSS variable name.
        </p>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid var(--border-secondary)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border-secondary)",
                }}
              >
                Token Name
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border-secondary)",
                }}
              >
                CSS Variable
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border-secondary)",
                }}
              >
                Value
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border-secondary)",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border-secondary)",
                }}
              >
                Usage
              </th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-brand-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)";
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    borderBottom: "1px solid var(--border-secondary)",
                  }}
                >
                  {token.name}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 13,
                    fontFamily: "monospace",
                    color: "var(--text-primary)",
                    borderBottom: "1px solid var(--border-secondary)",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => copyToClipboard(token.cssVariable, index)}
                  title="Click to copy"
                >
                  <code
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      padding: "2px 6px",
                      borderRadius: 4,
                      display: "inline-block",
                    }}
                  >
                    {token.cssVariable}
                  </code>
                  {copiedIndex === index && (
                    <span
                      style={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 11,
                        color: "var(--text-brand-primary)",
                        backgroundColor: "var(--bg-brand-primary)",
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      Copied!
                    </span>
                  )}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    borderBottom: "1px solid var(--border-secondary)",
                    fontFamily: "monospace",
                  }}
                >
                  {token.value || "—"}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    borderBottom: "1px solid var(--border-secondary)",
                  }}
                >
                  {token.description || "—"}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    borderBottom: "1px solid var(--border-secondary)",
                  }}
                >
                  {token.usage || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 12, color: "var(--text-tertiary)" }}>
        💡 <strong>Tip:</strong> Click on any CSS variable to copy it to your clipboard. Use these tokens in your CSS or Tailwind classes for consistent styling.
      </div>
    </div>
  );
};
