---
outline: deep
---

# WiFi Options

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
```

## General options
Settings in this section applies to all radios. 

### modes
`adhoc`, `ap`, `apbb` `apname`, `apup`, `client`, `ieee80211s`


### ap / apname / apbb

#### ap_ssid
Default: `LibreMesh.org`

Set here your network name, **this value is required even if AP is not used**, as it is used for calculating fields with %Nn.

#### apname_ssid
Default: `LibreMesh.org/%H`

#### apbb_ssid

#### ap_key / apname_key / apbb_key

#### ap_encryption / apname_encryption / apbb_encryption

```
# 

config lime wifi
    list modes 'ap'                                     # This mode setup an Access Point, with the same ssid in each node for roaming purposes.
    list modes 'apname'                                 # This mode setup an Access Point, with specific ssid for each node.
    list modes 'apup'                                   # This mode setup radio for APuP operation.
    list modes 'ieee80211s'                             # Used for mesh links between nodes.
#   list modes 'adhoc'                                  # See below for adhoc configuration
#   list modes 'client'                                 # See below for client configuration
#   option country 'ES'                                 # Set this to your location country code, for example in Spain, setting ES allows you to use channel 13

    option apname_ssid 'LibreMesh.org/%H'               # SSID specific to each AP. A user can connect to the named AP to avoid roaming

    option apup_ssid 'LibreMesh.org'                    # Set here your APuP based network name
    option adhoc_ssid 'LiMe'                            # SSID of the APs (nodes) when meshing in ad-hoc mode, i.e., the nodes form an IBSS. Not used when meshing in 802.11s (the default)
    option adhoc_bssid 'ca:fe:00:c0:ff:ee'
    option ieee80211s_mesh_fwding '0'                   # Settings needed only for 802.11s
    option ieee80211s_mesh_nolearn '1'                  # Disable multi-hop mesh routing capabilities of 802.11s
    option ieee80211s_mesh_id 'LiMe'                    # Mesh cloud identifier (close to SSID in concept). Used by the nodes to join and participate in the mesh network.
#   option ieee80211s_encryption 'psk2/aes'             # In order to use encrypted mesh, the wpad-mini package have to be replaced with wpad-mesh-wolfssl package 
                                                        # either manually or by the selected network-profile

#   option ieee80211s_key 'SomePsk2AESKey'
    option unstuck_interval '10'                        # Interval in minutes that defines how often to run the workaround script provided by the package wifi-unstuck-wa 
                                                        # that rescan all available frequencies in active radios.

    option unstuck_timeout '300'                        # Timeout in seconds that defines how long the mentioned above workaround should go.

```
