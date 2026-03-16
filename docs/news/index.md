<script setup>
import { data as news } from '/news.data.js'
import { useData } from 'vitepress'

const { site } = useData()

let news_list = news
</script>

# News

<ul>
  <li v-for="post,i of news_list">
    <a :href="post.url">
      {{ post.url.match(`.*/(.*?).html`)?.[1] }}{{ post.frontmatter.title  && (' - '+post.frontmatter.title) || '' }}
    </a>
  </li>
</ul>
