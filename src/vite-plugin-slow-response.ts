import { type Plugin } from "vite";

export default function slowResponsePlugin(path: string, delay = 0): Plugin {
  return {
    name: "slow-response",

    configureServer(server) {
      // skip if no delay is set
      if (delay <= 0) return;

      server.middlewares.use(path, (_req, _res, next) => {
        setTimeout(next, delay);
      });

      server.httpServer?.once("listening", () => {
        console.log(
          `🐌 \x1b[1m\x1b[36m${path}\x1b[0m responses delayed \x1b[1m\x1b[36m${delay}\x1b[0m ms`,
        );
      });
    },
  };
}
