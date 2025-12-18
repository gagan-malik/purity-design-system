import React from "react";

export interface DesignSpecsProps {
  component: string;
  dimensions?: {
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    width?: string;
    height?: string;
  };
  spacing?: {
    padding?: string;
    margin?: string;
    gap?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    fontFamily?: string;
  };
  colors?: {
    background?: string;
    text?: string;
    border?: string;
    hover?: {
      background?: string;
      text?: string;
      border?: string;
    };
    active?: {
      background?: string;
      text?: string;
      border?: string;
    };
    disabled?: {
      background?: string;
      text?: string;
      border?: string;
    };
    error?: {
      background?: string;
      text?: string;
      border?: string;
    };
  };
  states?: Array<{
    name: string;
    description?: string;
    visual?: React.ReactNode;
  }>;
  className?: string;
}

export const DesignSpecs: React.FC<DesignSpecsProps> = ({
  component,
  dimensions,
  spacing,
  typography,
  colors,
  states,
  className = "",
}) => {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
          Design Specifications: {component}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Visual design specifications for the {component} component. Use these measurements and tokens when designing with this component.
        </p>
      </div>

      {/* Dimensions */}
      {dimensions && (
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Dimensions
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {dimensions.width && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Width</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {dimensions.width}
                </div>
              </div>
            )}
            {dimensions.height && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Height</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {dimensions.height}
                </div>
              </div>
            )}
            {dimensions.minWidth && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Min Width</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {dimensions.minWidth}
                </div>
              </div>
            )}
            {dimensions.maxWidth && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Max Width</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {dimensions.maxWidth}
                </div>
              </div>
            )}
            {dimensions.minHeight && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Min Height</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {dimensions.minHeight}
                </div>
              </div>
            )}
            {dimensions.maxHeight && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Max Height</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {dimensions.maxHeight}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spacing */}
      {spacing && (
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Spacing
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {spacing.padding && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Padding</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {spacing.padding}
                </div>
              </div>
            )}
            {spacing.margin && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Margin</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {spacing.margin}
                </div>
              </div>
            )}
            {spacing.gap && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Gap</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {spacing.gap}
                </div>
              </div>
            )}
            {(spacing.paddingTop || spacing.paddingBottom || spacing.paddingLeft || spacing.paddingRight) && (
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 8 }}>Padding (Individual)</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {spacing.paddingTop && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Top</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                        {spacing.paddingTop}
                      </div>
                    </div>
                  )}
                  {spacing.paddingRight && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Right</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                        {spacing.paddingRight}
                      </div>
                    </div>
                  )}
                  {spacing.paddingBottom && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Bottom</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                        {spacing.paddingBottom}
                      </div>
                    </div>
                  )}
                  {spacing.paddingLeft && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Left</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                        {spacing.paddingLeft}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Typography */}
      {typography && (
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Typography
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {typography.fontSize && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Font Size</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {typography.fontSize}
                </div>
              </div>
            )}
            {typography.fontWeight && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Font Weight</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {typography.fontWeight}
                </div>
              </div>
            )}
            {typography.lineHeight && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Line Height</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {typography.lineHeight}
                </div>
              </div>
            )}
            {typography.fontFamily && (
              <div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>Font Family</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {typography.fontFamily}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Colors */}
      {colors && (
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Colors
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Default State */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Default</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                {colors.background && (
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Background</div>
                    <div
                      style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: colors.background.includes("var(") ? "transparent" : colors.background,
                        border: "1px solid var(--border-secondary)",
                        borderRadius: 6,
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {colors.background.includes("var(") && (
                        <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>CSS Variable</div>
                      )}
                    </div>
                    <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                      {colors.background}
                    </code>
                  </div>
                )}
                {colors.text && (
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Text</div>
                    <div
                      style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: colors.text.includes("var(") ? "transparent" : colors.text,
                        border: "1px solid var(--border-secondary)",
                        borderRadius: 6,
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {colors.text.includes("var(") && (
                        <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>CSS Variable</div>
                      )}
                    </div>
                    <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                      {colors.text}
                    </code>
                  </div>
                )}
                {colors.border && (
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Border</div>
                    <div
                      style={{
                        width: "100%",
                        height: 40,
                        border: `2px solid ${colors.border.includes("var(") ? "var(--border-primary)" : colors.border}`,
                        borderRadius: 6,
                        marginBottom: 4,
                      }}
                    />
                    <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                      {colors.border}
                    </code>
                  </div>
                )}
              </div>
            </div>

            {/* Hover State */}
            {colors.hover && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Hover</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                  {colors.hover.background && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Background</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.hover.background}
                      </code>
                    </div>
                  )}
                  {colors.hover.text && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Text</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.hover.text}
                      </code>
                    </div>
                  )}
                  {colors.hover.border && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Border</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.hover.border}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Active State */}
            {colors.active && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Active</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                  {colors.active.background && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Background</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.active.background}
                      </code>
                    </div>
                  )}
                  {colors.active.text && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Text</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.active.text}
                      </code>
                    </div>
                  )}
                  {colors.active.border && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Border</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.active.border}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Disabled State */}
            {colors.disabled && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Disabled</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                  {colors.disabled.background && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Background</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.disabled.background}
                      </code>
                    </div>
                  )}
                  {colors.disabled.text && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Text</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.disabled.text}
                      </code>
                    </div>
                  )}
                  {colors.disabled.border && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Border</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.disabled.border}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error State */}
            {colors.error && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Error</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                  {colors.error.background && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Background</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.error.background}
                      </code>
                    </div>
                  )}
                  {colors.error.text && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Text</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.error.text}
                      </code>
                    </div>
                  )}
                  {colors.error.border && (
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>Border</div>
                      <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {colors.error.border}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* States */}
      {states && states.length > 0 && (
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Interactive States
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {states.map((state, index) => (
              <div key={index} style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
                  {state.name}
                </div>
                {state.description && (
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
                    {state.description}
                  </div>
                )}
                {state.visual && <div>{state.visual}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
