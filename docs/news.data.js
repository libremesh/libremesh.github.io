import { createContentLoader } from 'vitepress'

export default createContentLoader('news/*.md', {
  excerpt: true,
}/* options */)