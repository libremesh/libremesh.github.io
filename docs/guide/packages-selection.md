---
outline: deep
---
<script setup>
import { data as openwrt } from '/openwrt.data.js'
</script>

# Packages selection

## Build customization

It is adviced to do a build customization. The main advantage of pre-installing all needed packages is preserving **firmware space** and **used RAM** on the device.

::: tip NOTE
It is possible to `install` new software via the package manager `opkg` or the newer `apk`.   
It is **highly discouraged** to `upgrade` packages. Read the OpenWrt's [`Upgrade packages warning`](https://openwrt.org/meta/infobox/upgrade_packages_warning).
:::

::: warning ath9k warning
Routers with Atheros radios and the `ath9k` driver have a known bug that cause them to become deaf, 
if you are using an OpenWrt older than 24.10.6 be sure to include the libremesh package `wifi-unstuck-wa` 
:::

::: warning ath10k warning
Routers with Atheros radios and the `ath10k-ct` OpenWrt's default driver (ath10k made by CandelaTech) are unstable/broken with 80211s meshing, works only wave2 chipsets. Replace packages related to `ath10k-ct` with the corresponding `ath10k` packages.
:::


## Saving space and RAM

- https://openwrt.org/supported_devices/864_warning
- https://openwrt.org/docs/guide-user/additional-software/saving_space

### Flavor Mini

For `8/64` devices it should be possible to install a reduced version of the `default flavor`.    
See details of excluded packages at [Flavor Mini](/reference/flavors.md#flavor-mini)
This package list is selectable also by including the network-profile `profile-libremesh-suggested-packages-tiny`.

```
babeld-auto-gw-mode
check-date-http
lime-docs-minimal
lime-hwd-openwrt-wan
lime-proto-anygw
lime-proto-babeld
lime-proto-batadv
shared-state
shared-state-babeld_hosts
```

### Excluding packages

By default LibreMesh uses `dnsmasq-dhcpv6` instead of the OpenWrt's default `dnsmasq` and `odhcpd-ipv6only`.    
Be sure to include a removal for them when building LibreMesh via ImageBuilder or BuildRoot.


Additionally these packages could be `excluded` in the firmware build:

::: code-group

``` [{{ openwrt.stable_version }}]
-dnsmasq -odhcpd-ipv6only -apk-mbedtls -ca-bundle -ppp -ppp-mod-pppoe
```

``` [{{ openwrt.oldstable_version }}]
-dnsmasq -odhcpd-ipv6only -opkg -ca-bundle -ppp -ppp-mod-pppoe
```

:::

The same list to use when building with Buildroot.
::: code-group


``` [{{ openwrt.stable_version }}]
cat << EOF >> .config
CONFIG_PACKAGE_dnsmasq=m
CONFIG_PACKAGE_odhcpd-ipv6only=m
CONFIG_PACKAGE_apk-mbedtls=m
CONFIG_PACKAGE_ca-bundle=m
CONFIG_PACKAGE_ppp=m
CONFIG_PACKAGE_ppp-mod-pppoe=m
EOF
make defconfig
```

``` [{{ openwrt.oldstable_version }}]
cat << EOF >> .config
CONFIG_PACKAGE_dnsmasq=m
CONFIG_PACKAGE_odhcpd-ipv6only=m
CONFIG_PACKAGE_opkg=m
CONFIG_PACKAGE_ca-bundle=m
CONFIG_PACKAGE_ppp=m
CONFIG_PACKAGE_ppp-mod-pppoe=m
EOF
make defconfig
```

:::

#### `apk-mbedtls`
- Description: apk package manager    
- Installed size: `258 KiB` (mediatek-filogic-v25.12.0)

The router won't be able to install packages after the installation

#### `opkg`  
- Description: opkg package manager (openwrt-24.10 and previous) 

The router won't be able to install packages after the installation.

#### `ca-bundle`
- Description: System CA certificates as a bundle    
- Installed size: `219 KiB` (mediatek-filogic-v25.12.0)
   
The router won't be able to use TLS, i.e. download data from sites that use only `https://` and not `http://`

#### `ppp`
- Description: This package contains the PPP (Point-to-Point Protocol) daemon.
- Installed size: `355 KiB` (mediatek-filogic-v25.12.0)

Exclude it if you don't need to extablish ppp connections

#### `ppp-mod-pppoe`
- Description: This package contains a PPPoE (PPP over Ethernet) plugin for ppp.  
- Installed size: `65 KiB` (mediatek-filogic-v25.12.0)

Exclude it if you don't need to extablish pppoe connections

### Build example

```
make image \
    PROFILE=ubnt_unifi \
    BIN_DIR=/images \
    FILES=files \
    PACKAGES="-dnsmasq -odhcpd-ipv6only \
      -apk-mbedtls -ca-bundle -ppp -ppp-mod-pppoe \
      profile-libremesh-suggested-packages-tiny"
```