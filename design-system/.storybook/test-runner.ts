import type { TestRunnerConfig } from "@storybook/test-runner";
import { injectAxe, checkA11y } from "axe-playwright";

/**
 * Storybook Test Runner config
 * - Injects axe-core into every story frame
 * - Runs basic accessibility checks
 *
 * Note: This is intentionally conservative to avoid false positives and flakiness.
 */
const config: TestRunnerConfig = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page) {
    // Disable a few checks that are noisy in component sandboxes.
    await checkA11y(page, "#root", {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: {
        rules: {
          // Story canvases frequently include headings out of strict order; keep this advisory-only.
          "heading-order": { enabled: false },
          // Color contrast can depend on host background; we keep manual review + design tokens for this.
          "color-contrast": { enabled: false },
        },
      },
    });
  },
};

export default config;

