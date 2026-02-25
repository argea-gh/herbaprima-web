{
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",  ← WAJIB!
      incrementalCache: "disabled",
      tagCache: "disabled",
      queue: "disabled",
    },
  },
  edgeExternals: ["node:crypto"],  ← WAJIB!
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",  ← WAJIB!
      incrementalCache: "disabled",
      tagCache: "disabled",
      queue: "disabled",
    },
  },
}
