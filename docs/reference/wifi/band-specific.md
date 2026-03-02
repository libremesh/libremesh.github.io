# Wifi Band specific options

## Default values
```
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

## 2ghz
```
config lime-wifi-band '2ghz'                            # Settings in this section applies for all radios in '2ghz' (or '5ghz') band. And take precedence over 'lime wifi' section
    option channel '11'
    option htmode 'HT20'                                # htmode sets the width of the channel. HT40 should have better performances in non-noisy environments. 
                                                        # Refer to the OpenWrt wiki: https://openwrt.org/docs/guide-user/network/wifi/basic#htmodewi-fi_channel_width

    option distance '1000'                              # 1 km max distance, farther clients or peers will not be able to connect
    option adhoc_mcast_rate '24000'
    option ieee80211s_mcast_rate '24000'
#   list modes 'ap'                                     # For networks where only dual band routers are used,
#   list modes 'apname'                                 # 2.4Ghz radios can be reserved for access points.
```

## 5ghz
```
config lime-wifi-band '5ghz'
    list channel '48'                                   # May be either a list or a single option, in case of a list a channel for each radio will be selected according to radio index
    list channel '157'                                  # Check for allowed channels on https://en.wikipedia.org/wiki/List_of_WLAN_channels#regulatory_tables5.0ghz
    option htmode 'HT40'                                # htmode sets the width of the channel. VHT80 should have better performances in non-noisy environment. 
                                                        # Check out the valid channels list in this comment: https://github.com/libremesh/lime-packages/issues/647#issuecomment-1503968192 
                                                        # and refer to the OpenWrt wiki here: https://openwrt.org/docs/guide-user/network/wifi/basic#htmodewi-fi_channel_width

#   list modes 'ieee80211s'                             # For networks where only dual band routers are used, the 5 GHz radio can be reserved for the node-to-node connections
    option distance '10000'                             # Distance between this node/ap and the furthest connected node/client in meters, affects performances. 
                                                        # If you are unsure of the right number, better to use a too-large distance here than a too-small one. 
                                                        # Farther clients or peers will not be able to connect

    option adhoc_mcast_rate '6000'
    option ieee80211s_mcast_rate '6000'

```
