import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Input } from "../../components/FormInput/Input";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";

const meta: Meta = {
  title: "Patterns/LoginForm",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pattern: Complete login flow with validation, error handling, and accessibility. Use this as a reference for authentication forms.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Reference: Story = {
  render: () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = React.useState(false);

    const validate = () => {
      const newErrors: { email?: string; password?: string } = {};
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!email.includes("@")) {
        newErrors.email = "Please enter a valid email";
      }
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          setLoading(false);
          alert("Login successful!");
        }, 1500);
      }
    };

    return (
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Sign in to your account
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              required
              hintText={errors.email}
              className={errors.email ? "border-error" : ""}
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              required
              hintText={errors.password}
              className={errors.password ? "border-error" : ""}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" />
              <span style={{ color: "var(--text-secondary)" }}>Remember me</span>
            </label>
            <a href="#forgot" style={{ color: "var(--text-brand-primary)", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            tone="brand"
            variant="solid"
            fullWidth
            loading={loading}
            loadingText="Signing in..."
          >
            Sign in
          </Button>

          <div style={{ textAlign: "center", fontSize: 14, color: "var(--text-secondary)" }}>
            Don't have an account?{" "}
            <a href="#signup" style={{ color: "var(--text-brand-primary)", textDecoration: "none" }}>
              Sign up
            </a>
          </div>
        </form>
      </div>
    );
  },
};

export const ComponentBreakdown: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Component Breakdown
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Input Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Used for email and password fields with validation
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<Input label="Email" type="email" required />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Button Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Primary action button with loading state
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<Button type="submit" tone="brand" variant="solid" loading />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Label Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Used for form field labels (integrated in Input component)
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Responsive Behavior
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Mobile (< 768px)
          </div>
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Full-width form container</li>
            <li>Stacked layout for all elements</li>
            <li>Touch-friendly input heights (min 44px)</li>
            <li>Full-width submit button</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Desktop (≥ 768px)
          </div>
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Centered form with max-width (400px)</li>
            <li>Consistent spacing and padding</li>
            <li>Hover states for interactive elements</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Accessibility Notes
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Keyboard Navigation
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            All form fields are keyboard accessible. Tab order: Email → Password → Remember me → Forgot password → Sign in
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Focus Management
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Focus rings are visible on all interactive elements. Focus moves logically through the form.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Error Messages
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Error messages are associated with inputs using hintText prop. Errors are announced to screen readers.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ ARIA Labels
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            All inputs have proper labels. Required fields are marked. Loading states are announced.
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WhenToUse: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        When to Use
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Use this pattern for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>User authentication flows</li>
            <li>Account login pages</li>
            <li>Registration forms</li>
            <li>Password reset flows</li>
            <li>Any form requiring email/password input</li>
          </ul>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ❌ Don't use this pattern for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Simple contact forms (use Forms pattern instead)</li>
            <li>Search interfaces (use SearchInput component)</li>
            <li>Settings forms with multiple sections</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
