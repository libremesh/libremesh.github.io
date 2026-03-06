import { createContentLoader, defineConfig, type DefaultTheme } from 'vitepress'
import { generateSidebarItems, getFiles } from './sidebar'

const isBuild = process.env.NODE_ENV === 'production'
const baseUrl = isBuild && '/libremesh.github.io' || ''

const libremesh = {
  stable_version: '2024.1',
  stable_branch_openwrt: ['23.05'],
  oldstable_version: '2020.4',
  oldstable_branch_openwrt: ['19.07'],
}

const packages = await getFiles('docs/packages/*/index.md');
const profiles = await getFiles('docs/profiles/packages/*/index.md');
const communities = await getFiles('docs/profiles/communities/*/index.md');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LibreMesh",
  description: "A modular framework for creating OpenWrt-based firmwares for wireless mesh nodes",
  head: [['link', { rel: 'icon', href: baseUrl+'/favicon.ico' }]],
  lastUpdated: true,
  base: baseUrl,
  metaChunk: true,

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
  },

  rewrites: {
    // ':page*': 'docs/:page*',
    // 'packages/pkg-a/src/foo.md': 'pkg-a/foo.md',
    // 'packages/pkg-b/src/index.md': 'pkg-b/index.md',
    // 'packages/pkg-b/src/bar.md': 'pkg-b/bar.md'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { light: '/libremesh_logo.svg', dark: '/libremesh_logo.svg', alt: 'Logo' },
    siteTitle: false,
    editLink: {
      pattern: 'https://github.com/a-gave/libremesh.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'local'
    },
    outline: 'deep',

    nav: nav(),

    sidebar: {
      '/': { base: '/', items: sidebarGuide() },
      '/reference/': { base: '/reference/', items: sidebarReference() }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/libremesh/lime-packages' },
      // { icon: 'maildotru', link: 'https://www.autistici.org/mailman/listinfo/libremesh' },
      { icon: 'matrix', link: 'https://matrix.to/#/#libremesh-dev:matrix.guifi.net' },
      { icon: 'mastodon', link: 'https://social.freifunk.net/@libremesh' },
      { icon: 'peertube', link: 'https://media.exo.cat/a/libremesh' }
    ],
  },
  // async buildEnd() {
  //   // const meetings = await createContentLoader('meetings/*.md').load()
  //   // generate files based on posts metadata, e.g. RSS feed
  // }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/packages-selection' },
    { text: 'Reference', link: '/reference/configuration' },  
    { text: 'News',
      items: [
        { text: 'v2024.1', link: '/news/2023-10-07' },
        { text: 'v2020.4', link: '/news/2025-05-04' },
        { text: 'Latest News', link: '/news' },
        { text: 'Changelog', link: 'changelog'},
        { text: 'Issues', link: 'https://github.com/libremesh/lime-packages/issues'},
      ]
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return  [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is LibreMesh?', link: '/what-is-libremesh' },
        { text: 'Getting Started', link: '/getting-started' },
        { text: 'Features', link: '/features' },
      ]
    },
    {
      text: 'Usage Guide',
      collapsed: false,
      items: [
        { text: 'Connecting to the router', link: '/guide/connecting' },
        { text: 'Packages selection', 
          link: '/guide/packages-selection', 
          collapsed: true,
          items: [
          { text: 'Build customization', link: '/guide/packages-selection' },
          { text: 'Network Profiles', link: '/guide/network-profiles' }
        ] },
        { text: 'Build LibreMesh', 
          link: '/build',
          collapsed: true,
          items: [
            { text: 'Build methods', link: '/build/' },
            { text: 'ImageBuilder', link: '/build/imagebuilder' },
            { text: 'lime-sdk', link: '/build/lime-sdk' },
            { text: 'Buildroot', link: '/build/buildroot'}
        ]},
        { text: 'Upgrade', link: '/guide/upgrade' },
      ]
    },
    { text: 'Configuration & Reference', link: '/reference/configuration'},
    {
      text: 'Development Guide',
      collapsed: false,
      items: [
        { text: 'Testing Guide', link: '/development/testing' },
        { text: 'Run LibreMesh on QEMU', link: '/development/virtualizing' },
        { text: 'Hacking', 
          link: '/development/hacking', 
          collapsed: true,
          items: [
          { text: 'Kernel Vermagic', link: '/development/hacking/kernel_vermagic' }
        ] },
        { text: 'Contributing to lime-packages', link: '/development/contributing' },
      ]
    },
    {
      text: 'Community',
      collapsed: false,
      items: [
        { text: 'Communication', link: '/communication' },
        { text: 'Contributors', link: '/contributors' },
        { text: 'Meetings', link: '/meetings' },
      ]
    },
    {
      text: 'Resources',
      collapsed: false,
      link: '/resources',
      items: [
        { text: 'Media list', link: '/resources/media_list' },
        { text: 'Related projects', link: '/resources/related_projects' },
        { text: 'Tools', 
          link: '/resources/tools/monitoring',
          collapsed: true,
          items: [
            { text: 'Monitoring', link: '/resources/tools/monitoring' },
        ]},
      ]
    },
    {
      text: 'Packages',
      collapsed: true,
      // link: '/packages',
      items: [{ text: 'Table of packages', link: '/packages' }].concat(generateSidebarItems(packages)),
    },
    {
      text: 'Profiles',
      collapsed: true,
      // link: '/profiles',
      items: [
        { text: 'Table of profiles', link: '/profiles' },
        { text: 'Communities', items: generateSidebarItems(communities) },
        { text: 'Packages', items: generateSidebarItems(profiles), },
      ]

      
    },
  ]
}


function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Configuration', link: 'configuration' },
        { text: 'lime-config', link: 'lime-config' },
        { text: 'Flavors', link: 'flavors' },
        { text: 'Default protocols', items: [
          { text: 'Batman-adv', link: 'network/protocols/batman-adv'},
          { text: 'Babeld', link: 'network/protocols/babeld'},
        ]},
        { text: 'lime-files', items: [
          { text: 'System options', link: 'system' },
          { text: 'Network options', link: 'network/', items: [
            { text: 'General options', link: 'network/#general-options'},
            { text: 'DNS servers', link: 'network/#dns-servers'},
            { text: 'Protocols list', link: 'network/protocols-list'},
            { text: 'Protocols options', link: 'network/protocols-options'},
            { text: 'Interface specific options', link: 'network/interface-specific'},
          ] },
          { text: 'WiFi options', link: 'wifi', items: [
            { text: 'General options', link: 'wifi'},
            { text: 'Band specific options', link: 'wifi/band-specific-options'},
            { text: 'Interface specific options', link: 'wifi/interface-specific'},
          ] },
          { text: 'Generic UCI configs', link: 'generic_config' },
          { text: 'Hardware detection', 
            link: 'hardware_detection',
            items: [
              { text: 'Ground Routing', link: 'hardware_detection/ground_routing' },
              { text: 'Watchcat', link: 'hardware_detection/watchcat' }
            ]
          },
        ]},
      ]
    }
  ]
}