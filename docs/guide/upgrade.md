# Upgrade

::: tip CAUTION
From times to times it could be that some OpenWrt devices encounter issues upgrading, and result `bricked` or `soft-bricked`
Be sure to have **read the OpenWrt release notes** for the `version`/`branch` you are installing.   

In **production environments with multiple LibreMesh nodes** deployed, it is adviceable to keep at least one device, for each models you are using, to test that upgrades are ok. Or eventually recover it using an `USB Serial Adapter`.
:::

Refers to the OpenWrt Wiki for details about the upgrade process:
- [Sysupgrade](https://openwrt.org/docs/techref/sysupgrade)
- [Upgrading OpenWrt firmware using LuCI and CLI](https://openwrt.org/docs/guide-user/installation/generic.sysupgrade)
- [Preserving OpenWrt settings during firmware upgrade](https://openwrt.org/docs/guide-quick-start/admingui_sysupgrade_keepsettings)


## Sysupgrade
The default OpenWrt command `sysupgrade` preserve:
- files defined in `/lib/upgrade/keep.d`
- the list of `conffiles` (configuration files defined by certain packages) that has been changed:
  - See the whole list for `apk` with `cat /lib/apk/packages/*.conffiles`
  - See the whole list for `opkg` with `cat /usr/lib/opkg/info/*.conffiles`

Initial files are preserved in `/rom/` and changed files are created at `/overlay/upper/`.

```
apk add diffutils
diff /overlay/upper/etc/config/babeld /rom/etc/config/babeld
```


## Examples

### Upgrade to a new major OpenWrt release
Example that keeps only `lime-node` and `dropbear`.

Override the list of files to be preserved keeping only the essential.
Recommended if the whole configuration is in the `lime-node`.
```
mkdir /tmp/keep.d; mv /lib/upgrade/keep.d/* /tmp/keep.d/
mv /usr/lib/opkg/status /tmp/opkg_status
for i in /etc/config/dropbear /etc/dropbear /etc/config/lime-node; do echo $i >> /etc/sysupgrade.conf; done
sysupgrade -l
```

Download the sysupgrade file
```
wget -O /tmp/firmware.bin <sysupgrade_file>
```
syupgrade file url is for instance https://sysupgrade-01.antennine.org/store/45347ae7f75029abc37f0a4e41ebf9af72ef7b9ce8c93ff27a7d7ec5e9a54b2e/openwrt-25.12.0-82ccd0311e22-mediatek-filogic-cudy_wr3000s-v1-squashfs-sysupgrade.bin

Upgrade the router
```
sysupgrade -v /tmp/firmware.bin
```

## Tools
Tools to upgrade the base OpenWrt version and LibreMesh packages:

### eupgrade
provide semi-automated upgrades checking if a new firmware is available from an https server.

### owut
provides upgrades using an [`ASU`](https://github.com/openwrt/asu) (online imagebuilder) instance. Test it installing the package `profile-antennine.org-an-lime-owut`

### safe-upgrade
Wrapper around `sysupgrade`. Requires large flash storage, at least the double of the firmware-size, to rollback in case something didn't work.