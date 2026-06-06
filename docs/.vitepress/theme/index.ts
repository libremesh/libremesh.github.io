// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { redirects } from './redirects'
import LayoutWide from './LayoutWide.vue'
import LanguageBanner from './LanguageBanner.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'wide': () => h(LayoutWide),
      'page-bottom': () => h(LanguageBanner),
      'nav-bar-content-after': () => h(LanguageSwitcher)
    })
  },
  enhanceApp({ app, router, siteData }) {

    // add layout
    app.component('wide', LayoutWide)

    // preserve old links
    router.onBeforeRouteChange = (to: string) => {
      const path = to.replace(/\.html$/i, ''),
          toPath = redirects[path];

      if (toPath) {
          setTimeout(() => { router.go(toPath); })
          return false;
      } else {
          return true;
      }
    }
  }
} satisfies Theme
