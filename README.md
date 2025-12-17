# Purity Design System

Purity is a **theme-aware React design system** with a **public Storybook** and a growing set of **AI agentic UI primitives**. It also includes a small GitHub Pages portal that showcases the system.

- **Homepage (GitHub Pages)**: `https://gagan-malik.github.io/purity-design-system/`
- **Storybook**: `https://gagan-malik.github.io/purity-design-system/storybook/`
- **Package**: `@purity/design-system` (GitHub Packages)

## Repository layout

This is a monorepo:

- **Component library**: `design-system/`
- **Marketing site + Storybook hosting**: `website/` → deployed to GitHub Pages

## Quick start (local)

```bash
yarn install
yarn storybook
```

Other common commands:

- **Build Storybook**: `yarn build-storybook`
- **Build library**: `yarn rollup`

## Install (consumer apps)

This package is published to **GitHub Packages**.

```bash
export NPM_TOKEN="<github token with read:packages>"
npm install @purity/design-system
```

> Never commit tokens. `.npmrc` must reference secrets via `${ENV_VAR}`.

## Usage

```tsx
import { Button, ThemeProvider } from "@purity/design-system";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="purity-theme">
      <Button>Continue</Button>
    </ThemeProvider>
  );
}
```

## AI agentic UI primitives

P0/P1 components are available in Storybook under `designsystem/*`, including:

- **Chat**: `ChatMessage`, `ChatMessageList`, `ChatComposer`
- **Agent runs**: `ToolCallCard`, `RunTimeline`, `ApprovalCard`, `ArtifactPanel`
- **Safety & UX**: `SafetyNotice`, `TokenUsageMeter`, `ErrorBanner`, `Citation`, `AttachmentPicker`, `MessageActions`, `StreamingIndicator`

## Contributing

- See `CONTRIBUTING.md`
- Design-system specific guide: `design-system/docs/contributing.md`

## Security

See `SECURITY.md` and `design-system/docs/security.md`.
