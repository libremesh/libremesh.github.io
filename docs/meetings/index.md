<script setup>
import { data as meetings } from '/meetings.data.js'
import { useData } from 'vitepress'

const { site, page } = useData()

let meetings_list = meetings
let years = {}
let prevYear = 0
meetings_list.forEach(m => {
  let nextYear = m.url.match(`.*/(.*?).html`)?.[1].substring(0,4)
  if (!years[nextYear]) { years[nextYear] = [] }
  years[nextYear].push(m)
  prevYear = nextYear
})
</script>

# All LibreMesh meetings

<div v-for="year of Object.entries(years)">
<h2>{{ year[0] }}</h2>
<ul>
  <li v-for="post,i of years[year[0]]">
    <a :href="post.url">
      {{ post.url.match(`.*/(.*?).html`)?.[1] }} - {{ post.frontmatter.title || 'LibreMesh Meeting' }}
    </a>
  </li>
</ul>
</div>