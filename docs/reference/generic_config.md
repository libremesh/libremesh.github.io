
# Generic UCI configs
Additional LibreMesh sections to:    
- `generic_uci_config` - Define additional OpenWrt configs.    
- `copy_asset` - Copy a file from the assets directory into a specified path.   
- `run_assets` - Executes a file from the assets directory scheme explained in copy_asset.

The main advantage of these sections is to allow the user to keep all LibreMesh configuration within `lime-files` (a generic `lime-community` and eventually a specific `lime-node`).    
See OpenWrt [UCI defaults](https://openwrt.org/docs/guide-developer/uci-defaults) for standard methods for **integrating custom settings**.

## generic_uci_config
```
config generic_uci_config 'uhttpd_https'
	list uci_set 'uhttpd.main.redirect_https=0'
```
By default uhttpd is instructed to avoid force redirect from http to https

## copy_asset
Copy a file from the assets directory into a specified path.    
The node asset directories are /etc/lime-assets/node and /etc/lime-assets/community.    
The community directory should contain the same files in all the community nodes.

```
config copy_asset collectd
	option asset 'community/collectd.conf' # or 'node/collectd.conf' or 'community/mynode_collectd.conf' 
	option dst '/etc/collectd.conf'
```

## run_asset
Executes a file from the assets directory scheme explained in copy_asset.
```
config run_asset dropbear
	option asset 'community/dropbear.sh'
	option when 'ATFIRSTBOOT' # ATFIRSTBOOT, ATCONFIG
```