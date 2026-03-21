
export default {
  async load() {
    // fetch remote data
    return {
      stable_version: '2024.1',
      stable_branch_openwrt: ['23.05'],
      oldstable_version: '2020.4',
      oldstable_branch_openwrt: ['19.07'],
      flavors: {
        default: [
          "babeld-auto-gw-mode",
          "batctl-default",
          "check-date-http",
          "lime-app",
          "lime-debug",
          "lime-docs-minimal",
          "lime-hwd-ground-routing",
          "lime-hwd-openwrt-wan",
          "lime-proto-anygw",
          "lime-proto-babeld",
          "lime-proto-batadv",
          "shared-state",
          "shared-state-async",
          "shared-state-babeld_hosts",
          "shared-state-bat_hosts",
          "shared-state-nodes_and_links"
        ],
        mini: [
          "babeld-auto-gw-mode",
          "check-date-http",
          "lime-docs-minimal",
          "lime-hwd-openwrt-wan",
          "lime-proto-anygw",
          "lime-proto-babeld",
          "lime-proto-batadv",
          "shared-state",
          "shared-state-babeld_hosts",
          "shared-state-nodes_and_links"
        ]
      }
    }
  }
}
