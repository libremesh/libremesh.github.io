<script setup>
import { onMounted, ref } from 'vue'
import { inBrowser, useRoute } from 'vitepress'
import { messages, pickLocale, targetFor } from './i18n'

const STORAGE_KEY = 'libremesh-lang-pref'
const showToast = ref(false)
const targetLocale = ref(null)

const route = useRoute()

onMounted(() => {
  if (!inBrowser) return
  try {
    if (localStorage.getItem(STORAGE_KEY)) return
  } catch (e) { return }

  const path = route.path
  if (path.startsWith('/es') || path.startsWith('/pt-BR')) return

  const locale = pickLocale(navigator.languages || navigator.language)
  if (!locale) return

  targetLocale.value = locale
  showToast.value = true
})

function accept() {
  const locale = targetLocale.value
  if (!locale) return
  try { localStorage.setItem(STORAGE_KEY, locale) } catch (e) {}
  window.location.href = targetFor(locale, route.path)
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
    <button type="button" class="lang-toast__btn" @click="dismiss" :aria-label="messages[targetLocale].dismiss">×</button>
  </div>
</template>
