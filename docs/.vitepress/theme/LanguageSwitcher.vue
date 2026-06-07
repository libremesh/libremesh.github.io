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

// MutationObserver that hides built-in VitePress language switchers
// as soon as they appear in the DOM.
let _switcherObserver = null

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

// Selector for the built-in VitePress language switcher elements
// that we want to suppress (they generate /<locale>/<current-path>
// links that 404 for untranslated pages).
const BUILTIN_SELECTOR = '.VPNavBarTranslations, .VPNavScreenTranslations, .group.translations'

function hideBuiltInSwitchers(root = document) {
  root.querySelectorAll(BUILTIN_SELECTOR).forEach(el => {
    if (el.closest('#lang-switcher') || el.closest('#lang-switcher-mobile')) return
    el.setAttribute('data-lang-hidden', '')
  })
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)

  // Use a MutationObserver to hide built-in VitePress language
  // switchers whenever they appear in the DOM (initial render,
  // SPA navigation, HMR, etc.). This is more robust than
  // monkey-patching history.pushState and does not depend on
  // fragile class-name guesses in CSS.
  hideBuiltInSwitchers()
  _switcherObserver = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue
        if (node.matches?.(BUILTIN_SELECTOR)) {
          if (!node.closest('#lang-switcher') && !node.closest('#lang-switcher-mobile')) {
            node.setAttribute('data-lang-hidden', '')
          }
        }
        // Also check children of added subtrees
        if (node.querySelectorAll) {
          node.querySelectorAll(BUILTIN_SELECTOR).forEach(el => {
            if (el.closest('#lang-switcher') || el.closest('#lang-switcher-mobile')) return
            el.setAttribute('data-lang-hidden', '')
          })
        }
      }
    }
  })
  _switcherObserver.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
  if (_switcherObserver) {
    _switcherObserver.disconnect()
    _switcherObserver = null
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
