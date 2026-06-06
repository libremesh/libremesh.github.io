// Shared between LanguageBanner.vue (first-visit toast) and
// LanguageSwitcher.vue (nav dropdown). When a new page is
// translated in both English and one of the locales, add an entry
// here so both UIs take the user to the matching page.

export const LOCALE_PREFIXES = ['/es', '/pt-BR']

export const messages = {
  en:    { label: 'English',          short: 'EN', home: '/' },
  es:    { label: 'Español',          short: 'ES', home: '/es/' },
  'pt-BR': { label: 'Português (BR)', short: 'PT', home: '/pt-BR/' }
}

export const translatedPaths = {
  es: {
    '/what-is-libremesh':    '/es/what-is-libremesh',
    '/getting-started':      '/es/getting-started',
    '/features':             '/es/features',
    '/guide/connecting':     '/es/guide/connecting',
  },
  'pt-BR': {
    '/what-is-libremesh':    '/pt-BR/what-is-libremesh',
    '/getting-started':      '/pt-BR/getting-started',
    '/features':             '/pt-BR/features',
    '/guide/connecting':     '/pt-BR/guide/connecting',
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

export function cleanPath(path) {
  return path.replace(/\.html$/, '').replace(/\/$/, '') || '/'
}

export function targetFor(locale, currentPath) {
  const clean = cleanPath(stripLocale(currentPath))
  if (locale === 'en') return clean
  return translatedPaths[locale][clean] || messages[locale].home
}

export function currentLocaleOf(path) {
  if (path.startsWith('/es')) return 'es'
  if (path.startsWith('/pt-BR')) return 'pt-BR'
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
