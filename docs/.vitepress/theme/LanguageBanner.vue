<script setup>
import { onMounted, ref } from 'vue'
import { inBrowser, useRoute } from 'vitepress'

const STORAGE_KEY = 'libremesh-lang-pref'
const dismissed = ref(true)
const detectedLocale = ref(null)

const messages = {
  es: {
    label: 'Español',
    href: (path) => '/es' + (path === '/' ? '/' : path)
  },
  'pt-BR': {
    label: 'Português (BR)',
    href: (path) => '/pt-BR' + (path === '/' ? '/' : path)
  }
}

function pickLocale(navLang) {
  if (!navLang) return null
  const lower = navLang.toLowerCase()
  if (lower.startsWith('pt')) return 'pt-BR'
  if (lower.startsWith('es')) return 'es'
  return null
}

function stripLocalePrefix(path) {
  if (path.startsWith('/es/') || path === '/es') return path.replace(/^\/es/, '') || '/'
  if (path.startsWith('/pt-BR/') || path === '/pt-BR') return path.replace(/^\/pt-BR/, '') || '/'
  return path
}

onMounted(() => {
  if (!inBrowser) return
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dismissed') return
    if (stored && messages[stored]) return
  } catch (e) { return }

  const locale = pickLocale(navigator.language)
  if (!locale) return

  const route = useRoute()
  const currentPath = stripLocalePrefix(route.path)
  if (currentPath.startsWith('/es') || currentPath.startsWith('/pt-BR')) return

  detectedLocale.value = locale
  dismissed.value = false
})

function dismiss() {
  dismissed.value = true
  try { localStorage.setItem(STORAGE_KEY, 'dismissed') } catch (e) {}
}

function accept() {
  const locale = detectedLocale.value
  if (!locale) return
  try { localStorage.setItem(STORAGE_KEY, locale) } catch (e) {}
  const route = useRoute()
  const target = messages[locale].href(stripLocalePrefix(route.path))
  window.location.href = target
}
</script>

<template>
  <div v-if="detectedLocale && !dismissed" class="lang-banner" role="region" aria-label="Language suggestion">
    <span class="lang-banner__msg">
      This site is also available in
      <strong>{{ messages[detectedLocale].label }}</strong>.
    </span>
    <span class="lang-banner__actions">
      <button type="button" class="lang-banner__btn lang-banner__btn--primary" @click="accept">
        Switch language
      </button>
      <button type="button" class="lang-banner__btn" @click="dismiss">
        Stay in English
      </button>
    </span>
  </div>
</template>
