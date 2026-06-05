import { createContentLoader, defineConfig, type DefaultTheme } from 'vitepress'
import { generateSidebarItems, getFiles } from './sidebar'

// const isBuild = process.env.NODE_ENV === 'production'
const isFork = process.env.IS_FORK === '1'
const baseUrl = isFork && '/libremesh.github.io' || ''

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
      lang: 'en',
      themeConfig: {
        nav: navEn(),
        sidebar: {
          '/': { base: '/', items: sidebarGuideEn() },
          '/reference/': { base: '/reference/', items: sidebarReferenceEn() }
        },
      },
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      themeConfig: {
        nav: navEs(),
        sidebar: {
          '/es/': { base: '/es/', items: sidebarGuideEs() },
          '/es/reference/': { base: '/es/reference/', items: sidebarReferenceEn() }
        },
      },
    },
    'pt-BR': {
      label: 'Português (BR)',
      lang: 'pt-BR',
      link: '/pt-BR/',
      themeConfig: {
        nav: navPtBr(),
        sidebar: {
          '/pt-BR/': { base: '/pt-BR/', items: sidebarGuidePtBr() },
          '/pt-BR/reference/': { base: '/pt-BR/reference/', items: sidebarReferenceEn() }
        },
      },
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
      pattern: 'https://github.com/libremesh/libremesh.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'local'
    },
    outline: 'deep',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/libremesh/lime-packages' },
      // { icon: 'maildotru', link: 'https://www.autistici.org/mailman/listinfo/libremesh' },
      { icon: 'matrix', link: 'https://matrix.to/#/#libremesh-dev:matrix.guifi.net' },
      { icon: 'mastodon', link: 'https://social.freifunk.net/@libremesh' },
      { icon: 'peertube', link: 'https://media.exo.cat/a/libremesh' }
    ],
  },
})

function navEn(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/packages-selection' },
    { text: 'Reference', link: '/reference/configuration' },
    { text: 'News',
      items: [
        { text: 'v2024.1', link: '/news/2025-05-04' },
        { text: 'v2020.4', link: '/news/2023-10-07' },
        { text: 'Latest Articles', link: '/news/' },
        { text: 'Changelog', link: 'changelog'},
        { text: 'Issues', link: 'https://github.com/libremesh/lime-packages/issues'},
      ]
    },
  ]
}

function navEs(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guía', link: '/es/guide/packages-selection' },
    { text: 'Referencia', link: '/es/reference/configuration' },
    { text: 'Noticias',
      items: [
        { text: 'v2024.1', link: '/es/news/2025-05-04' },
        { text: 'v2020.4', link: '/es/news/2023-10-07' },
        { text: 'Artículos recientes', link: '/es/news/' },
        { text: 'Changelog', link: '/es/changelog'},
        { text: 'Issues', link: 'https://github.com/libremesh/lime-packages/issues'},
      ]
    },
  ]
}

function navPtBr(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guia', link: '/pt-BR/guide/packages-selection' },
    { text: 'Referência', link: '/pt-BR/reference/configuration' },
    { text: 'Notícias',
      items: [
        { text: 'v2024.1', link: '/pt-BR/news/2025-05-04' },
        { text: 'v2020.4', link: '/pt-BR/news/2023-10-07' },
        { text: 'Artigos recentes', link: '/pt-BR/news/' },
        { text: 'Changelog', link: '/pt-BR/changelog'},
        { text: 'Issues', link: 'https://github.com/libremesh/lime-packages/issues'},
      ]
    },
  ]
}

function sidebarGuideEn(): DefaultTheme.SidebarItem[] {
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
          { text: 'Network Profiles', link: '/guide/network-profiles' }
        ] },
        { text: 'Build LibreMesh',
          link: '/build/',
          collapsed: true,
          items: [
            // { text: 'Build methods', link: '/build/' },
            { text: 'ImageBuilder', link: '/build/imagebuilder' },
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

function sidebarGuideEs(): DefaultTheme.SidebarItem[] {
  return  [
    {
      text: 'Introducción',
      collapsed: false,
      items: [
        { text: '¿Qué es LibreMesh?', link: 'what-is-libremesh' },
        { text: 'Primeros pasos', link: 'getting-started' },
        { text: 'Características', link: 'features' },
      ]
    },
    {
      text: 'Guía de uso',
      collapsed: false,
      items: [
        { text: 'Conectarse al router', link: 'guide/connecting' },
      ]
    },
  ]
}

function sidebarGuidePtBr(): DefaultTheme.SidebarItem[] {
  return  [
    {
      text: 'Introdução',
      collapsed: false,
      items: [
        { text: 'O que é o LibreMesh?', link: 'what-is-libremesh' },
        { text: 'Primeiros passos', link: 'getting-started' },
        { text: 'Recursos', link: 'features' },
      ]
    },
    {
      text: 'Guia de uso',
      collapsed: false,
      items: [
        { text: 'Conectando ao roteador', link: 'guide/connecting' },
      ]
    },
  ]
}


function sidebarReferenceEn(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Configuration', link: 'configuration' },
        { text: 'lime-config', link: 'lime-config' },
        { text: 'Flavors', link: 'flavors' },
        { text: 'Default protocols',
          collapsed: true,
          items: [
          { text: 'Batman-adv', link: 'network/protocols/batman-adv'},
          { text: 'Babeld', link: 'network/protocols/babeld'},
        ]},
        { text: 'lime-files', items: [
          { text: 'System', link: 'system' },
          { text: 'Network', link: 'network/', items: [
            { text: 'General', link: 'network/#general-options'},
            { text: 'DNS servers', link: 'network/#dns-servers'},
            { text: 'Protocols list', link: 'network/protocols-list'},
            { text: 'Protocols options', link: 'network/protocols-options'},
            { text: 'Interface specific', link: 'network/interface-specific'},
          ] },
          { text: 'WiFi', link: 'wifi/', items: [
            { text: 'General', link: 'wifi/#general-options'},
            { text: 'Modes', link: 'wifi/modes'},
            { text: 'Band specific', link: 'wifi/band-specific'},
            { text: 'Interface specific', link: 'wifi/interface-specific'},
          ] },
          { text: 'Generic UCI configs', link: 'generic_config' },
          { text: 'Hardware detection',
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
