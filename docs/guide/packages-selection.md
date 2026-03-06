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
Routers with Atheros radios and the `ath9k` driver have a known bug that cause them to become deaf, if you are using an OpenWrt older than 24.10.6 be sure to include the libremesh package `wifi-unstuck-wa` 
:::

::: warning ath10k warning
Routers with Atheros radios and the `ath10k-ct` OpenWrt's default driver (ath10k made by CandelaTech) are unstable/broken with 80211s meshing, works only wave2 chipsets. Replace packages related to `ath10k-ct` with the corresponding `ath10k` packages.
:::


## Flavors
See [Flavors](/reference/flavors.md)

## Saving space and RAM

- https://openwrt.org/supported_devices/864_warning
- https://openwrt.org/docs/guide-user/additional-software/saving_space


### Excluding packages
Additionally these packages could be `excluded` in the firmware build:

::: code-group

``` [{{ openwrt.stable_version }}]
-apk-mbedtls -ca-bundle -ppp -ppp-mod-pppoe
```

``` [{{ openwrt.oldstable_version }}]
-opkg -ca-bundle -ppp -ppp-mod-pppoe
```


:::

The same formatted as list
::: code-group


``` [{{ openwrt.stable_version }}]
-apk-mbedtls
-ca-bundle
-ppp
-ppp-mod-pppoe
```

``` [{{ openwrt.oldstable_version }}]
-opkg
-ca-bundle
-ppp
-ppp-mod-pppoe
```

:::

#### `apk-mbedtls`
Package manager    
The router won't be able to install packages after installing

#### `opkg`  
The router won't be able to install packages after installing

#### `ca-bundle`
List of all certifications authority    
The router won't be able to use TLS, i.e. download data from sites that use only `https://` and not `http://`

#### `ppp`
Exclude it if you don't need to extablish ppp connections

#### `ppp-mod-pppoe`
Exclude it if you don't need to extablish pppoe connections