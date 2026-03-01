// import readme from each packages
import fs, { read } from 'fs'
import { glob } from 'glob'

import downdoc from 'downdoc'
import { profile } from 'console'

const lime_repo = './lime-packages/'
const lime_pkgs_path = './lime-packages/packages/'
const profile_repo = './network-profiles/'

let lime_packages = fs.readdirSync(lime_pkgs_path)

let lime_feed = {
  main: await (await fetch('https://feed.libremesh.org/master/openwrt-main/x86_64/index.json')).json(),
  stable: await (await fetch('https://feed.libremesh.org/master/openwrt-24.10/x86_64/index.json')).json(),
  oldstable: await (await fetch('https://feed.libremesh.org/master/openwrt-23.05/x86_64/index.json')).json()
}

let profiles_feed = {
   main: await (await fetch('https://feed.libremesh.org/profiles/openwrt-main/x86_64/index.json')).json(),
   stable: await (await fetch('https://feed.libremesh.org/profiles/openwrt-24.10/x86_64/index.json')).json(),
   oldstable: await (await fetch('https://feed.libremesh.org/profiles/openwrt-23.05/x86_64/index.json')).json()
}

async function copyFiles(from_dir, to_dir, from_file, to_file) {
  let from = from_dir+from_file
  let to = to_file && to_dir+to_file || to_dir+from_file
  fs.mkdirSync(to_dir, {recursive:true})
  if (!fs.existsSync(from)) { return }
  // if (from_file.endsWith('adoc')) {
  //   let tmp_from = '/tmp/.vitepress-tmp'
  //   fs.writeFileSync(tmp_from,downdoc(fs.readFileSync(from)))
  //   from = tmp_from
  // }
  fs.copyFile(from, to, (err) => {
    if (err) throw err;
    console.log('File '+to+' was copied to destination');
  })
}

async function replaceInFile(file,pattern,replace) {
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(pattern, replace);
  
    fs.writeFile(file, result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
}

async function generateIndexMd(indexMd_dir, pkg, ds, readme, mf) {
  let description = ds.trim()
  let makefile = mf != '' && "## Makefile\n\
```\n\
<!--@include: Makefile-->\n\
```" || ''

  const fm = "---\ntitle: "+pkg+"\n---\n"
  const content = "# {{ $frontmatter.title }}\n\
  \n\
  "+description+"\n\
  \n\
  "+readme+"\n\
  \n\
  "+makefile+"\n"

  const file = fm+content

  fs.writeFileSync(indexMd_dir+pkg+'/index.md', file)
}


// add lime-packages
lime_packages.forEach(async (pa) => {
  if (!fs.lstatSync(lime_pkgs_path+pa).isDirectory()) return 
  if (pa.startsWith('.')) { return }

  console.log(pa)

  const from_dir = lime_pkgs_path+pa+'/'
  const to_dir = './docs/packages/'+pa+'/'
  
  const makefile_path = to_dir+'/Makefile'
  const makefileExist = fs.existsSync(makefile_path)
  const readme_path = to_dir+'/README.md'
  const readmeExist = fs.existsSync(readme_path)
  let readme = ''
  let description = ''
  let makefile = ''

  await copyFiles(from_dir, to_dir, 'Makefile')
  await copyFiles(from_dir, to_dir, 'README.md')
  // copyFiles(from_dir, to_dir, 'README', 'README.md')
  // copyFiles(from_dir, to_dir, 'Readme.md', 'README.md')
  // copyFiles(from_dir, to_dir, 'README.adoc', 'README.md')


  if (readmeExist) {
    readme = fs.readFileSync(readme_path, { encoding: 'utf-8', flag: 'r'}) || ''
    if (readme !== '') {
      readme = "---\n"+readme.replace(/^# .*/, '')
    }
  }

  if (makefileExist) {
    makefile = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || ''

    if (makefile !== '' && makefile.includes('description')) {
      const regex = /\/description([\s\S]*?)endef/
      // let makefile_cleaned = makefile.replace(/^\s*['"]?/g, '').replace(/['"]?\s*$/, '').replace('/(\s*\+\s*)/g','')
      // let makefile_cleaned = makefile.replace(', '')
      // console.log(makefile)
      
      let matches = makefile.match(regex)
      // console.log(matches)

      description = matches?.[1] || ''
      if (description === '') {
        console.log('regex2')
        const regex2 = /\/description([\s\S\t\t].*?)endef/
        let matches2 = makefile.match(regex2)
        console.log(matches2)
        description = matches2?.[1] || ''
      }
      if (description === '') {
        console.log('regex3')
        const regex3 = /\/description([\s\S\t]*?)endef/
        let matches3 = makefile.match(regex3)
        console.log(matches3)
        description = matches3?.[1] || ''
      }
    }

    generateIndexMd('./docs/packages/', pa, description, readme, makefile)
  }

  Object.entries(lime_feed.main.packages).find(p => {
    if (p[0] === pa) {
      fs.writeFileSync('./docs/packages/'+pa+'/.built_main', p[1])
    }
  }) 
  Object.entries(lime_feed.stable.packages).find(p => {
    if (p[0] === pa) {
      fs.writeFileSync('./docs/packages/'+pa+'/.built_stable', p[1])
    }
  }) 
  Object.entries(lime_feed.oldstable.packages).find(p => {
    if (p[0] === pa) {
      fs.writeFileSync('./docs/packages/'+pa+'/.built_oldstable', p[1])
    }
  }) 
})


function setupProfiles() {
  // let profiles = []
  let profiles_list = []
  let community_list = fs.readdirSync(profile_repo);
  // community_list = community_list.filter

  community_list.forEach(async (c) => {
    if (!fs.lstatSync(profile_repo+c).isDirectory()) return 
    if (c.startsWith('.')) { return }
    const community_path = profile_repo+c+'/'
    if (!fs.existsSync(profile_repo)) { return }
    const community_files = fs.readdirSync(community_path)

    const from_dir = profile_repo+c+'/'
    const to_dir = './docs/profiles/communities/'+c+'/'

    // await copyFiles(from_dir, to_dir, 'README.md')
    await copyFiles(from_dir, to_dir, 'README.md')


    let readme = ''
    const readme_path = to_dir+'/README.md'
    const readmeExist = fs.existsSync(readme_path)

    if (readmeExist) {
      readme = fs.readFileSync(readme_path, { encoding: 'utf-8', flag: 'r'}) || ''
      if (readme !== '') {
        readme = "---\n"+readme.replace(/^# .*/, '')
        generateIndexMd('./docs/profiles/communities/', c, '', readme, '')

      }
    }

    community_files.forEach(async (cf) => {

      // copy community assets
      if (!fs.lstatSync(profile_repo+c+'/'+cf).isDirectory()) { 
        const from_dir = profile_repo+c+'/'
        const to_dir = './docs/profiles/communities/'+c+'/'
  
          await copyFiles(from_dir, to_dir, cf)
          return
      }

      // copy profiles
      if (c.startsWith('.')) { return }
      const profile_name = 'profile-'+c+'-'+cf
      profiles_list.push(profile_name)

      const from_dir = profile_repo+c+'/'+cf+'/'
      const to_dir = './docs/profiles/packages/'+profile_name+'/'

      await copyFiles(from_dir, to_dir, 'Makefile')
      await copyFiles(from_dir, to_dir, 'README.md')

      let readme = ''
      let description = ''
      let makefile = ''
      const makefile_path = to_dir+'/Makefile'
      const makefileExist = fs.existsSync(makefile_path)
      const readme_path = to_dir+'/README.md'
      const readmeExist = fs.existsSync(readme_path)

      if (readmeExist) {
        readme = fs.readFileSync(readme_path, { encoding: 'utf-8', flag: 'r'}) || ''
        if (readme !== '') {
          readme = "---\n"+readme.replace(/^# .*/, '')
        }
      }

      if (makefileExist) {
        makefile = fs.readFileSync(makefile_path, { encoding: 'utf-8', flag: 'r'}) || ''
    
        if (makefile !== '' && makefile.includes('DESCRIPTION')) {
          description = makefile.match(/PROFILE_DESCRIPTION\:\=(.*)/)?.[1] || ''
        }
    
        generateIndexMd('./docs/profiles/packages/', profile_name, description, readme, makefile)
      }

      Object.entries(profiles_feed.main.packages).find(p => {
        if (p[0] === profile_name) {
          fs.writeFileSync(to_dir+'.built_main', p[1])
        }
      }) 
      Object.entries(profiles_feed.stable.packages).find(p => {
        if (p[0] === profile_name) {
          fs.writeFileSync(to_dir+'.built_stable', p[1])
        }
      }) 
      Object.entries(profiles_feed.oldstable.packages).find(p => {
        if (p[0] === profile_name) {
          fs.writeFileSync(to_dir+'.built_oldstable', p[1])
        }
      })

    })
  })
  console.log(profiles_list)
}

// copy VIRTUALIZING.md TESTING.md HACKING.Md
async function addRepoDoc() {
  const from_dir = lime_repo
  const to_dir = './docs/development/'
  await copyFiles(from_dir, to_dir, 'TESTING.md', 'testing.md')
  await copyFiles(from_dir, to_dir, 'VIRTUALIZING.md', 'virtualizing.md')
  await copyFiles(from_dir, to_dir, 'HACKING.md', 'hacking.md')
  await copyFiles(from_dir, to_dir, 'CONTRIBUTING.md', 'contributing.md')
  await replaceInFile(to_dir+'/contributing.md', /]\(TESTING.md\)/, "](testing)")
  await copyFiles(from_dir, './docs/', 'CHANGELOG.md', 'changelog.md')
}


setupProfiles()

addRepoDoc()
