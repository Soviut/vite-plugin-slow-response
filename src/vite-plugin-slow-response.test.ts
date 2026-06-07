import type { ViteDevServer, Plugin } from 'vite'
import { describe, it, expect, vi } from 'vitest'
import slowResponsePlugin from './vite-plugin-slow-response.js'

function resolveConfigureServer(plugin: Plugin): (server: ViteDevServer) => void {
  const hook = plugin.configureServer!
  return typeof hook === 'function' ? hook : hook.handler
}

function makeMockServer(): ViteDevServer {
  return {
    middlewares: { use: vi.fn() },
    httpServer: { once: vi.fn() },
  } as unknown as ViteDevServer
}

describe('slowResponsePlugin', () => {
  it('returns a plugin with the correct name', () => {
    const plugin = slowResponsePlugin('/api', 500)
    expect(plugin.name).toBe('slow-response')
  })

  it('does not register middleware when delay is 0', () => {
    const server = makeMockServer()
    const plugin = slowResponsePlugin('/api', 0)
    resolveConfigureServer(plugin)(server)
    expect(server.middlewares.use).not.toHaveBeenCalled()
  })

  it('does not register middleware when delay is negative', () => {
    const server = makeMockServer()
    const plugin = slowResponsePlugin('/api', -1)
    resolveConfigureServer(plugin)(server)
    expect(server.middlewares.use).not.toHaveBeenCalled()
  })

  it('registers middleware on the given path when delay > 0', () => {
    const server = makeMockServer()
    const plugin = slowResponsePlugin('/api', 500)
    resolveConfigureServer(plugin)(server)
    expect(server.middlewares.use).toHaveBeenCalledWith('/api', expect.any(Function))
  })

  it('delays next() by the specified amount', async () => {
    vi.useFakeTimers()
    const server = makeMockServer()
    const plugin = slowResponsePlugin('/api', 500)
    resolveConfigureServer(plugin)(server)

    const mockUse = server.middlewares.use as ReturnType<typeof vi.fn>
    const middleware = mockUse.mock.calls[0]?.[1] as (
      _req: unknown,
      _res: unknown,
      next: () => void
    ) => void
    const next = vi.fn()
    middleware(null, null, next)

    expect(next).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(500)
    expect(next).toHaveBeenCalledOnce()

    vi.useRealTimers()
  })
})
