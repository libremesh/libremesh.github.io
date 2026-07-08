// import readme from each packages
import fs from 'fs'
import { XMLHttpRequest } from 'xmlhttprequest'

const lime_repo = './lime-packages/'
const lime_pkgs_path = './lime-packages/packages/'
const profile_repo = './network-profiles/'
const feed_repo = "https://feed.libremesh.org/"
let lime_feed = {}
let profiles_feed = {}

function getJsonSync(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url, false);  // `false` makes the request synchronous
  request.send(null);
  if (request.status !== 200) { console.log('unreachable') }
  let res = JSON.parse(request.responseText)
  return res
}

let openwrt = getJsonSync('https://downloads.openwrt.org/.versions.json')
openwrt.branches = {
  "main": "main",
  "stable": openwrt.stable_version?.substr(0,5),
  "oldstable": openwrt.oldstable_version?.substr(0,5)
}

Object.entries(openwrt.branches).forEach(async function ([name, branch]){
  lime_feed[name] = getJsonSync(feed_repo+'master/openwrt-'+branch+'/x86_64/index.json')
  profiles_feed[name] = getJsonSync(feed_repo+'profiles/openwrt-'+branch+'/x86_64/index.json')
})

function readUTF8(file_path) {
  return fs.readFileSync(file_path, { encoding: 'utf-8', flag: 'r'}) || ''
}

function fileExistAndNotEmpty(file_path) {
  if (!fs.existsSync(file_path)) { return false }
  let file = readUTF8(file_path)
  if (file === '') { return false } else { return true }
}

async function copyFiles(from_dir, to_dir, from_file, to_file) {
  let from = from_dir+from_file
  let to = to_file && to_dir+to_file || to_dir+from_file
  fs.mkdirSync(to_dir, {recursive:true})
  if (!fs.existsSync(from)) { return }
  fs.copyFile(from, to, (err) => {
    if (err) throw err;
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

async function generateIndexMd(indexMd_dir, pkg, _descr, _readme, _makefile, _extra) {
  let description = _descr && _descr !== '' && _descr.trim()+'\n' || ''
  let readme = _readme && _readme !== '' && _readme.trim()+'\n' || ''
  let extra = _extra && _extra !== '' && _extra.trim()+'\n' || ''

  let makefile = _makefile &&  _makefile != '' && "## Makefile\n\
```\n\
<!--@include: Makefile-->\n\
```" || ''

  const frontMatter = "---\ntitle: "+pkg+"\n---\n"
  const content = frontMatter+"# "+pkg+"\n\n"+description+"\n"+readme+"\n\
"+makefile+"\n"+extra+"\n"

  fs.writeFileSync(indexMd_dir+pkg+'/index.md', content)
}

function generateBuildInfo(feed, pa, path) {
  Object.entries(openwrt.branches).forEach(([name]) => {
    Object.entries(feed[name].packages).find(p => {
      if (p[0] === pa) {
        fs.writeFileSync('./docs/'+path+'/'+pa+'/.built_'+name, p[1])
      }
    })
  })
}

async function setupPackages() {
  console.log('Copying lime-packages')
  let lime_packages = fs.readdirSync(lime_pkgs_path)

  // add lime-packages
  lime_packages.forEach(async (pa) => {
    if (!fs.lstatSync(lime_pkgs_path+pa).isDirectory()) return 
    if (pa.startsWith('.')) { return }

    const from_dir = lime_pkgs_path+pa+'/'
    const to_dir = './docs/packages/'+pa+'/'
    
    await copyFiles(from_dir, to_dir, 'Makefile')

    if (['lime-app', 'shared-state-async'].includes(pa)) {
      // skip packages with external url
    } else {
      await copyFiles(from_dir, to_dir, 'README.md')
      await copyFiles(from_dir, to_dir, 'README', 'README.md')
      await copyFiles(from_dir, to_dir, 'Readme.md', 'README.md')
      // await copyFiles(from_dir, to_dir, 'README.adoc', 'README.md')
    }

    const makefilePath = to_dir+'/Makefile'
    const readmePath = to_dir+'README.md'
    let readme, makefile, description

    if (fileExistAndNotEmpty(makefilePath)) {

      if (fileExistAndNotEmpty(readmePath)) { 
        readme = readUTF8(readmePath)
        readme = "---\n"+readme.replace(/^# .*/, '')
      }

      makefile = readUTF8(makefilePath)
      if (makefile.includes('description')) {

        const regex = /\/description([\s\S]*?)endef/
        let matches = makefile.match(regex)

        description = matches?.[1] || ''
        if (description === '') {
          const regex2 = /\/description([\s\S\t\t].*?)endef/
          let matches2 = makefile.match(regex2)
          description = matches2?.[1] || ''
        }
        if (description === '') {
          const regex3 = /\/description([\s\S\t]*?)endef/
          let matches3 = makefile.match(regex3)
          description = matches3?.[1] || ''
        }
      }
      generateIndexMd('./docs/packages/', pa, description, readme, makefile)
    }
    
    generateBuildInfo(lime_feed, pa, 'packages')
  })
}

function setupProfiles() {
  console.log('Copying network-profiles communities and packages')
  let profiles_list = []
  let community_list = fs.readdirSync(profile_repo);

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
    if (fileExistAndNotEmpty(readme_path)) {
      readme = readUTF8(readme_path)
      readme = readme.replace(/^# .*/, '')
      generateIndexMd('./docs/profiles/communities/', c, '', readme)
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
      await copyFiles(from_dir+'root/etc/config/', to_dir, 'lime-community')
      await copyFiles(from_dir+'root/etc/config/', to_dir, 'lime-node')

      readme = ''
      let description, makefile, extra = ''

      const makefilePath = to_dir+'/Makefile'
      const readmePath = to_dir+'/README.md'
      const limeCommunityPath = to_dir+'lime-community'
      const limeNodePath = to_dir+'lime-node'

      if (fileExistAndNotEmpty(readmePath)) {
        readme = readUTF8(readmePath)
        readme = "---\n"+readme.replace(/^# .*/, '')
      }

      if (fileExistAndNotEmpty(makefilePath)) {
        makefile = readUTF8(makefilePath)
    
        if (makefile.includes('DESCRIPTION')) {
          description = makefile.match(/PROFILE_DESCRIPTION:=(.*)/)?.[1] || ''
        }

        if (fileExistAndNotEmpty(limeCommunityPath)) {
          let limeCommunity = readUTF8(limeCommunityPath)
          extra = extra+'\n## lime-community\n```\n'+limeCommunity+'\n```\n'
        }
        if (fileExistAndNotEmpty(limeNodePath)) {
          let limeNode = readUTF8(limeNodePath)
          extra = extra+'\n## lime-node\n```\n'+limeNode+'\n```\n'
        }

        generateIndexMd('./docs/profiles/packages/', profile_name, description, readme, makefile, extra)
      }
      generateBuildInfo(profiles_feed, profile_name, 'profiles/packages')
    })
  })
}

// copy VIRTUALIZING.md TESTING.md HACKING.md
async function addRepoDoc() {
  console.log('Copying lime-packages docs')
  const from_dir = lime_repo
  const to_dir = './docs/development/'
  await copyFiles(from_dir, to_dir, 'TESTING.md', 'testing.md')
  await copyFiles(from_dir, to_dir, 'VIRTUALIZING.md', 'virtualizing.md')
  await copyFiles(from_dir, to_dir, 'HACKING.md', 'hacking.md')
  await copyFiles(from_dir, to_dir, 'CONTRIBUTING.md', 'contributing.md')
  await copyFiles(from_dir, './docs/', 'CHANGELOG.md', 'changelog.md')

  await replaceInFile(to_dir+'contributing.md', /]\(TESTING.md\)/, "](testing)")
}

setupPackages()

setupProfiles()

addRepoDoc()
