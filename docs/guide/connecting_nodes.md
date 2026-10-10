# Connecting nodes

This page is meant to provide some most common examples of connection between nodes running LibreMesh,
and a list of most common tools to debug the connection.

## Wireless links

### 80211s

**Same frequencies**    
In the default configuration libremesh routers run 80211s on every radio:
- the 2.4GHz radio use the channel 11 
- the 5GHz radio use the channel 48. A second 5GHz radio (i.e. in the LibreRouter v1) will use the channel 157.

**Same configuration**    
The 80211s connection is configured with a default **mesh_id 'LiMe'** and **no-encryption**.    
Nearby routers so will simply connect each other when in range given they use the same frequencies.

**Usage**    
The WLAN standard 80211s is used in libremesh by default to allow to connect multiple wireless routers     
as if they were all connected to the **same ethernet switch**. Thus becoming visible each other via **layer 2 (mac)**.

This has a main advantage, over the classical AP-STA approach, to allow multiple wireless routers to connect each other:    
> As an example if we have 4 nodes A, B, C and D where A and B sees each other, B and C sees each other C and D sees each other.    
> With AP-STA mode each radio must operate either as AP or as STA, each STA must connect to only one AP at once,    
> STA need an AP to relay communication between thems. In each combination configuring each node either as AP or STA    
> you will see that some of them will end up not being able to connect." [0]

Some alternatives to 80211s includes Ad-Hoc, WDS, Multi-AP and EasyMesh and the newer APuP.    
Note that a large part, but not all, of radio drivers has a good support for 80211s connections.

**Usage details in libremesh**    
LibreMesh by default configures the 80211s connection with `mesh_fwding '0'` and `mesh_nolearn '1'` [1]

This implies that a libremesh node will not forward each packet to all the associated wireless nodes,    
and do not use the 80211s builtin multi-hop path discovery. But rather it will use the mesh routing protocol    
**batman-adv** or **babeld** to discover neighbours and establish the routes and so the paths a packet must follow.

### Wireless performances
A basic recommendation is to dedicate, where it is possible, a physical radio for the **client access** and another for the **wireless mesh links**.    
As an example **dual band routers** (2.4GHz and 5GHz) could be configured use the 5GHz for the wireless mesh connections and to reserve    
the 2.4GHz for client connections, which is sometimes the only one used by simple devices like printers, or old PCs.    

### Nearby routers
If the devices are in line of sight or with just a few walls in between, the above approach is recommended.    
If the router has a free usb port consider attaching additional radios using USB-Wifi adapter to the device (i.e. to have more 2.4GHz radios).    
In this case it will be required to install the openwrt/linux drivers corresponding to the adapter.

### Long range
Consider using the [LimeApp](./lime-app/index.md) to align nodes.    
It eases a lot the operation which could be made checking the wifi signal (dBm) using a browser rather than logging in to the device via ssh.    
Read: using a smartphone while you are on the roof installing the antenna.

Consider to change the **radio channel** to achieve a better **signal/noise ratio** taking into account the presence of non-partecipating neighbours. [2]

Consider to add i.e. `mesh_rssi_threshold '-80'` to prevent the wireless router to connect to nodes with which the signal would be too weak.    
i.e. with a wireless router with directional antennas which are oriented in different directions.


### Wireless CLI debug commands

Check if the radio is seeing the other node with openwrt's `iwinfo`
```
root@lime:~# iwinfo wlan0-mesh a
1A:61:B4:51:77:F0  -90 dBm / -106 dBm (SNR 16)  70 ms ago
	RX: 7.2 MBit/s  40528421 Pkts.
	TX: 6.5 MBit/s  13293796 Pkts.
	expected throughput: 5.9 MBit/s
```

Or do the same with `iw`:
```
root@lime:~# iw dev wlan0-mesh station dump
Station 1a:61:b4:51:77:f0 (on wlan0-mesh)
	mesh llid:	53914
	mesh plid:	28615
	mesh plink:	ESTAB
	mesh airtime link metric: 427
	mesh connected to gate:	no
	mesh connected to auth server:	no
	mesh local PS mode:	ACTIVE
	mesh peer PS mode:	ACTIVE
	mesh non-peer PS mode:	ACTIVE
	authorized:	yes
	authenticated:	yes
	associated:	yes
	preamble:	long
	WMM/WME:	yes
	MFP:		no
	TDLS peer:	no
	inactive time:	70 ms
	rx bytes:	4574667204
	rx packets:	40532711
	tx bytes:	15062972181
	tx packets:	13294308
	tx retries:	78442941
	tx failed:	148431
	rx drop misc:	526697
	signal:  	-90 [-92, -93, -95, -95] dBm
	signal avg:	-90 [-93, -93, -95, -95] dBm
	Toffset:	1051619735425 us
	tx bitrate:	30.0 MBit/s MCS 8 40MHz short GI
	tx duration:	4779575329 us
	rx bitrate:	7.2 MBit/s MCS 0 short GI
	rx duration:	1703345736 us
	last ack signal:-95 dBm
	avg ack signal:	-95 dBm
	airtime weight: 256
	expected throughput:	25.882Mbps
	DTIM period:	2
	beacon interval:100
	short slot time:yes
	connected time:	1550343 seconds
	associated at [boottime]:	707590.908s
	associated at:	1784846913134 ms
	current time:	1786397256097 ms
```

**batman**

Check if the interface is present
```
root@lime:~# batctl if
wlan0-mesh_270: active
```

Check neighbours
```
root@lime:~# batctl n
[B.A.T.M.A.N. adv 2025.4-openwrt-2, MainIF/MAC: lan_270/02:9a:f2:34:2a:fb (bat0/9e:10:fe:55:7d:4e BATMAN_IV)]
IF             Neighbor              last-seen
   wlan0-mesh_270	  02:58:47:51:77:f0    1.700s

```

**babel**

Check neighbours
```
root@lime:~# echo dump | nc ::1 30003 | grep neigh
add neighbour b6f03320 address fe80::1861:b4ff:fe51:77f0 if wlan0-mesh_17 reach d4fb ureach 0000 rxcost 385 txcost 341 cost 513
```

## Wired links

### LAN to LAN
This is the most common connection between libremesh nodes.

::: info     
Note that on router with DSA switch

To check if your device is dsa run
```
if grep -sq DEVTYPE=dsa /sys/class/net/*/uevent; then 
  echo "Is DSA"
fi
```


:::


### LAN to WAN
::: warning    
Connecting routers LAN to WAN requires a manual configuration, and can otherwise create loops and lead to a not functional network.    
This is true with the default packages set which include `lime-hwd-openwrt-wan`, otherwise it could be fine since without that package    
all ethernet ports comprised the WAN are configured as LAN.
:::


### WAN to WAN
Connecting two libremesh routers both via WAN port to connect two clouds for automatic L3 routing without requiring any manual intervention or configuration editing from the user, the port will effectively works automatically both as WAN and MESH if any or both of them are available.





[0] https://blog.freifunk.net/2024/08/24/a-new-way-to-mesh-apup/    
[1] Described in linux/include/uapi/linux/nl80211.h as:    
> @NL80211_MESHCONF_FORWARDING: set Mesh STA as forwarding or non-forwarding    
> or forwarding entity (default is TRUE - forwarding entity)

and:    
> @NL80211_MESHCONF_NOLEARN: Try to avoid multi-hop path discovery (e.g.    
> PREQ/PREP for HWMP) if the destination is a direct neighbor. Note that    
> this might not be the optimal decision as a multi-hop route might be    
> better. So if using this setting you will likely also want to disable    
> dot11MeshForwarding and use another mesh routing protocol on top.

[2] Amoung the various tools one could mentions `linssid` for debian.