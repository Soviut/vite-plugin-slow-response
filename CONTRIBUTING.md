# Contributing

## Requirements

- Node.js >= 22
- npm

## Setup

```bash
git clone https://github.com/Soviut/vite-plugin-slow-response.git
cd vite-plugin-slow-response
npm install
```

## Development

The plugin is a single TypeScript file at `src/vite-plugin-slow-response.ts`.

Build the plugin:

```bash
npm run build
```

Format code:

```bash
npm run format
```

## Submitting Changes

1. Fork the repository and create a branch from `main`.
2. Make your changes in `src/vite-plugin-slow-response.ts`.
3. Run `npm run build` and ensure it compiles without errors.
4. Open a pull request against `main` with a clear description of the change.

## Reporting Issues

Open an issue at https://github.com/Soviut/vite-plugin-slow-response/issues with steps to reproduce, your Node.js version, and your Vite version.

## Publishing a Release

Publishing is automated via GitHub Actions and triggers on a version tag push.

### Setup (one-time)

1. Generate an npm **Automation token** at https://www.npmjs.com/settings/~/tokens
2. Add it as a secret named `NPM_TOKEN` in the GitHub repository settings under **Settings → Secrets and variables → Actions**

### Releasing

1. Bump the version in `package.json`:
   ```bash
   npm version patch   # or minor / major
   ```
2. Push the commit and the generated tag:
   ```bash
   git push && git push --tags
   ```
3. GitHub Actions will run tests, build, verify the tag matches the package version, then publish to npm automatically.
