---
aside: false
---

<script setup>
import { data as openwrt } from '/openwrt.data.js'
</script>

# Buildroot

[[toc]]

## Configuración del sistema de compilación
Consulte la wiki de OpenWrt [Configuración del sistema de compilación](https://openwrt.org/docs/guide-developer/toolchain/install-buildsystem)
para la lista de paquetes de otras distribuciones Linux.

### Debian/Ubuntu/Mint
```sh
sudo apt update
sudo apt install build-essential clang flex bison g++ gawk \
gcc-multilib g++-multilib gettext git libncurses-dev libssl-dev \
rsync swig unzip zlib1g-dev file wget bzip2
```

## Descarga

### Clonar el código fuente de OpenWrt
Consulte la wiki de OpenWrt [Uso del sistema de compilación](https://openwrt.org/docs/guide-developer/toolchain/use-buildsystem).    
Ejecute todos los comandos anteriores como usuario normal (no uses root).

::: code-group

```sh-vue [{{ openwrt.stable_version }}]
git clone -b v{{ openwrt.stable_version }} --single-branch https://github.com/openwrt/openwrt
cd openwrt
```

```sh-vue [{{ openwrt.oldstable_version }}]
git clone -b v{{ openwrt.oldstable_version }} --single-branch https://github.com/openwrt/openwrt
cd openwrt
```

:::

### Agregar los feeds de LibreMesh
Copia el archivo de repositorios predeterminado de OpenWrt y agrega los repositorios de LibreMesh

::: tip
Usa `master` para compilar el último código de LibreMesh (compatible con openwrt-24.10 o más reciente)     
Usa `2024.1` para compilar la última versión de LibreMesh (compatible con openwrt-24.10 y openwrt-23.05)    
:::

::: code-group

```sh [master]
cp feeds.conf.default feeds.conf
cat << EOF >> feeds.conf
src-git libremesh https://github.com/libremesh/lime-packages.git;master
src-git profiles https://github.com/libremesh/network-profiles.git
EOF
```

```sh [2024.1]
cp feeds.conf.default feeds.conf
cat << EOF >> feeds.conf
src-git libremesh https://github.com/libremesh/lime-packages.git;v2024.1
src-git profiles https://github.com/libremesh/network-profiles.git
EOF
```

:::


### Descargar e instalar paquetes de los feeds
```sh
scripts/feeds update -a
scripts/feeds install -a
```


## Configuración

### Usando menuconfig
```
make menuconfig
```

![menuconfig1](/buildroot-menuconfig0.webp)

Consulta el `target`, `subtarget` y `profile` de tu router en la [Tabla de Hardware de OpenWrt](https://toh.openwrt.org).

Selecciona entonces:
- `Target System` - predeterminado `Mediatek ARM`
- `Subtarget` - predeterminado `Filogic`
- `Target Profile` - predeterminado `OpenWrt One`

#### Selección de paquetes

##### Paquetes predeterminados
**Deselecciona** los paquetes conflictivos:

- `Sistema base` -> `< >` `dnsmasq`
- `Red` -> `< >` `odhcpd-ipv6only`

Por defecto, LibreMesh usa `dnsmasq-dhcpv6` en lugar del `dnsmasq` predeterminado de OpenWrt y `odhcpd-ipv6only`.

**Deselecciona** ubicaciones erróneas de feeds:

- `Configuración de imagen` -> `Repositorios de feeds separados` -> `< >` `Habilitar feed libremesh` 
- `Configuración de imagen` -> `Repositorios de feeds separados` -> `< >` `Habilitar feed profiles`

Los paquetes de OpenWrt están disponibles desde el servidor de descargas https://downloads.openwrt.org.   
Elimina los repositorios de LibreMesh de esta lista ya que no habrá paquetes precompilados disponibles allí.    
Los paquetes precompilados de LibreMesh están disponibles desde https://feed.libremesh.org/.    
Estos son instalables:
- directamente en el router a través del gestor de paquetes
- a través de ImageBuilder durante la generación del firmware

##### Ahorrando espacio y RAM

Opcionalmente, **deselecciona** paquetes no utilizados:
- `Red` -> `< >` `ppp`
- `Red` -> `< >` `ppp-mod-pppoe`
- `Módulos del kernel` -> `Soporte de red` -> `< >` `kmod-ppp`
- `Módulos del kernel` -> `Soporte de red` -> `< >` `kmod-pppoe`
- `Módulos del kernel` -> `Soporte de red` -> `< >` `kmod-pppox`

Consulta [Selección de paquetes](../guide/packages-selection#saving-space-and-ram) para obtener una lista de otros paquetes opcionalmente deseleccionables.

##### Paquetes LibreMesh
**Selecciona** (presiona la barra espaciadora hasta que aparezca un asterisco, como `<*>`) los paquetes de LibreMesh:

![menuconfig1](/buildroot-menuconfig1.webp)

* `LibreMesh` → `Documentación sin conexión` → `<*>` `lime-docs-minimal` (documentación mínima de LibreMesh)
* `LibreMesh` → `<*>` `lime-app` (LimeApp) **(opcional)**
* `LibreMesh` → `<*>` `lime-hwd-openwrt-wan` (Respetar la interfaz wan de openwrt como predeterminada)
* `LibreMesh` → `<*>` `lime-proto-anygw` (Soporte de protocolo anygw de LibreMesh)
* `LibreMesh` → `<*>` `lime-proto-babeld` (Soporte de protocolo babeld de LibreMesh)
* `LibreMesh` → `<*>` `lime-proto-batadv` (Soporte de protocolo batman-adv de LibreMesh)
* `LibreMesh` → `<*>` `shared-state`
* `LibreMesh` → `<*>` `shared-state-async` **(opcional)**
  * `<*>` `shared-state-babeld_hosts` (módulo babeld-hosts para shared-state)
  * `<*>` `shared-state-bat_hosts` (módulo bat-hosts para shared-state) **(opcional)**
  * `<*>` `shared-state-nodes_and_links` (módulo nodes_and_links para shared-state)
* `LibreMesh` -> `<*>` `babeld-auto-gw-mode`
* `LibreMesh` -> `<*>` `check-date-http` (Mantener la fecha local no muy alejada del desfase de NTP) **(opcional)**
* `LibreMesh` -> `<*>` `Documentación sin conexión` -> `lime-docs` (documentación completa de LibreMesh) **(opcional)**
* `LibreMesh` -> `<*>` `lime-debug` (utilidades de depuración de libremesh) **(opcional)**

Los **paquetes opcionales** son recomendados pero no obligatorios para una red LibreMesh funcional.    
Considera evitar seleccionar estos paquetes `solamente` si la imagen creada es demasiado grande y no cabe en la memoria del router.

Adicionalmente y de forma opcional, se puede habilitar httpS para la interfaz web seleccionando (ten en cuenta que la interfaz web se mostrará como *no confiable*):

- `Utilidades` -> `Cifrado` -> `<*>` `px5g-standalone`

Si planeas usar malla 802.11s encriptada, debes asegurarte de tener el paquete `wpad-mesh-*`, no `wpad-basic-*`, donde `*` es `mbedtls`, `openssl` o `wolfssl`. OpenWrt desde la rama 23.05 usa `mbedtls` de forma predeterminada.
- `Red` -> `WirelessAPD` -> `< >` `wpad-basic-mbedtls`
- `Red` -> `WirelessAPD` -> `<*>` `wpad-mesh-mbedtls`

::: tip NOTA
Para tener paquetes adicionales, la forma más fácil es seleccionarlos en menuconfig. Se pueden instalar más paquetes posteriormente a través de `apk` o el antiguo `opkg`, pero algunos requieren una configuración específica del kernel para funcionar. Esto se puede lograr siguiendo [estas instrucciones adicionales sobre kernel vermagic](../development/hacking/kernel_vermagic.md) Ten en cuenta que esto aumentará notablemente el tiempo y el espacio de almacenamiento requeridos para la compilación.
:::

#### Guardar la configuración
Guarda la configuración y sal.

#### Archivos adicionales

En esta etapa, existe la posibilidad de incluir archivos personalizados en la imagen del firmware compilada. Para esto, tendrás que crear, dentro del directorio `openwrt/`, un directorio `files/` que contenga la estructura de directorios y los archivos que deseas agregar. Por ejemplo, si deseas tener un archivo `/etc/config/lime-community`, debes hacer lo siguiente:

``` sh
mkdir -p files/etc/config/
touch files/etc/config/lime-community
```

y luego editar el archivo `lime-community` recién creado incluyendo tu contenido personalizado. Si un archivo de un paquete tiene el mismo nombre y ruta que un archivo en este directorio, será sobrescrito. Esta es una forma rápida de incluir un archivo de configuración personalizado, sin necesidad de crear un [perfil de red](../guide/network-profiles) en línea.


##### Perfiles de Red
Si tu comunidad local tiene un perfil en el [repositorio de perfiles de red](https://github.com/libremesh/network-profiles/), puedes seleccionarlo en:

- LibreMesh -> perfil-de-red -> perfil-tu_comunidad-tu_perfil

![menuconfig2](/buildroot-menuconfig2.webp)

::: tip NOTA
Los perfiles de red son la configuración específica de las comunidades, y se almacenan en este repositorio colectivo 
[repositorio](https://github.com/libremesh/network-profiles/), pero también pueden mantenerse localmente, dependiendo de cómo cada comunidad gestiona su red. Para obtener más instrucciones sobre cómo crear un perfil o cómo usar uno local, consulta la [página de perfiles de red](../guide/network-profiles).
:::


### Usando make defconfig

#### exportar target-subtarget al entorno
``` sh-vue
export TARGET=ath79
export SUBTARGET=generic
```

#### configuración

#### Configuraciones de target, subtarget y generables

```sh
cat << EOF > .config
CONFIG_TARGET_${TARGET}=y
CONFIG_TARGET_${TARGET}_${SUBTARGET}=y
CONFIG_TARGET_ROOTFS_INITRAMFS=y
CONFIG_TARGET_MULTI_PROFILE=y
CONFIG_TARGET_PER_DEVICE_ROOTFS=y
# CONFIG_FEED_libremesh is not set
# CONFIG_FEED_profiles is not set
CONFIG_IMAGEOPT=y
CONFIG_VERSIONOPT=y
CONFIG_KERNEL_BUILD_USER=\"builder\"
CONFIG_KERNEL_BUILD_DOMAIN=\"buildhost\"
# CONFIG_VERSION_CODE_FILENAMES is not set
EOF
make defconfig
```

#### Módulos del kernel (opcional)
Compilar opcionalmente todos los módulos del kernel para exponerlos posteriormente en un servidor http
Necesario para instalar, a través del gestor de paquetes, paquetes que dependan de módulos del kernel no predeterminados.
```sh
cat << EOF >> .config
CONFIG_DEVEL=y
CONFIG_ALL_KMODS=y
CONFIG_ALL_NONSHARED=y
EOF
make defconfig
```

#### Perfil del router
Selecciona el perfil del router según el string compatible:

```
echo "CONFIG_TARGET_DEVICE_ath79_generic_DEVICE_librerouter_librerouter-v1=y" >> .config
make defconfig
```

#### Paquetes LibreMesh
```sh
cat << EOF >> .config
# CONFIG_PACKAGE_dnsmasq is not set
# CONFIG_PACKAGE_odhcpd-ipv6only is not set
# CONFIG_PACKAGE_ppp is not set
# CONFIG_PACKAGE_ppp-mod-pppoe is not set
CONFIG_PACKAGE_kmod-ppp=m
CONFIG_PACKAGE_kmod-pppoe=m
CONFIG_PACKAGE_kmod-pppox=m
CONFIG_PACKAGE_profile-libremesh-suggested-packages=y
EOF
make defconfig
```

## Compilar LibreMesh

Finalmente, compila las imágenes
```sh
make -j$(nproc)
```
Consulta OpenWrt [consejos para make](https://openwrt.org/docs/guide-developer/toolchain/use-buildsystem#make_tips) para obtener opciones detalladas.

Si todo sale bien, deberías encontrar los binarios producidos dentro del directorio `bin/`.

::: tip NOTA
Si después de la compilación no ves la imagen compilada en la carpeta `bin/targets/.../.../`, puede ser que tu router tenga una memoria flash tan pequeña que los paquetes mencionados anteriormente no quepan en ella (también puede ocurrir con routers de 8 MB de memoria flash al seleccionar paquetes muy grandes para incluir). En este caso, puedes eliminar la lista de paquetes generada por `.config` y repetir la selección de paquetes sin incluir `lime-app`. Si la imagen compilada sigue siendo demasiado grande, prueba seleccionando solo `lime-proto-anygw`, `lime-proto-batadv` y `lime-proto-babeld` o siguiendo [esta guía](https://openwrt.org/docs/guide-user/additional-software/saving_space).
:::

Consulta las páginas en la **Guía de desarrollo** [testing](/development/testing) y [virtualización](/development/virtualizing)
para emular en tu computadora con qemu.
