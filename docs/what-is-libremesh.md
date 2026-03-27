---
outline: deep
---

# What is LibreMesh?

## Objectives to Achieve

  - Enable non-expert users to set up a mesh network and perform basic configuration and management via a web interface usable on smartphones
  - Encourage non-expert users to empower themselves deepening their technical understanding of mesh networks
  - Scalability
  - Network segmentation
  - Layer 2 roaming inside certain areas
  - Smart gateway selection with redundancy and possibility of user-choice
  - Compatibility with many different scenarios
  - A single firmware image for all the routers of your network

## The Basics

The network architecture designed for LibreMesh is based on two layers:

### Cloud layer 2
::: info The cloud layer 2 uses the dynamic routing protocol [BATMAN-adv](https://en.wikipedia.org/wiki/B.A.T.M.A.N.).

![batmanadv](/batmanadv_logo.svg){width=250 height=200}

***
B.A.T.M.A.N. Advanced is a mesh routing protocol that runs in kernel space.
Even if the network topology is made of multiple nodes and multiple hops, B.A.T.M.A.N. Advanced abstracts it to a single layer 2 broadcast domain.
So from the user's perspective the entire mesh will look like a single LAN.
This architecture is robust for roaming purposes, thus TCP and UDP connections are not lost even when moving and changing access points.
***
:::
### Network layer 3
::: info The whole network layer 3 uses by default the routing protocol [Babel](https://en.wikipedia.org/wiki/Babel_(protocol)).
![Babel](/babel_logo.svg){width=200 height=200}

***
Babel is a robust and efficient routing protocol for both wireless mesh networks and wired networks
***
:::

### Mixing layers

By default, all nodes are running both routing protocols (Babel and BATMAN-adv), but on different VLANs.footnote:[Virtual isolated LAN, for instance wlan0.13].

::: tip NOTE
The Babel VLAN is always the same, so all link-layer connected nodes will see each other.    
The BATMAN-adv VLAN depends on the cloud identifier which is calculated (by default) using the hash of the AP SSID.

The Babel network will be a single one for all of the mesh, but the BATMAN-adv network may be separated between different local clouds.
:::

![](/network1.png)

**This configuration isolates the layer 2 clouds**.
For instance a neighborhood, a company complex, or a street level hotspot network may choose to isolate their LAN from the rest of the network.
However at the same time, they will be able to reach the rest of the nodes using the layer 3 routed network.

Roaming will be available inside the cloud, so TCP sessions, video streaming, or even a SIP call can be done while moving around.
On the other hand, thanks to layer 3 segmentation, the common problems found in a layer 2 bridged network -- such as Broadcast storms or DHCP nightmares --
will not disturb the correct operation of the network.

::: tip
Everything is automatic and transparent for the end user.
:::

![](/network2.png)


## The Details

WiFi Access Points of the same cloud share common parameters:

* The SSID (the WiFi AP identification name)
* Special anycast.footnote:[IP shared by multiple devices in the network] IPv4 and IPv6 addresses 
* A special anycast MAC address
* The DHCP/RA server to provide valid IPs from the cloud to the clients.

Thus a client attached to an AP can move around the mesh without the need to renew their IP configuration.
Even the MAC layer will be the same from their point of view.

![](/network3.png)

::: tip
The DHCP lease file is shared among the cloud to prevent collisions using
[shared-state](https://github.com/libremesh/shared-state-async)

As long as all nodes share the same anycast MAC/IP, from the client point of view it is fully transparent. 
The gateway is always the same even though the mesh node (where they are attached) may change.
:::

![](/network4.png)

When a client wants to go out from the LAN (cloud) to reach the Internet or any other network,
it will send the packets to the special anycast gateway address. The node where the client
is physically attached will take care of this.

::: tip
An nftables rule in the LAN/AP bridge prevents packets sent to the anycast address 
from propagating through the cloud. 
The mesh node where the client is associated gets the packet but not the other nodes.
:::

![](/network5.png)

The packet is routed through the Babel layer 3 network to the closest Internet gateway. 
It may be a node from the same cloud or any other from another cloud far away.

![](/network6.png)


## Diagrams

- Example diagram listing all network interfaces created in LibreMesh installed on a **OpenWrt One** router.
[![diagram_libremesh-interfaces-openwrt-one](/diagram_libremesh-interfaces-openwrt-one.png)](/diagrams/libremesh-interfaces-openwrt-one)
