<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import { messages, targetFor, currentLocaleOf, cleanPath, stripBase, stripLocale } from './i18n'

const { site } = useData()
const route = useRoute()
const open = ref(false)

// route.path can include the VitePress base (e.g.
// '/libremesh.github.io/pt-BR/foo') on IS_FORK=1 builds. Strip it
// before passing to the locale helpers, which all expect a
// root-relative path.
const rootPath = computed(() => stripBase(route.path, site.value?.base))

const currentLocale = computed(() => currentLocaleOf(rootPath.value))
const locales = ['en', 'es', 'pt-BR']

function withBase(path) {
  const base = site.value?.base || '/'
  if (path.startsWith('http')) return path
  return base.replace(/\/$/, '') + path
}

function go(locale) {
  window.location.href = withBase(targetFor(locale, rootPath.value))
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

// True when clicking this locale would land on the locale home
// (a fallback) rather than the equivalent translated page.
function goesToHome(loc) {
  const clean = cleanPath(stripLocale(rootPath.value))
  const home = messages[loc].home
  const target = targetFor(loc, rootPath.value)
  return target === home && clean !== '/'
}

function removeBuiltInSwitchers() {
  // VitePress renders the language switcher in three places — desktop
  // nav, mobile overflow, and the mobile screen. All three expose
  // /<locale>/<current-path> links that 404 for untranslated pages.
  // We replace them with our own dropdown (rendered via the
  // nav-bar-content-after slot) so the user only ever sees links
  // that actually resolve. This is idempotent so SSR re-renders are
  // covered.
  document.querySelectorAll('.VPNavBarTranslations, .VPNavScreenTranslations, .group.translations')
    .forEach(el => {
      if (el.closest('#lang-switcher') || el.closest('#lang-switcher-mobile')) return
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
  if (typeof window !== 'undefined') {
    window.removeEventListener('popstate', removeBuiltInSwitchers)
  }
})
</script>

<template>
  <div
    class="VPFlyout lang-switcher"
    id="lang-switcher"
    :class="{ active: open }"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="messages[currentLocale].changeLanguage"
      @click="toggle"
    >
      <span class="text">
        <span class="vpi-languages option-icon" />
        <span class="vpi-chevron-down text-icon" />
      </span>
    </button>

    <div class="menu">
      <div class="VPMenu">
        <div class="items">
          <button
            v-for="loc in locales"
            :key="loc"
            type="button"
            class="link"
            :class="{ active: loc === currentLocale }"
            @click="go(loc); close()"
          >
            <span class="link-text">{{ messages[loc].label }}</span>
            <span v-if="loc !== currentLocale && goesToHome(loc)" class="link-hint">home</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
