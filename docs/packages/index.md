---
sidebar: false
layout: page
---

<script setup>
import { data as openwrt } from '/openwrt.data.js'
import { data as packages } from '/packages.data.js'
import { useData } from 'vitepress'

// import { data as packages } from '/packages.data.js'

// console.log(packages)
openwrt.stable_branch = openwrt.stable_version.substr(0,5)
openwrt.oldstable_branch = openwrt.oldstable_version.substr(0,5)

const { site, page } = useData()

let packages_list = packages
</script>

---

<div class="vp-doc">
  <div style="margin:0 auto; width: 90vw">
    <h1 style="padding:1em 0">Packages</h1>
    <v-table>
      <thead>
        <tr>
          <th style="min-width: 25em">Package</th>
          <th>Version (stable)</th>
          <th>Category</th>
          <th style="min-width: 16em">Built OpenWrt branch</th>
          <th style="min-width: 15em">License</th>
          <th>Architecture</th>
          <th style="min-width: 15em">Maintainer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p of packages_list.packages">
          <td><a :href="site.base+'packages/'+p.name">{{ p.name }}</a></td>
          <td>{{ p.version_stable }}</td>
          <td>{{ p.category }}</td>
          <td>
            {{ p.built_main && '️✅' || '❌' }} main,  
            {{ p.built_stable && '️✅' || '❌' }} {{ openwrt.stable_branch }}, 
            {{ p.built_oldstable && '️✅' || '❌' }} {{ openwrt.oldstable_branch }} 
          </td>
          <td>{{ p.license }}</td>
          <td>{{ p.pkgarch }}</td>
          <td>{{ p.maintainer.replace(/ <.*>/, '') }}</td>
        </tr>
      </tbody>
    </v-table>

  </div>
</div>