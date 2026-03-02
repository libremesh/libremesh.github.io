---
outline: deep
---

# Build LibreMesh

## Recommended methods

### Firmware Selector 
Download the firmware for your device via the Firmware Selector.

https://firmware-selector.libremesh.org

The Firmware Selector request a firmware build via an [`ASU`](https://github.com/openwrt/asu) (online ImageBuilder) instance.

### [ImageBuilder](imagebuilder)
Assemble prebuilt kernel, packages and device information to produce the firmware

### [lime-sdk](lime-sdk)
Build packages using the OpenWrt SDK and firmware images using the OpenWrt ImageBuilder

### [Buildroot](buildroot)
Compile everything: tools, toolchain, kernel, packages, firmwares

## Other methods
List of [imagebuilder frontends](https://openwrt.org/docs/guide-developer/imagebuilder_frontends) on the OpenWrt wiki