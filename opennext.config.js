/** @type {import('@opennextjs/cloudflare').OpenNextConfig} */
export default {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: "disabled",
      tagCache: "disabled",
      queue: "disabled",
    },
  },
};
