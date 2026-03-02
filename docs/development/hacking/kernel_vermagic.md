---
title: Kernel vermagic
---

# {{ $frontmatter.title }}

Compiling firmware compatible with OpenWrt repository Kernel vermagic

## Reference

This page is an optional expansion to the normal compilation procedure suggested in the [development page](/build/buildroot.md) and is an expansion of [this explorative email](https://web.archive.org/web/20220716110253/https://lists.libremesh.org/archives/list/lime-users@lists.libremesh.org/message/AWSAUYSKEXN5GNORLIYHPJP5LIWAC5EQ/).
Beware that these additional steps result in a more time and disk space consuming compilation.

## The problem

OpenWrt offers the amazing possibility to add more software to the firmware both at compilation time or subsequently.
The former possibility always works: if you can, always select the packages you need in the menuconfig at compilation time.
The latter possibility can show some compatibility issues between the custom installed image and the packages available on OpenWrt repositories, and that's what this page tries to fix.

This compatibility issue arises just with packages depending on some kernel module, for example the [`tc`](https://openwrt.org/packages/pkgdata/tc) package. These packages require a specific kernel version to be present. And in OpenWrt the kernel version includes the hash of the configuration used for compiling it, which is a part of the general compilation configuration, so that the kernel version will include a `vermagic` which looks like:

```
# opkg info kernel
Version: 4.14.195-1-b84a5a29b1d5ae1dc33ccf9ba292ca1d
```

So, in order to be able to install some specific packages using `opkg`, you need to have compiled the kernel exactly in the same way as the one used in the official OpenWrt repositories.

## Generic instructions

These are the minimal instructions to follow, check in the section below whether additional selections are needed for the target/subtarget of your device.

In the menuconfig, at LibreMesh [compilation time](/build/buildroot):

- Select: Advanced configuration options
- Select: Global build settings -> Select all kernel module packages by default
- Deselect: Global build settings -> Kernel build options -> Compile the kernel with symbol table information
- Fill with `builder`: Global build settings -> Kernel build options -> Custom Kernel Build User Name
- Fill with `buildhost`: Global build settings -> Kernel build options -> Custom Kernel Build Domain Name

then check if your device requires additional selections in the following table and finally continue with the [normal procedure](/build/buildroot).

## Additional target/subtarget specific selections

Make sure to do all the 5 selections/deselections/filling listed in the previous section.
If you don't know the target and subtarget of your router, check out [OpenWrt table of hardware](https://openwrt.org/toh/start).

*Additional steps to perform in the menuconfig for specific subtargets*
| Target               | Subtarget           | Additional things to select |
| -------------------- | ------------------- | --------------------------- |
| Atheros ATH79        | Generic             |                             |
| MediaTek Ralink MIPS | MT7620 based boards |                             |
| MediaTek Ralink MIPS | MT7621 based boards |                             |
| x86                  | x86_64              |                             |


## My target/subtarget is not present in the table

First, make sure that the "Generic instructions" aren't enough!
If after compiling and flashing an image following the "Generic instructions" you still get errors like:

```
# opkg install tc
>>>> Collected errors:
>>>>  * satisfy_dependencies_for: Cannot satisfy the following dependencies
>>>> for tc:
>>>>  * 	kernel (= 4.9.214-1-2b8f9dfe583e5c09aadd9474da55137f)
>>>>  * opkg_install_cmd: Cannot install package tc.
```

you can try to find out which kernel modules you're missing (you don't actually need them, it's just for having the kernel version matching exactly the one required by the packages on OpenWrt repositories) following this procedure:

1. check the kernel version you need, included the vermagic hash, this can be found in various ways, for example in the `kmods` subdirectory (in the downloads.openwrt.org website) at the bottom of the web page where you would download the OpenWrt images. This page is specific for the OpenWrt version you're using, the target and the subtarget: the complete URL would be something like: `https://downloads.openwrt.org/releases/[release_version]/targets/[target_system]/[subtarget]/kmods` and this will contain another subdirectory named as the complete kernel version. For example, for OpenWrt19.07.10/ATH79/generic you can find it [here](https://downloads.openwrt.org/releases/19.07.10/targets/ath79/generic/kmods/);
2. download the `config.buildinfo` file for the target/subtarget of your device, you can find it in the same directory from where you download the official OpenWrt images, at the bottom of the page. The complete direction is something like: `https://downloads.openwrt.org/releases/[release_version]/targets/[target_system]/[subtarget]/config.buildinfo` for example, for OpenWrt19.07.10/ATH79/generic you can find it [here](https://downloads.openwrt.org/releases/19.07.10/targets/ath79/generic/config.buildinfo);
3. make a backup copy of the original `config.buildinfo`;
4. modify the config.buildinfo file removing some lines;
Do not remove the following lines:
```
CONFIG_TARGET_<name_of_wanted_target>=y
CONFIG_ALL_KMODS=y
CONFIG_DEVEL=y
# CONFIG_KERNEL_KALLSYMS is not set
CONFIG_KERNEL_BUILD_DOMAIN="buildhost"
CONFIG_KERNEL_BUILD_USER="builder"
```
neither the `CONFIG_KERNEL_KALLSYMS` one which is needed even if it is commented out. All these options are the ones mentioned in the "General instructions" above.

5. Copy it into your OpenWrt buildroot compilation directory and rename the copy as `.config` (overwrite if necessary) which is the hidden file containing the configuration for the compilation, which will get modified from menuconfig.
6. Run `make defconfig` to generate the rest of the `.config` file (you can do the same using `make menuconfig`).
7. Run `make target/linux/compile` to compile the minimum amount of stuff needed to obtain the kernel vermagic hash (even if the compilation got an error and did not reach completion).
8. Check the kernel vermagic which will be in a file in your OpenWrt buildroot like this: `./build_dir/target-mips_24kc_musl/linux-ath79_generic/linux-4.14.195/.vermagic` you can try with the command:
```sh
  cat ./build_dir/target-*/linux-*/linux-*/.vermagic
```
9. If the string matches the kernel vermagic hash from point 1, good! Otherwise, repeat from point 4 removing more lines, compiling again and checking again if the hash matches.
10. The minimum set of lines needed to have a matching hash are enough, but if you want to take it down to the single kernel configuration you can check which lines appears in the `./build_dir/target-mips_24kc_musl/linux-ath79_generic/linux-4.14.195/.config.set` file (adapt the path to your target) due to the new content of the `.config` file.
11. Confirm that this works compiling a full image (continuing with the compilation guide), flashing it on your device and installing some package depending on a kernel module (e.g. the `tc` package) using `opkg install` command.
12. If you had to keep the lines of some profiles (devices) in order to obtain the good vermagic, please check which kernel modules they depend upon, you can find this information in the menuconfig using the "Help" function when you are on the selected profile: all the packages starting with `kmod-` are kernel modules, most of them are selected by default but there will be some that are not. Note them down and check which are not selected when running the menuconfig after deleting the `.config` file.
13. If you go through all of this craziness, please report to this page your discoveries! You can file a pull request on the [website repository](https://github.com/libremesh/libremesh.github.io) using the "Edit this page" button at the bottom of this page or [contacting us](https://libremesh.org/communication). Thanks!
