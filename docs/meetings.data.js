import { createContentLoader } from 'vitepress'

export default createContentLoader('meetings/*/*.md', {
  transform(rawData) {
    return rawData
  }
}/* options */)