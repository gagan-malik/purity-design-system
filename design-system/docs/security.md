# Security & secrets

## Never commit secrets

This repo must not contain:

- GitHub PATs (tokens)
- Chromatic project tokens
- private registry auth tokens

## Required environment variables

- `NPM_TOKEN`: GitHub Packages auth token
- `CHROMATIC_PROJECT_TOKEN`: Chromatic token for visual testing

## .npmrc policy

- `.npmrc` may define registries
- `.npmrc` must reference tokens via `${ENV_VAR}`

Example:

```
@purity:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

## Incident response

If a token is committed:

- rotate/revoke the token immediately
- rewrite git history if needed (depending on repo exposure)
- add CI checks to block future secret commits
