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
