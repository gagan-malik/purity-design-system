# Figma Integration with Storybook

This guide explains how to integrate Figma designs with Storybook for design-to-development handoff.

## Overview

Figma integration allows designers and developers to view Figma designs directly in Storybook, making it easier to compare designs with implementations and ensure consistency.

## Installation

### Option 1: Using @storybook/addon-designs (Recommended)

```bash
cd design-system
yarn add -D @storybook/addon-designs
```

Then add to `.storybook/main.ts`:

```typescript
addons: [
  // ... other addons
  "@storybook/addon-designs",
],
```

### Option 2: Using Storybook's Built-in Design Tab

Storybook 7+ has built-in support for design links via parameters. No additional addon needed.

## Usage

### Adding Figma Links to Stories

Add a `design` parameter to your story:

```typescript
export const MyStory: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YOUR_FILE_ID/Design-Name',
    },
  },
  // ... rest of story
};
```

### Getting Figma File URLs

1. Open your Figma file
2. Click "Share" in the top right
3. Copy the link
4. Use the full URL or extract the file ID

**Example Figma URL format:**
```
https://www.figma.com/file/ABC123XYZ/Component-Design
```

### Linking to Specific Frames

To link to a specific frame or component in Figma:

1. Select the frame/component in Figma
2. Right-click → "Copy link to selection"
3. Use that URL in the `design` parameter

**Example with node ID:**
```
https://www.figma.com/file/ABC123XYZ/Design?node-id=123%3A456
```

## Component Examples

### Button Component

```typescript
export const Primary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ABC123/Button-Design?node-id=123%3A456',
    },
  },
  render: () => <Button variant="solid">Click me</Button>,
};
```

### Input Component

```typescript
export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ABC123/Input-Design?node-id=789%3A012',
    },
  },
  render: () => <Input label="Email" type="email" />,
};
```

## Best Practices

### 1. Link to Component-Level Designs

Link to the specific component frame in Figma, not the entire page. This makes it easier to compare the component in isolation.

### 2. Keep Links Updated

When Figma designs are updated, ensure the links still point to the correct frames. Consider using Figma's version history if designs change frequently.

### 3. Document Design Decisions

Use the Storybook docs to explain any deviations from the Figma design, such as:
- Responsive behavior not shown in Figma
- Interactive states not captured in static designs
- Implementation constraints

### 4. Use Design Tokens

Ensure Figma designs use the same design tokens (colors, spacing, typography) as the implementation. See `Foundations/Tokens` for token reference.

## Alternative: Embedding Figma Files

You can also embed Figma files directly in Storybook docs using iframes:

```typescript
export const DesignReference: Story = {
  render: () => (
    <div>
      <iframe
        src="https://www.figma.com/embed?embed_host=storybook&url=https://www.figma.com/file/YOUR_FILE_ID"
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  ),
};
```

## Troubleshooting

### Design Tab Not Showing

- Ensure the addon is installed and added to `main.ts`
- Check that the `design` parameter is correctly formatted
- Verify the Figma URL is accessible

### Figma File Not Loading

- Check that the Figma file is shared publicly or you're logged in
- Verify the URL format is correct
- Try opening the URL directly in a browser

### Permission Issues

- Ensure team members have access to the Figma file
- Consider using Figma's "Share for development" feature
- Use public links for open-source projects

## Related Documentation

- **Design Handoff Guide**: See `docs/design-handoff.md` for how to specify components in Figma
- **Figma-to-Code Mapping**: See `docs/figma-to-code.md` for component name mappings
- **Design Tokens**: See `Foundations/Tokens` for token reference

---

**Last Updated**: December 18, 2025
