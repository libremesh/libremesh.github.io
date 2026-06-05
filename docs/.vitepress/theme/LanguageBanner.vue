<script setup>
import { onMounted, ref } from 'vue'
import { inBrowser, useRoute } from 'vitepress'

const STORAGE_KEY = 'libremesh-lang-pref'
const showToast = ref(false)
const targetLocale = ref(null)

const messages = {
  es:     { label: 'Español',          home: '/es/',         hint: 'Esta página también está disponible en Español.',  action: 'Cambiar' },
  'pt-BR': { label: 'Português (BR)',   home: '/pt-BR/',      hint: 'Esta página também está disponível em Português (BR).', action: 'Trocar' }
}

// English pages that have a translated counterpart. When the user
// accepts the toast from one of these, we send them to the matching
// localized page rather than the locale home.
const translatedPaths = {
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

function pickLocale(navLang) {
  if (!navLang) return null
  const lower = navLang.toLowerCase()
  if (lower.startsWith('pt')) return 'pt-BR'
  if (lower.startsWith('es')) return 'es'
  return null
}

function localizedPath(locale, currentPath) {
  const clean = currentPath.replace(/\.html$/, '').replace(/\/$/, '') || '/'
  return translatedPaths[locale][clean] || messages[locale].home
}

const route = useRoute()

onMounted(() => {
  if (!inBrowser) return
  try {
    if (localStorage.getItem(STORAGE_KEY)) return
  } catch (e) { return }

  const path = route.path
  if (path.startsWith('/es') || path.startsWith('/pt-BR')) return

  const locale = pickLocale(navigator.language)
  if (!locale) return

  targetLocale.value = locale
  showToast.value = true
})

function accept() {
  const locale = targetLocale.value
  if (!locale) return
  try { localStorage.setItem(STORAGE_KEY, locale) } catch (e) {}
  window.location.href = localizedPath(locale, route.path)
}

function dismiss() {
  showToast.value = false
  try { localStorage.setItem(STORAGE_KEY, 'dismissed') } catch (e) {}
}
</script>

<template>
  <div v-if="showToast && targetLocale && messages[targetLocale]" class="lang-toast" role="status">
    <span class="lang-toast__msg">{{ messages[targetLocale].hint }}</span>
    <button type="button" class="lang-toast__btn lang-toast__btn--primary" @click="accept">{{ messages[targetLocale].action }}</button>
    <button type="button" class="lang-toast__btn" @click="dismiss" aria-label="Dismiss">×</button>
  </div>
</template>
