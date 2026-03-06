---
aside: false
---

<script setup>
import { data as openwrt } from '/openwrt.data.js'
// import { data as packages } from '/packages.data.js'

// console.log(packages)
openwrt.stable_branch = openwrt.stable_version.substr(0,5)
openwrt.oldstable_branch = openwrt.oldstable_version.substr(0,5)

let arch = 'mips_24kc'
let target ='ath79-generic'
let _target =target.replace('-','/')

function version_path(version) { 
    if (version === "SNAPSHOT") { return "snapshots" }
    return "releases/"+version
}
function download_path(version) { return version_path(version)+"/targets/"+_target}

const build = {
    arch: arch,
    target: target,
    file_host: "https://downloads.openwrt.org",
    download_file: "imagebuilder-.*x86_64.tar.[xz|zst]"
}


</script>

# ImageBuilder

[[toc]]

Refers to the OpenWrt wiki [Using the Image Builder](https://openwrt.org/docs/guide-user/additional-software/imagebuilder)
for detailed options

::: tip
Find the `target-subtarget` of your device using the [OpenWrt's Table of Hardware](https://toh.openwrt.org) or the [firmware-selector](https://firmware-selector.libremesh.org)
:::


## Setup 

Export to the environment the `target-subtarget` and the package `architecture`
``` sh-vue
export TARGET={{ build.target }}
export ARCH=$(curl -s https://downloads.openwrt.org/snapshots/.targets.json | \
    sed 's/\//-/' | jq -r '."${TARGET}"')
```

### Build on Debian
Refers to the OpenWrt wiki [Using the Image Builder](https://openwrt.org/docs/guide-user/additional-software/imagebuilder)

- Install the [OpenWrt ImageBuilder Debian prerequisites](https://openwrt.org/docs/guide-user/additional-software/imagebuilder#debianubuntumint)

- Download the imagebuilder of your choice, extract it and enter in its directory.

::: code-group

```sh-vue [{{ openwrt.stable_version }} (stable)]
FILE_HOST="{{build.file_host}}"
DOWNLOAD_PATH="{{download_path(openwrt.stable_version)}}"
DOWNLOAD_FILE="{{build.download_file}}"

mkdir imagebuilder; cd imagebuilder
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/sha256sums" -O sha256sums
file_name="$(grep "$DOWNLOAD_FILE" sha256sums | cut -d "*" -f 2)"
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/$file_name"
tar xf "$file_name" --strip=1 --no-same-owner -C .
```

```sh-vue [{{ openwrt.oldstable_version }} (oldstable)]
FILE_HOST="{{build.file_host}}"
DOWNLOAD_PATH="{{download_path(openwrt.oldstable_version)}}"
DOWNLOAD_FILE="{{build.download_file}}"

mkdir imagebuilder; cd imagebuilder
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/sha256sums" -O sha256sums
file_name="$(grep "$DOWNLOAD_FILE" sha256sums | cut -d "*" -f 2)"
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/$file_name"
tar xf "$file_name" --strip=1 --no-same-owner -C .
```

```sh-vue [SNAPSHOT]
FILE_HOST="{{build.file_host}}"
DOWNLOAD_PATH="{{download_path("SNAPSHOT")}}"
DOWNLOAD_FILE="{{build.download_file}}"

mkdir imagebuilder; cd imagebuilder
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/sha256sums" -O sha256sums
file_name="$(grep "$DOWNLOAD_FILE" sha256sums | cut -d "*" -f 2)"
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/$file_name"
tar xf "$file_name" --strip=1 --no-same-owner -C .
```

:::


### Build on Docker

Start an ImageBuilder of your choice, for example {{ build.target }} if your device is supported within it

::: code-group

```sh-vue [{{ openwrt.stable_version }} (stable)]
mkdir ./images/
docker run -it \
    -e TARGET=$TARGET \
    -e ARCH=$ARCH \
    -v $(pwd)/config/:/builder/files/etc/config/ \
    -v $(pwd)/images:/images/ \
    ghcr.io/openwrt/imagebuilder:$TARGET-v{{ openwrt.stable_version }}
```

```sh-vue [{{ openwrt.oldstable_version }} (oldstable)]
mkdir ./images/
docker run -it \
    -e TARGET=$TARGET \
    -e ARCH=$ARCH \
    -v $(pwd)/config/:/builder/files/etc/config/ \
    -v $(pwd)/images:/images/ \
    ghcr.io/openwrt/imagebuilder:$TARGET-v{{ openwrt.oldstable_version }}
```

```sh-vue [SNAPSHOT]
mkdir ./images/
docker run -it \
    -e TARGET=$TARGET \
    -e ARCH=$ARCH \
    -v $(pwd)/config/:/builder/files/etc/config/ \
    -v $(pwd)/images:/images/ \
    ghcr.io/openwrt/imagebuilder:$TARGET
```

:::

## Add LibreMesh feeds

Within the container add the `lime-packages` feeds.
::: code-group


```sh-vue [openwrt-{{ openwrt.stable_branch }} (stable)]
cat << EOF >> repositories
https://feed.libremesh.org/master/openwrt-{{ openwrt.stable_branch }}/x86_64/packages.adb
https://feed.libremesh.org/master/openwrt-{{ openwrt.stable_branch }}/$ARCH/packages.adb
https://feed.libremesh.org/profiles/openwrt-{{ openwrt.stable_branch }}/x86_64/packages.adb
EOF

cat << EOF > keys/libremesh.pem
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEdFJZ2qVti49Ol8LJZYuxgOCLowBS
8bI86a7zqhSbs5yon3JON7Yee7CQOgqwPOX5eMALGOu8iFGAqIRx5YjfYA==
-----END PUBLIC KEY-----
EOF
```

```sh-vue [openwrt-{{ openwrt.oldstable_branch }} (oldstable)]
cat << EOF >> repositories.conf
src/gz libremesh_packages https://feed.libremesh.org/master/openwrt-{{ openwrt.oldstable_branch }}/x86_64
src/gz libremesh_arch_packages https://feed.libremesh.org/master/openwrt-{{ openwrt.oldstable_branch }}/$ARCH
src/gz profiles https://feed.libremesh.org/profiles/openwrt-{{ openwrt.oldstable_branch }}/x86_64
EOF

cat << EOF > keys/a71b3c8285abd28b
untrusted comment: signed by libremesh.org key a71b3c8285abd28b
RWSnGzyChavSiyQ+vLk3x7F0NqcLa4kKyXCdriThMhO78ldHgxGljM/8
EOF
```

```sh-vue [apk - openwrt-SNAPSHOT]
cat << EOF >> repositories
https://feed.libremesh.org/master/openwrt-main/x86_64/packages.adb
https://feed.libremesh.org/master/openwrt-main/$ARCH/packages.adb
https://feed.libremesh.org/profiles/openwrt-main/x86_64/packages.adb
EOF

cat << EOF > keys/libremesh.pem
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEdFJZ2qVti49Ol8LJZYuxgOCLowBS
8bI86a7zqhSbs5yon3JON7Yee7CQOgqwPOX5eMALGOu8iFGAqIRx5YjfYA==
-----END PUBLIC KEY-----
EOF
```

:::

## Custom files
Ideally add your own `lime-community` files within the container in the folder `./files/etc/config/`.    
To find all possible options consult the [`Configuration`][/reference/configuration] page.    

Now create an image of your choice, to see the names of supported profiles run
`make info` first.


## Build

```sh
make image \
    PROFILE=ubnt_unifi \
    BIN_DIR=/images \
    FILES=files \
    PACKAGES="-dnsmasq -odhcpd-ipv6only \
        lime-system lime-proto-babeld lime-proto-batadv lime-proto-anygw \
        lime-hwd-openwrt-wan lime-hwd-ground-routing \
        babeld-auto-gw-mode check-date-http batctl-default \
        lime-app lime-debug lime-docs lime-docs-minimal \
        shared-state-babeld_hosts shared-state-bat_hosts \
        shared-state-dnsmasq_hosts shared-state-nodes_and_links" 
```

### Build using Network Profiles

Refers to [Network Profiles](/guide/network-profiles)

```sh
make image \
    PROFILE=ubnt_unifi \
    BIN_DIR=/images \
    FILES=files \
    PACKAGES="-dnsmasq -odhcpd-ipv6only profile-libremesh-suggested-packages"
```
