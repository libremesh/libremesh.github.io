<script setup>
import { data as libremesh } from '/libremesh.data.js'
</script>

# Flavors

## Default flavor

### Packages list 
The LibreMesh default `flavor` contains these packages:
<ul>
<li v-for="p in libremesh.flavors.default">
  <a v-if="!['batctl-default'].includes(p)" :href="'/packages/'+p">{{ p }}</a>
  <span v-else>{{ p }}</span>
</li>
</ul>

### Configuration

#### WAN port
Configure as WAN
Configure default protocols on top of it:
-  `babeld:17` - creates a 8021ad soft vlan number 17 and run babel on it
-  `batadv:%N1` - creates a 8021ad soft vlan number %N1 and add it to list of batman-adv interfaces

This creates 3 interfaces:
- `wan@eth0` - dhcp client
- `wan_17@eth0` - babeld vlan 17 8021ad
- `wan_29@eth0` - babeld vlan 29 8021ad

#### LAN ports
Add each lan port to the main bridge `br-lan`    
Configure default protocols on top of each port:
-  `babeld:17` - creates a 8021ad soft vlan number 17 and run babel on it
-  `batadv:%N1` - creates a 8021ad soft vlan number %N1 and add it to list of batman-adv interfaces

Configure the br-lan with network options:
- `main_ipv4_address`
- `main_ipv6_address`

Creates 3 interfaces for each lan port:
- `lan@eth1` - raw device unmanaged: untagged packets will go to the interface `br-lan`
- `lan_17@eth1` - babeld vlan 17 8021ad
- `lan_29@eth1` - babeld vlan 29 8021ad

#### Radios `2ghz` and `5ghz`
Configure default modes `ieee80211s`, `ap`, `apname`

Configure default protocols on top of each port:
-  `babeld:17` - creates a 8021ad soft vlan number 17 and run babel on it
-  `batadv:%N1` - creates a 8021ad soft vlan number %N1 and add it to list of batman-adv interfaces



#### Anygw
The bridge br-lan includes ethernet `lan` ports as well as radio interfaces configured as Access Point (`ap` or `apname` mode)

On top of `br-lan` it is configured a `mac-vlan` interface with for the `anygateway` feature.     
The MAC/ipv4/ipv6 addresses of this interface are the same for all nodes with that share the same `lime-autogen.wifi.ap_ssid`

#### Shared State
a Conflict-Free Replicated Data Type (CRDT) daemon.     
This module enables seamless information exchange between nodes in a decentralized network, ensuring consistency and reliability.

Files are not persisted by default in flash, they can be seen in `/tmp/shared-state/data/`
The information shared by default depends from shared-state's `publishers` installed.

- shared-state-babeld_hosts - `babeld` connected nodes
- shared-state-bat_hosts - `batadv` connected nodes
- shared-state-nodes_and_links


## Flavor Mini

### Packages list
The LibreMesh `mini` flavor contains these packages:

<ul>
<li v-for="p in libremesh.flavors.mini"><a :href="'/packages/'+p">{{ p }}</a></li>
</ul>

### Configuration
The configuration is the same as the one of the default flavor.

### Excluded packages
The removed packages are:

- batctl-default - CLI utility to manage batman-adv interfaces with debug commands, in absence `batctl-tiny` is installed
- lime-app - the web interface
- lime-docs - offline docs
- lime-debug - set of debug tools including `tcpdump`, `mtr`, `iperf3`
- shared-state-async - newer shared-state in C++
- lime-hwd-ground-routing - to manage ground routing connections
