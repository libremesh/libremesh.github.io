// Shared between LanguageBanner.vue (first-visit toast) and
// LanguageSwitcher.vue (nav dropdown). When a new page is
// translated in both English and one of the locales, add an entry
// here so both UIs take the user to the matching page.

export const LOCALE_PREFIXES = ['/es', '/pt-BR']

export const messages = {
  en:    { label: 'English',          short: 'EN', home: '/',         hint: '',  action: '',  dismiss: 'Dismiss' },
  es:    { label: 'Español',          short: 'ES', home: '/es/',      hint: 'Esta página también está disponible en Español.',         action: 'Cambiar', dismiss: 'Cerrar' },
  'pt-BR': { label: 'Português (BR)', short: 'PT', home: '/pt-BR/',   hint: 'Esta página também está disponível em Português (BR).', action: 'Trocar',  dismiss: 'Fechar' }
}

export const translatedPaths = {
  es: {
    '/':                     '/es/',
    '/what-is-libremesh':    '/es/what-is-libremesh.html',
    '/getting-started':      '/es/getting-started.html',
    '/features':             '/es/features.html',
    '/guide/connecting':     '/es/guide/connecting.html',
    '/guide/packages-selection': '/es/guide/packages-selection.html',
    '/guide/network-profiles': '/es/guide/network-profiles.html',
    '/guide/upgrade':        '/es/guide/upgrade.html',
    '/build/':               '/es/build/',
    '/build/index':          '/es/build/index.html',
    '/build/imagebuilder':   '/es/build/imagebuilder.html',
    '/build/buildroot':      '/es/build/buildroot.html',
    '/reference/configuration': '/es/reference/configuration.html',
    '/reference/flavors':    '/es/reference/flavors.html',
    '/reference/lime-config': '/es/reference/lime-config.html',
    '/reference/system':     '/es/reference/system.html',
    '/reference/network/':   '/es/reference/network/',
    '/reference/network/index': '/es/reference/network/index.html',
    '/reference/network/protocols/babeld': '/es/reference/network/protocols/babeld.html',
    '/reference/network/protocols/batman-adv': '/es/reference/network/protocols/batman-adv.html',
    '/reference/network/protocols-list': '/es/reference/network/protocols-list.html',
    '/reference/network/protocols-options': '/es/reference/network/protocols-options.html',
    '/reference/network/interface-specific': '/es/reference/network/interface-specific.html',
    '/reference/wifi/':      '/es/reference/wifi/',
    '/reference/wifi/index': '/es/reference/wifi/index.html',
    '/reference/wifi/band-specific': '/es/reference/wifi/band-specific.html',
    '/reference/wifi/modes': '/es/reference/wifi/modes.html',
    '/reference/wifi/interface-specific': '/es/reference/wifi/interface-specific.html',
    '/reference/generic_config': '/es/reference/generic_config.html',
    '/reference/hardware_detection/ground_routing': '/es/reference/hardware_detection/ground_routing.html',
    '/reference/hardware_detection/watchcat': '/es/reference/hardware_detection/watchcat.html',
    '/development/contributing': '/es/development/contributing.html',
    '/development/testing':  '/es/development/testing.html',
    '/development/virtualizing': '/es/development/virtualizing.html',
    '/development/hacking':  '/es/development/hacking.html',
    '/development/hacking/kernel_vermagic': '/es/development/hacking/kernel_vermagic.html',
    '/diagrams/libremesh-interfaces-openwrt-one': '/es/diagrams/libremesh-interfaces-openwrt-one.html',
  },
  'pt-BR': {
    '/':                     '/pt-BR/',
    '/what-is-libremesh':    '/pt-BR/what-is-libremesh.html',
    '/getting-started':      '/pt-BR/getting-started.html',
    '/features':             '/pt-BR/features.html',
    '/guide/connecting':     '/pt-BR/guide/connecting.html',
    '/guide/packages-selection': '/pt-BR/guide/packages-selection.html',
    '/guide/network-profiles': '/pt-BR/guide/network-profiles.html',
    '/guide/upgrade':        '/pt-BR/guide/upgrade.html',
    '/build/':               '/pt-BR/build/',
    '/build/index':          '/pt-BR/build/index.html',
    '/build/imagebuilder':   '/pt-BR/build/imagebuilder.html',
    '/build/buildroot':      '/pt-BR/build/buildroot.html',
    '/reference/configuration': '/pt-BR/reference/configuration.html',
    '/reference/flavors':    '/pt-BR/reference/flavors.html',
    '/reference/lime-config': '/pt-BR/reference/lime-config.html',
    '/reference/system':     '/pt-BR/reference/system.html',
    '/reference/network/':   '/pt-BR/reference/network/',
    '/reference/network/index': '/pt-BR/reference/network/index.html',
    '/reference/network/protocols/babeld': '/pt-BR/reference/network/protocols/babeld.html',
    '/reference/network/protocols/batman-adv': '/pt-BR/reference/network/protocols/batman-adv.html',
    '/reference/network/protocols-list': '/pt-BR/reference/network/protocols-list.html',
    '/reference/network/protocols-options': '/pt-BR/reference/network/protocols-options.html',
    '/reference/network/interface-specific': '/pt-BR/reference/network/interface-specific.html',
    '/reference/wifi/':      '/pt-BR/reference/wifi/',
    '/reference/wifi/index': '/pt-BR/reference/wifi/index.html',
    '/reference/wifi/band-specific': '/pt-BR/reference/wifi/band-specific.html',
    '/reference/wifi/modes': '/pt-BR/reference/wifi/modes.html',
    '/reference/wifi/interface-specific': '/pt-BR/reference/wifi/interface-specific.html',
    '/reference/generic_config': '/pt-BR/reference/generic_config.html',
    '/reference/hardware_detection/ground_routing': '/pt-BR/reference/hardware_detection/ground_routing.html',
    '/reference/hardware_detection/watchcat': '/pt-BR/reference/hardware_detection/watchcat.html',
    '/development/contributing': '/pt-BR/development/contributing.html',
    '/development/testing':  '/pt-BR/development/testing.html',
    '/development/virtualizing': '/pt-BR/development/virtualizing.html',
    '/development/hacking':  '/pt-BR/development/hacking.html',
    '/development/hacking/kernel_vermagic': '/pt-BR/development/hacking/kernel_vermagic.html',
    '/diagrams/libremesh-interfaces-openwrt-one': '/pt-BR/diagrams/libremesh-interfaces-openwrt-one.html',
  }
}

export function stripLocale(path) {
  for (const p of LOCALE_PREFIXES) {
    if (path === p || path === p + '/' || path.startsWith(p + '/')) {
      return path.slice(p.length) || '/'
    }
  }
  return path
}

// Strip a VitePress base prefix (e.g. "/libremesh.github.io") so the
// remaining path is suitable for the locale helpers above, which all
// expect a root-relative path. With base '/' this is a no-op.
export function stripBase(path, base) {
  if (!base || base === '/') return path
  const b = base.replace(/\/$/, '')
  if (path === b) return '/'
  if (path.startsWith(b + '/')) return path.slice(b.length) || '/'
  return path
}

export function cleanPath(path) {
  return path.replace(/\.html$/, '').replace(/\/$/, '') || '/'
}

// Returns a target path in the requested locale. The returned path
// does NOT include the VitePress base — callers must prepend it
// (e.g. via import.meta.env.BASE_URL or the useData() siteData.base)
// before assigning to window.location.href. The LanguageBanner and
// LanguageSwitcher components handle that.
export function targetFor(locale, currentPath) {
  const clean = cleanPath(stripLocale(currentPath))
  if (locale === 'en') return clean
  return translatedPaths[locale][clean] || messages[locale].home
}

// True when the current path has a direct translated counterpart
// in the requested locale (i.e. the user can land on the same page
// in the other language). False when the only available target is
// the locale home (the user would be sent there as a fallback).
export function hasTranslation(locale, currentPath) {
  if (locale === 'en') return true
  const clean = cleanPath(stripLocale(currentPath))
  return Object.prototype.hasOwnProperty.call(translatedPaths[locale], clean)
}

export function currentLocaleOf(path) {
  // Check for exact locale prefix: /es, /es/, or /es/...
  // Avoid false matches like /esoteric or /escape
  if (path === '/es' || path === '/es/' || path.startsWith('/es/')) return 'es'
  if (path === '/pt-BR' || path === '/pt-BR/' || path.startsWith('/pt-BR/')) return 'pt-BR'
  return 'en'
}

export function pickLocale(navLangs) {
  if (!navLangs) return null
  const list = Array.isArray(navLangs) ? navLangs : [navLangs]
  for (const lang of list) {
    if (!lang) continue
    const lower = String(lang).toLowerCase()
    if (lower.startsWith('pt')) return 'pt-BR'
    if (lower.startsWith('es')) return 'es'
  }
  return null
}
