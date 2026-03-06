import { createContentLoader } from 'vitepress'

export default createContentLoader('meetings/**/*.md', {
  transform(rawData) {
    return rawData.reverse().slice(1).filter(i => i[0] !== '')
  }
}/* options */)