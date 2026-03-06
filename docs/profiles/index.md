---
sidebar: false
layout: page
---
<script setup>
import { data as openwrt } from '/openwrt.data.js'
import { data as profiles } from '/packages.data.js'
import { useData } from 'vitepress'

const { site, page } = useData()

openwrt.stable_branch = openwrt.stable_version.substr(0,5)
openwrt.oldstable_branch = openwrt.oldstable_version.substr(0,5)

let packages_list = profiles
</script>

---

<div class="vp-doc">
  <div style="margin:0 auto; width: 90vw">
    <h1 style="padding:1em 0">Profiles</h1>
    <v-table>
      <thead>
        <tr>
          <th style="min-width: 25em">Profile</th>
          <th>Version (stable)</th>
          <!-- <th>Category</th> -->
          <th style="min-width: 16em">Built OpenWrt branch</th>
          <!-- <th style="min-width: 15em">License</th>
          <th>Architecture</th>
          <th style="min-width: 15em">Maintainer</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="p of packages_list.profiles">
          <td><a :href="site.base+'profiles/packages/'+p.name">{{ p.name }}</a></td>
          <td>{{ p.version_stable }}</td>
          <!-- <td>{{ p.category }}</td> -->
          <td>
            {{ p.built_main && '️✅' || '❌' }} main,  
            {{ p.built_stable && '️✅' || '❌' }} {{ openwrt.stable_branch }}, 
            {{ p.built_oldstable && '️✅' || '❌' }} {{ openwrt.oldstable_branch }}
          </td>
          <!-- <td>{{ p.license }}</td>
          <td>{{ p.pkgarch }}</td>
          <td>{{ p.maintainer.replace(/ <.*>/, '') }}</td> -->
        </tr>
      </tbody>
    </v-table>

  </div>
</div>