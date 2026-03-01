// import { glob } from 'glob'
import fs from 'fs'

export default {
  async load() {
    let packages = []
    let packages_list = fs.readdirSync('docs/packages/');
    let profiles = []
    let profiles_list = fs.readdirSync('docs/profiles/packages/')


    packages_list.forEach(p => {

      // const libremesh_mk_path = '../lime-packages/libremesh.mk'
      const makefile_path = 'docs/packages/'+p+'/Makefile'
      if (!fs.existsSync(makefile_path)) { return }
      // const libremesh_mk = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || '';
      let makefile = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || '';
      let pkgarch = makefile.match(/PKGARCH\:\=(.*)/)?.[1] || ''
      let maintainer = makefile.match(/MAINTAINER\:\=(.*)/)?.[1] || ''
      let license = makefile.match(/PKG_LICENSE\:\=(.*)/)?.[1] || ''
      if (license === '') {
        license = makefile.match(/SPDX-License-Identifier\:(.*)/)?.[1] || ''
      }
      // if (license === '') {
      //   license = libremesh_mk.match(/PKG_LICENSE\:(.*)/)?.[1] || ''
      // }
      let section = makefile.match(/SECTION\:\=(.*)/)?.[1] || ''
      let category = makefile.match(/CATEGORY\:\=(.*)/)?.[1] || ''

      let built_main = fs.existsSync('docs/packages/'+p+'/.built_main')
      let built_stable = fs.existsSync('docs/packages/'+p+'/.built_stable')
      let built_oldstable = fs.existsSync('docs/packages/'+p+'/.built_oldstable')

      let version_stable = built_stable && fs.readFileSync('docs/packages/'+p+'/.built_stable', { encoding: 'utf-8', flag: 'r'}) || ''

      packages.push({
        name: p,
        version_stable: version_stable,
        makefile: makefile,
        pkgarch: pkgarch,
        maintainer: maintainer,
        license: license,
        section: section,
        category: category,
        built_main: built_main,
        built_stable: built_stable,
        built_oldstable: built_oldstable
      })
    })
    // console.log(packages)



    profiles_list.forEach(p => {
      console.log(p)

      const profile_path = 'docs/profiles/packages/'+p+'/'
      const makefile_path = 'docs/profiles/packages/'+p+'/Makefile'
      if (!fs.existsSync(makefile_path)) { return }
      let makefile = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || '';
      let description = makefile.match(/PROFILE_DESCRIPTION\:\=(.*)/)?.[1] || ''

      let built_main = fs.existsSync(profile_path+'.built_main') || ''
      let built_stable = fs.existsSync(profile_path+'.built_stable') || null
      let built_oldstable = fs.existsSync(profile_path+'.built_oldstable') || ''

      let version_stable = built_stable && fs.readFileSync(profile_path+'.built_stable', { encoding: 'utf-8', flag: 'r'}) || ''

      // let license = makefile.match(/PKG_LICENSE\:\=(.*)/)?.[1] || ''
      // if (license === '') {
      //   license = makefile.match(/SPDX-License-Identifier\:(.*)/)?.[1] || ''
      // }

      profiles.push({
        name: p,
        version_stable: version_stable,
        makefile: makefile,
        description: description,
        // pkgarch: pkgarch,
        // maintainer: maintainer,
        // license: license,
        // section: section,
        // category: category,
        built_main: built_main,
        built_stable: built_stable,
        built_oldstable: built_oldstable
      })
    })
    console.log(profiles)


    return { packages, profiles }

  }
}
