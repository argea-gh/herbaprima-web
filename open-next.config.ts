import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      incrementalCache: 'disabled',
      tagCache: 'disabled',
      queue: 'disabled',
    },
  },
};

export default config;
