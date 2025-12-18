# Security Policy

## Reporting a vulnerability

Please **do not** open public issues for security reports.

Instead, use one of the following:
- **GitHub Security Advisories** (preferred): create a private report in the repository’s “Security” tab.
- If that’s not available, open an issue with minimal details and request a private channel.

## Secrets policy

Never commit secrets (tokens, API keys, private registry auth). Tokens must be referenced via environment variables (e.g. `${NPM_TOKEN}`).

See:
- `design-system/docs/security.md`

