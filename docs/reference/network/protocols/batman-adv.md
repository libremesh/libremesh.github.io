# Batman-adv

![batmanadv](/batmanadv_logo.svg){width=250 height=200}

## Reference
- [B.A.T.M.A.N. on Wikipedia](https://en.wikipedia.org/wiki/B.A.T.M.A.N.)
- OpenWrt wiki page for [B.A.T.M.A.N. / batman-adv](https://openwrt.org/docs/guide-user/network/wifi/mesh/batman)
- Open-Mesh wiki page for [B.A.T.M.A.N. advanced](https://www.open-mesh.org/projects/batman-adv/wiki/Wiki)

## Default options:
- `routing_algo`: `BATMAN_IV`
- `bridge_loop_avoidance`: `1`
- `multicast_mode`: `0`
- `batadv_orig_interval`: `2000`
- `distributed_arp_table`: `0`
- `gw_mode`: `client` - set gw_mode=client everywhere. Since there's no gw_mode=server, this makes bat0 never forward requests so a rogue DHCP server doesn't affect whole network (DHCP requests are always answered locally)
- Support `alfred` if installed, replaced by `shared-state`

- Set a unique macaddress for each batman interface    
    Avoid dmesg flooding caused by BLA with messages like "br-lan:
    received packet on bat0 with own address as source address".
    Tweak MAC address for each of the interfaces used by Batman-adv
    00 + Locally administered unicast .. 2 bytes from interface name
.. 3 bytes from main interface

- set the `mtu` for each vlan interface to `1532`
