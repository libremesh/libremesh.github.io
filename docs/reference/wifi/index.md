# WiFi Options
Configuration for each radio device is calculated from 
- the **general options** in `config lime wifi`
- the corresponding **band specific section** for `2ghz` and `5ghz` also included in `lime-defaults`
- an (optional) **interface specific section** relative to that specific radio device.

## Default values
The default values as per `lime-defaults`

```
config lime wifi
	list modes 'ap'
	list modes 'apname'
	list modes 'ieee80211s'
	option ap_ssid 'LibreMesh.org'
	option apname_ssid 'LibreMesh.org/%H'
	option adhoc_ssid 'LiMe'
	option adhoc_bssid 'ca:fe:00:c0:ff:ee'
	option apup_ssid 'LibreMesh.org'
	option ieee80211s_mesh_fwding '0'
	option ieee80211s_mesh_nolearn '1'
	option ieee80211s_mesh_id 'LiMe'
	option unstuck_interval '10'
	option unstuck_timeout '300'

config lime-wifi-band '2ghz'
	option channel '11'
	option htmode 'HT20'
	option distance '1000'
	option adhoc_mcast_rate '24000'
	option ieee80211s_mcast_rate '24000'

config lime-wifi-band '5ghz'
	list channel '48'
	list channel '157'
	option htmode 'HT40'
	option distance '10000'
	option adhoc_mcast_rate '6000'
	option ieee80211s_mcast_rate '6000'
```

## General options
Settings in the section `config lime wifi` applies to **all radios**.

The LibreMesh configurations in the sections `wifi` `lime-wifi-band` and specific `radioN` contains options for configuring:
- **radio device options** like `channel`, `distance`, `htmode` and `txpower`
- **wifi interfaces options** for Access Points, like `ap_ssid`, `ap_key`, `ap_encryption`, or other supported modes like 80211s or client. 
- **network options**, protocols list and options are inherited from the default network section `config lime 'network'`

### ap_ssid
- Type: `string`
- Default: `LibreMesh.org`

```
config lime wifi
	option ap_ssid 'LibreMesh.org'
```

Set here your network name, **this value is required even if AP is not used**, as it is used for calculating fields with %Nn.


### country
- Type: country code
- Default: unset, uses default `00` (World)

Set this to your location country code, for example in Spain, setting `ES` allows you to use channel 13

### modes
- `adhoc` - See below for adhoc configuration
- `ap` - This mode setup an Access Point, with the same ssid in each node for roaming purposes.
- `apbb` - Backbone AP, for other LibreMesh routers connection rather than for users connectio
- `apname` - This mode setup an Access Point, with specific ssid for each node.
- `apup` - This mode setup radio for APuP operation.
- `client` - client configuration should be done in [Wifi specific options](./interface-specific.html#wifi-client-mode)
- `ieee80211s` - Used for mesh links between nodes.

#### modes options
See the next page [Wifi Modes](./modes) for details on `Access Points`, `Adhoc`, `APuP` and `802.11s` options.


## Workaround for deaf radios
::: warning ath9k warning

Routers with Atheros radios and the ath9k driver have a known bug that cause them to become deaf, 
if you are using an OpenWrt older than 24.10.6 be sure to include the libremesh package `wifi-unstuck-wa`
:::

### unstuck_interval
- Default: `10`
- Packages required: `wifi-unstuck-wa`

```
config lime 'wifi'
    option unstuck_interval '10'
```

Interval in minutes that defines how often to run the workaround script provided by the package `wifi-unstuck-wa`
that rescan all available frequencies in active radios.


### unstuck_timeout
- Default: `10`
- Packages required: `wifi-unstuck-wa`

```
config lime 'wifi'
    option unstuck_interval '10'
```

Timeout in seconds that defines how long the mentioned above workaround should go.
