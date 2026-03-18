# Wifi Modes

## Access Points

### SSID

#### ap_ssid
- Type: `string`
- Default: `LibreMesh.org`

```
config lime wifi
	option ap_ssid 'LibreMesh.org'
```

Set here your network name, **this value is required even if AP is not used**, as it is used for calculating fields with %Nn.

#### apname_ssid
- Type: `string`
- Default: `LibreMesh.org/%H`

```
config lime wifi
	option ap_ssid 'LibreMesh.org/%H'
```
SSID specific to each AP. A user can connect to the named AP to avoid roaming.

#### apbb_ssid
- Type: `string`
- Default: unset

```
config lime wifi
	option apbb_ssid 'backbone/%H'
```

### key and encryption

## Ad-Hoc Access Point

```
config lime 'wifi'
    list modes 'adhoc'
    option adhoc_ssid 'LiMe'
    option adhoc_bssid 'ca:fe:00:c0:ff:ee'
```

- `adhoc_ssid 'LiMe'` - SSID of the APs (nodes) when meshing in ad-hoc mode, i.e., the nodes form an IBSS. Not used when meshing in 802.11s (the default)


## APuP Access Point
See the article in the FreiFunk blog about [A new way to mesh – APuP](https://blog.freifunk.net/2024/08/24/a-new-way-to-mesh-apup/)

```
config lime 'wifi'
    list modes 'apup'
    option apup_ssid 'LibreMesh.org'
```

- `apup_ssid 'LibreMesh.org'` - Set here your APuP based network name 

## 802.11s
```
config lime 'wifi'
    list modes 'ieee80211s'
    option ieee80211s_mesh_fwding '0'
    option ieee80211s_mesh_nolearn '1'
    option ieee80211s_mesh_id 'LiMe'
#   option ieee80211s_key 'SomePsk2AESKey'
#   option ieee80211s_encryption 'psk2/aes'
```
### key and encryption
If you are planning to use encrypted mesh, you need to make sure to have the `wpad-mesh-*`, not `wpad-basic-*` package, where `*` is `mbedtls`, `openssl` or `wolfssl`. OpenWrt 23 by default uses `mbedtls`. For example, in ImageBuilder append
```
-wpad-basic-mbedtls wpad-mesh-mbedtls
```

### mesh_params
Supported mesh parameters
- `ieee80211s_mesh_id 'LiMe'` - Mesh cloud identifier (close to SSID in concept). Used by the nodes to join and participate in the mesh network.
- `ieee80211s_mesh_fwding '0'` - Settings needed only for 802.11s
- `ieee80211s_mesh_nolearn '1'` - Disable multi-hop mesh routing capabilities of 802.11s
- `ieee80211s_mcast_rate` - is adjusted in **band specific options** with `24000` for `2ghz` and `6000` for `5ghz`
