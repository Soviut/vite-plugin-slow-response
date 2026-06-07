# Vite Plugin Slow Response

A Vite plugin that simulates slow responses from the dev server.

## Installation

```bash
npm install vite-plugin-slow-response --save-dev
```

## Usage

Add the following to your `vite.config.ts` file.

<!-- prettier-ignore-start -->
```ts
import { defineConfig } from "vite";
import slowResponse from "vite-plugin-slow-response";

export default defineConfig({
  plugins: [
    slowResponse("/api", 2000)
  ],
});
```
<!-- prettier-ignore-end -->

In this example, any request to `/api` will be delayed by 2000 milliseconds.

## Options

- `path`: The path to match for slow responses. This can be a string or a regular expression.
- `delay`: The delay in milliseconds before the response is sent.
