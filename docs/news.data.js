import { createContentLoader } from 'vitepress'

export default createContentLoader('news/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData.reverse().filter(i => i.url !== '/news/')
  }
}  
/* options */)