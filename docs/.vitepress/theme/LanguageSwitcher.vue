<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vitepress'
import { messages, targetFor, currentLocaleOf, cleanPath, stripLocale } from './i18n'

const route = useRoute()
const open = ref(false)

const currentLocale = computed(() => currentLocaleOf(route.path))
const locales = ['en', 'es', 'pt-BR']

function go(locale) {
  window.location.href = targetFor(locale, route.path)
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

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
  // Remove VitePress's built-in VPNavBarTranslations element so its
  // dead links to /<locale>/<current-path> for untranslated pages
  // never end up in the DOM (bad for crawlers, screen readers, etc).
  // We replace it with our own switcher mounted via the
  // nav-bar-content-after slot.
  document.querySelectorAll('.VPNavBarTranslations').forEach(el => el.remove())
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

function goesToHome(loc) {
  const clean = cleanPath(stripLocale(route.path))
  return targetFor(loc, route.path) !== clean
}
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
