<script setup>
import { data as meetings } from '/meetings.data.js'
import { useData } from 'vitepress'

const { site, page } = useData()

let meetings_list = meetings

let meeting_years = {}
let prevMeetingYear = ''
meetings_list.forEach(m => {
  
  let meetingYear = m.url.replace(/\/meetings\/.*\//,'').replace('.html','').substring(0,4)
  console.log(meetingYear)

  if (prevMeetingYear === '' || meetingYear > prevMeetingYear) {
    prevMeetingYear = meetingYear
    meeting_years[meetingYear] = []
  } else {
    console.log(m.url)
    if (!meeting_years[meetingYear]) {
     meeting_years[meetingYear] = [] 
    }
    meeting_years[meetingYear].push(m)
  }
})


</script>

# All LibreMesh meetings

<div v-for="year of Object.entries(meeting_years)">
<h2>{{ year[0] }}</h2>
<ul>
  <li v-for="post,i of meeting_years[year[0]].reverse()">
    <a :href="'./'+post.url.replace(`/meetings/`,'').replace(`.html`,'')">
      {{ post.url.replace(/\/meetings\/.*\//,'').replace('.html','') }} - {{ post.frontmatter.title || 'LibreMesh Meeting' }}
    </a>
  </li>
</ul>
</div>