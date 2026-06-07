# Vite Plugin Slow Response

[![npm version](https://img.shields.io/npm/v/vite-plugin-slow-response)](https://www.npmjs.com/package/vite-plugin-slow-response)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-slow-response)](https://www.npmjs.com/package/vite-plugin-slow-response)
[![license](https://img.shields.io/npm/l/vite-plugin-slow-response)](./LICENSE)

A Vite plugin that simulates slow responses from the dev server.

## Installation

```bash
npm install vite-plugin-slow-response --save-dev
```

## Usage

> [!NOTE]
> The plugin only affects requests to the Vite dev server. It does not affect production builds.

Add the following to your `vite.config.ts` file.

<!-- prettier-ignore-start -->
```ts
import { defineConfig } from 'vite'
import slowResponse from 'vite-plugin-slow-response'

export default defineConfig({
  plugins: [
    slowResponse('/api', 2000)
  ],
})
```
<!-- prettier-ignore-end -->

Any request to `/api` will be delayed by 2000 milliseconds.

> [!TIP]
> This will work with Vite dev server [proxies](https://vitejs.dev/config/server-options.html#server-proxy).

Multiple paths can be specified by calling the plugin multiple times.

<!-- prettier-ignore-start -->
```ts
export default defineConfig({
  plugins: [
    slowResponse('/api', 2000),
    slowResponse('/auth/login', 1000)
  ],
})
```
<!-- prettier-ignore-end -->

To simulate slow responses for all requests:

<!-- prettier-ignore-start -->
```ts
export default defineConfig({
  plugins: [
    slowResponse('/', 2000)
  ],
})
```
<!-- prettier-ignore-end -->

Disable the plugin by setting the delay to 0. This completely bypasses the middleware creation, so there is no performance overhead:

<!-- prettier-ignore-start -->
```ts
export default defineConfig({
  plugins: [
    slowResponse('/', 0)
  ],
})
```
<!-- prettier-ignore-end -->

## Options

| Option  | Type     | Default | Description                                            |
| ------- | -------- | ------- | ------------------------------------------------------ |
| `path`  | `string` |         | The path to match for slow responses.                  |
| `delay` | `number` | `0`     | The delay in milliseconds before the response is sent. |
