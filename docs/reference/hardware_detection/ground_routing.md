# Ground routing

One section for each ground routing link.

With ground routing we mean setups having LibreMesh on a router which is connected via cable(s), eventually through a switch, 
to some wireless routers running the original firmware in WDS (transparent bridge) Ap/Sta mode.

Likely you want to configure as many sections of ground routing with different VLAN numbers or different switch ports as many connected devices in WDS mode.
For a detailed description refer to https://github.com/libremesh/lime-packages/issues/443

```
config hwd_gr link1
    option net_dev 'eth0'                               
    option vlan '5'
    option switch_dev 'switch0'
    option switch_cpu_port '0'
    list switch_ports '4t'                              

```

- `option net_dev 'eth0'` - Plain ethernet device on top of which 802.1q VLAN will be constructed. In case of doubts rely on https://openwrt.org/toh/start
- `option vlan '5'` - VLAN ID to use for this ground routing link, use little one because cheap switch doesn't supports big IDs. this will be used also as 802.1q VID on tagged ports
- `option switch_dev 'switch0'` - These options regarding switch need to be set only if your ethernet device is connected to a switch chip. If the switch exists you can read its name (like switch0) in /etc/config/network file
- `option switch_cpu_port '0'` - Refer to switch port map of your device on https://openwrt.org/toh/start to know CPU port index
- `list switch_ports '4t'` - List switch ports on which you want the VLAN being passed, use the 't' suffix to specify the port being tagged, refer to https://openwrt.org/toh/start for correspondence with physical ports
