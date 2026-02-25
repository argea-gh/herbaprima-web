interface CloudflareEnv {
  DB: D1Database;
}

declare global {
  var __ENV__: CloudflareEnv;
}

export {};
