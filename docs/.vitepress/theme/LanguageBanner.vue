<script setup>
import { onMounted, ref } from 'vue'
import { inBrowser, useRoute } from 'vitepress'

const STORAGE_KEY = 'libremesh-lang-pref'
const showToast = ref(false)
const targetLocale = ref(null)

const messages = {
  es:     { label: 'Español',          path: '/es/' },
  'pt-BR': { label: 'Português (BR)',   path: '/pt-BR/' }
}

function pickLocale(navLang) {
  if (!navLang) return null
  const lower = navLang.toLowerCase()
  if (lower.startsWith('pt')) return 'pt-BR'
  if (lower.startsWith('es')) return 'es'
  return null
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
  window.location.href = messages[locale].path
}

function dismiss() {
  showToast.value = false
  try { localStorage.setItem(STORAGE_KEY, 'dismissed') } catch (e) {}
}
</script>

<template>
  <div v-if="showToast && targetLocale && messages[targetLocale]" class="lang-toast" role="status">
    <span class="lang-toast__msg">
      Available in <strong>{{ messages[targetLocale].label }}</strong>?
    </span>
    <button type="button" class="lang-toast__btn lang-toast__btn--primary" @click="accept">Switch</button>
    <button type="button" class="lang-toast__btn" @click="dismiss" aria-label="Dismiss">×</button>
  </div>
</template>
