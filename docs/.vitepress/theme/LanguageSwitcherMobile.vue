<script setup>
import { computed, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import { messages, targetFor, currentLocaleOf, cleanPath, stripBase, stripLocale } from './i18n'

const { site } = useData()
const route = useRoute()
const open = ref(false)

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

function goesToHome(loc) {
  const clean = cleanPath(stripLocale(rootPath.value))
  const home = messages[loc].home
  return targetFor(loc, rootPath.value) === home && clean !== '/'
}
</script>

<template>
  <div
    class="lang-switcher-mobile"
    id="lang-switcher-mobile"
    :class="{ open }"
  >
    <button
      type="button"
      class="title"
      :aria-expanded="open"
      aria-label="Change language"
      @click="open = !open"
    >
      <span class="vpi-languages icon lang" />
      <span class="title-label">{{ messages[currentLocale].label }}</span>
      <span class="vpi-chevron-down icon chevron" />
    </button>
    <ul v-if="open" class="list">
      <li v-for="loc in locales" :key="loc" class="item">
        <button
          type="button"
          class="link"
          :class="{ active: loc === currentLocale }"
          @click="go(loc)"
        >
          <span>{{ messages[loc].label }}</span>
          <span v-if="loc !== currentLocale && goesToHome(loc)" class="link-hint">home</span>
        </button>
      </li>
    </ul>
  </div>
</template>
