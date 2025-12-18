import React from "react";

export interface UsageGuidelinesProps {
  whenToUse?: string[];
  whenNotToUse?: string[];
  commonMistakes?: string[];
  alternatives?: string[];
  className?: string;
}

export const UsageGuidelines: React.FC<UsageGuidelinesProps> = ({
  whenToUse = [],
  whenNotToUse = [],
  commonMistakes = [],
  alternatives = [],
  className = "",
}) => {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {whenToUse.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 12,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>✅</span>
            When to Use
          </h3>
          <ul
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              lineHeight: 1.8,
              paddingLeft: 20,
              margin: 0,
            }}
          >
            {whenToUse.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {whenNotToUse.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 12,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>❌</span>
            When Not to Use
          </h3>
          <ul
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              lineHeight: 1.8,
              paddingLeft: 20,
              margin: 0,
            }}
          >
            {whenNotToUse.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {commonMistakes.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 12,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>⚠️</span>
            Common Mistakes
          </h3>
          <ul
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              lineHeight: 1.8,
              paddingLeft: 20,
              margin: 0,
            }}
          >
            {commonMistakes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {alternatives.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 12,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>🔄</span>
            Alternatives
          </h3>
          <ul
            style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              lineHeight: 1.8,
              paddingLeft: 20,
              margin: 0,
            }}
          >
            {alternatives.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
