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

Consulte la wiki de OpenWrt [Uso del Image Builder](https://openwrt.org/docs/guide-user/additional-software/imagebuilder)
para obtener opciones detalladas

::: tip
Encuentra el `target-subtarget` de tu dispositivo usando la [Tabla de Hardware de OpenWrt](https://toh.openwrt.org) o el [firmware-selector](https://firmware-selector.libremesh.org)
:::


## Configuración

Exporta al entorno el `target-subtarget` y el paquete `architecture`
``` sh-vue
export TARGET={{ build.target }}
export ARCH=$(curl -s https://downloads.openwrt.org/snapshots/.targets.json | \
    sed 's/\//-/' | jq -r '.\"\${TARGET}\"')
```

### Compilación en Debian
Consulte la wiki de OpenWrt [Uso del Image Builder](https://openwrt.org/docs/guide-user/additional-software/imagebuilder)

- Instale los [prerrequisitos de OpenWrt ImageBuilder para Debian](https://openwrt.org/docs/guide-user/additional-software/imagebuilder#debianubuntumint)

- Descargue el imagebuilder de su elección, extráigalo e ingrese a su directorio.

::: code-group

```sh-vue [{{ openwrt.stable_version }} (estable)]
FILE_HOST="{{build.file_host}}"
DOWNLOAD_PATH="{{download_path(openwrt.stable_version)}}"
DOWNLOAD_FILE="{{build.download_file}}"

mkdir imagebuilder; cd imagebuilder
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/sha256sums" -O sha256sums
file_name="$(grep "$DOWNLOAD_FILE" sha256sums | cut -d "*" -f 2)"
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/$file_name"
tar xf "$file_name" --strip=1 --no-same-owner -C .
```

```sh-vue [{{ openwrt.oldstable_version }} (antigua estable)]
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
DOWNLOAD_PATH="{{download_path('SNAPSHOT')}}"
DOWNLOAD_FILE="{{build.download_file}}"

mkdir imagebuilder; cd imagebuilder
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/sha256sums" -O sha256sums
file_name="$(grep "$DOWNLOAD_FILE" sha256sums | cut -d "*" -f 2)"
wget -nv "$FILE_HOST/$DOWNLOAD_PATH/$file_name"
tar xf "$file_name" --strip=1 --no-same-owner -C .
```

:::


### Compilación en Docker

Inicia un ImageBuilder de tu elección, por ejemplo {{ build.target }} si tu dispositivo es compatible con él

::: code-group

```sh-vue [{{ openwrt.stable_version }} (estable)]
mkdir ./images/
docker run -it \
    -e TARGET=$TARGET \
    -e ARCH=$ARCH \
    -v $(pwd)/config/:/builder/files/etc/config/ \
    -v $(pwd)/images:/images/ \
    ghcr.io/openwrt/imagebuilder:$TARGET-v{{ openwrt.stable_version }}
```

```sh-vue [{{ openwrt.oldstable_version }} (antigua estable)]
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

## Agregar feeds de LibreMesh

Dentro del contenedor, agrega los feeds de `lime-packages`.
::: code-group


```sh-vue [openwrt-{{ openwrt.stable_branch }} (estable)]
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

```sh-vue [openwrt-{{ openwrt.oldstable_branch }} (antigua estable)]
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

## Archivos personalizados
Idealmente, agrega tus propios archivos `lime-community` dentro del contenedor en la carpeta `./files/etc/config/`.    
Para encontrar todas las opciones posibles, consulta la página [`Configuration`][/reference/configuration].

Ahora crea una imagen de tu elección; para ver los nombres de los perfiles compatibles, ejecuta primero `make info`.


## Compilación

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

### Compilación usando Perfiles de Red

Consulta [Perfiles de Red](/guide/network-profiles)

```sh
make image \
    PROFILE=ubnt_unifi \
    BIN_DIR=/images \
    FILES=files \
    PACKAGES="-dnsmasq -odhcpd-ipv6only profile-libremesh-suggested-packages"
```
