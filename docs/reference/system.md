---
outline: deep
---

# System options
The default values as per `lime-defaults`
```
config lime system
	option hostname 'LiMe-%M4%M5%M6'
	option domain 'thisnode.info'
	option keep_on_upgrade 'libremesh dropbear minimum-essential /etc/sysupgrade.conf'
	option root_password_policy 'DO_NOTHING'
	option root_password_secret ''
	option deferrable_reboot_uptime_s '97200'
	option deferrable_reboot_ping_target '4.2.2.2'
	option firstbootwizard_configured false
	option firstbootwizard_dismissed false
```

## hostname
- Default: `LiMe-%M4%M5%M6`
- Parametrizable with `%Mn`

```
config lime system
    option hostname 'LiMe-%M4%M5%M6'
```

The hostname of the node

## domain
- Type: `string`
- Default: `thisnode.info`

```
config lime system
    option domain 'thisnode.info'
```

DNS domain for the L2 cloud it could be something like `mycloud.mynetwork.tld`

## keep_on_upgrade
- Type: `list`
- Default: `libremesh dropbear minimum-essential /etc/sysupgrade.conf`

```
config lime system
  option keep_on_upgrade 'libremesh dropbear minimum-essential /etc/sysupgrade.conf'
```

Files defining the list of files and directories to backup when upgrade.    
The file path is relative to the OpenWrt default `/lib/upgrade/keep.d` if no `/` defined.    
This option is used by the command `lime-sysupgrade` and by the optional package `safe-upgrade`.

See the page [Upgrade](/guide/upgrade) for more details.

## root_password_policy
- Type: `DO_NOTHING | RANDOM | SET_SECRET`
- Default: `DO_NOTHING`

```
config lime system
    option root_password_policy 'DO_NOTHING'
```

Determine the lime setting for the root password:
- `DO_NOTHING` - leaves the root password empty (you will have to set it manually or through FirstBootWizard).
- `RANDOM` - a strong random password will be set if root has no password, use this if your firmware is built with the ssh keys inside. 
- `SET_SECRET` - the root password will be configured as specified in root_password_secret.

The default option prevent libremesh from overriding manual configuration, e.g. via `luci`, `uci` or the `lime-app`

## root_password_secret
- Type: `string`
- Default: `''`

```
config lime system
    option root_password_secret ''
```

Used only when `root_password_policy` is set to `SET_SECRET`.    
The password hash will be stored in /etc/shadow.
Use a strong password with at least 10 numbers and letters, the longer the better!.

```
openssl passwd -5
```

You can generate the secret with `openssl passwd -1` to be compatible with most openwrt firmwares.    
For improved security use `openssl passwd -6` for SHA512 (or -5 for SHA256) but be aware that not all firmwares support this.

## firstbootwizard_configured
- Type: `string`
- Default: `false`
- Packages required: `first-boot-wizard`

```
config lime system
    option firstbootwizard_configured false
```
When true the first-boot-wizard will not appear by default.

## firstbootwizard_dismissed
- Type: `string`
- Default: `false`
- Packages required: `first-boot-wizard`

```
config lime system
    option firstbootwizard_dismissed false
```

When true the first-boot-wizard banner will be hidden.