---
outline: deep
---

# Getting Started

## Installation

### Prerequisites
Check the [Table of Hardware](https://toh.openwrt.org) to see if your device is supported by OpenWrt.

::: tip NOTE
It is recommended that the router has **at least**:
  - 16 MB of flash memory and 128 MB of RAM.
  - 1 radio working at 2.4GHz radio and 1 at 5GHz

It is possible to install LibreMesh on routers with 8 MB of flash and 64 MB of RAM    
Read the OpenWrt's [`8/64 warning`](https://openwrt.org/supported_devices/864_warning) and refers to the page [packages selection](/guide/packages-selection) for build customization.  
:::

::: warning CAUTION
Ensure to have read the OpenWrt's wiki page for of your device.    
Read the installation instruction and ensure to have the necessary hardware equipment - if needed on your device - to install the firmware, like an [USB-UART/Serial adapter](https://openwrt.org/docs/guide-user/installation/generic.flashing.serial) and/or an
[USB-JTAG adapter](https://openwrt.org/docs/techref/hardware/port.jtag)
:::

### Download the firmware
**Download using the Firmware Selector**    
The Firmware Selector request a firmware build via an [`ASU`](https://github.com/openwrt/asu) (online ImageBuilder) instance.

https://firmware-selector.libremesh.org

**Download old precompiled versions**    
Old releases archive with pre-compiled firmwares via Buildroot are available at:

https://firmware-libremesh.antennine.org

**Build LibreMesh on your host**    
Refers the the page [`Build LibreMesh`](/build/) for instructions on how to build LibreMesh on your host.

### Install the firmware
Install the firmware on your device following the installation method reported in the [wiki of OpenWrt](https://openwrt.org)
or, if not present, search the instruction in the **`git-commit` message** left from who added the support for that device model. See the [Table of Hardware](https://toh.openwrt.org).

::: tip NOTE
If your device runs OEM firmware it is adviced to **install OpenWrt first**:
:::

1. Download the latest `stable` firmware for your device from the [`OpenWrt Firmware Selector`](https://firmware-selector.openwrt.org).    
   Use the `factory` image for first time installation. See the OpenWrt wiki page [Factory Install: First Time Installation](https://openwrt.org/docs/guide-quick-start/factory_installation):
2. Check that the OpenWrt device boot and function properly.    
   Beware that OpenWrt by default doesn't turn on the Wi-Fi.    
   Turn it on from `LuCi` from the menu `Network` / `Wireless`.
3. Upgrade to LibreMesh using a `sysupgrade` image:
    - upload the firmware via the web interface `LuCI` from the menu `System` / `Backup / Flash Firmware`.
    - or via ssh using the command `sysupgrade -n firmware.bin`


## Connecting to the router
The router could be reached via web at http://thisnode.info.    
See the page [Connecting to the router](guide/connecting) for detailed options and troubleshooting


## Configuration
LibreMesh come with a [default flavor](reference/flavors) which works out of the box
without requiring a manual configuration.

See the page [configuration](reference/configuration) for detailed options.


## Maintenance
Install newer OpenWrt stable releases to keep updated the device:
- Subscribe to the Newsletter [`OpenWrt Annouce`](https://lists.openwrt.org/mailman/listinfo/openwrt-announce).
- Or follow the [`Openwrt Announcement-Bot`](https://social.tchncs.de/@openwrt) on Mastodon.

Refers to the page [Upgrade](/guide/upgrade) for recommended operations with LibreMesh.
