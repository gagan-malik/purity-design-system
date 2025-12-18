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
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Start strict checks on a curated surface area (Pages/*), then expand.
    // This prevents CI from being blocked by legacy stories while we iterate.
    const storyId = String(context?.id || "");
    const shouldCheck =
      storyId.startsWith("pages-") ||
      storyId.startsWith("pagesfoundations-") ||
      storyId.startsWith("pagespatterns-");
    if (!shouldCheck) return;

    const include =
      (await page.$("#storybook-root")) ? "#storybook-root" : (await page.$("#root")) ? "#root" : "body";

    // Disable a few checks that are noisy in component sandboxes.
    await checkA11y(page, include, {
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

