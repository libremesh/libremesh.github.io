<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import { messages, targetFor, currentLocaleOf, cleanPath, stripLocale } from './i18n'

const { siteData } = useData()
const route = useRoute()
const open = ref(false)

const currentLocale = computed(() => currentLocaleOf(route.path))
const locales = ['en', 'es', 'pt-BR']

function withBase(path) {
  const base = siteData.value?.base || '/'
  if (path.startsWith('http')) return path
  return base.replace(/\/$/, '') + path
}

function go(locale) {
  window.location.href = withBase(targetFor(locale, route.path))
}

function toggle() { open.value = !open.value }
function close() { open.value = false }

function onDocClick(e) {
  const root = document.getElementById('lang-switcher')
  if (root && !root.contains(e.target)) close()
}

function onKey(e) {
  if (e.key === 'Escape') close()
}

function goesToHome(loc) {
  const clean = cleanPath(stripLocale(route.path))
  return targetFor(loc, route.path) !== clean
}

function removeBuiltInSwitchers() {
  // VitePress renders the language switcher in three places — desktop
  // nav, mobile overflow, and the mobile screen. All three expose
  // /<locale>/<current-path> links that 404 for untranslated pages.
  // We replace them with our own dropdown (rendered via the
  // nav-bar-content-after slot) so the user only ever sees links
  // that actually resolve. This is idempotent so SSR re-renders are
  // covered.
  document.querySelectorAll('.VPNavBarTranslations, .VPNavScreenTranslations, .group.translations, [class*="translations"]')
    .forEach(el => {
      // Skip our own switcher in case the selector matches it.
      if (el.closest('#lang-switcher')) return
      el.remove()
    })
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
  removeBuiltInSwitchers()
  // VitePress SPA-navigates between pages without re-mounting the
  // layout, so the built-in switcher reappears on each navigation.
  // Re-run the cleanup after each route change.
  if (typeof window !== 'undefined' && window.history) {
    const _push = history.pushState.bind(history)
    history.pushState = function (...args) {
      const r = _push(...args)
      setTimeout(removeBuiltInSwitchers, 0)
      return r
    }
    window.addEventListener('popstate', removeBuiltInSwitchers)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="lang-switcher" id="lang-switcher">
    <button
      type="button"
      class="lang-switcher__btn"
      :aria-expanded="open"
      aria-haspopup="true"
      aria-label="Change language"
      @click.stop="toggle"
    >
      <span class="lang-switcher__current">{{ messages[currentLocale].short }}</span>
      <span class="lang-switcher__caret" aria-hidden="true">▾</span>
    </button>
    <div v-if="open" class="lang-switcher__menu" role="menu">
      <button
        v-for="loc in locales"
        :key="loc"
        type="button"
        class="lang-switcher__item"
        role="menuitem"
        :class="{ 'lang-switcher__item--current': loc === currentLocale }"
        :aria-current="loc === currentLocale ? 'true' : undefined"
        @click="go(loc); close()"
      >
        <span class="lang-switcher__item-label">{{ messages[loc].label }}</span>
        <span
          v-if="loc !== currentLocale && goesToHome(loc)"
          class="lang-switcher__item-hint"
          aria-hidden="true"
        >home</span>
      </button>
    </div>
  </div>
</template>
