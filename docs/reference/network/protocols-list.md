---
outline: deep
---

# Network protocols list

The default values as per `lime-defaults`
```
config lime 'network'
	list protocols anygw
	list protocols batadv:%N1
	list protocols babeld:17
	list protocols bmx7:18
	list protocols ieee80211s
	list protocols lan
	list protocols olsr:14
	list protocols olsr2:16
	list protocols olsr6:15
```

## Network protocols
List of protocols configured by LibreMesh, only `lan` and `ieee80211s` are included in the package `lime-system`
The others require the relative package `lime-proto-<proto>`. 

::: tip NOTE
If you set some protocols in `/etc/config/lime-node`, or `/etc/config/lime-community` you overwrite the *whole* list of protocols set in `/etc/config/lime-defaults`
:::

Check the applied list in `lime-autogen`
```sh
uci get lime-autogen.network.protocols
```

### anygw
- Default: `enabled`
- Packages required: `lime-proto-anygw`
```
    list protocols anygw
```

### batadv
- Default: `enabled`
- Packages required: `lime-proto-batadv`
- Parameter 1: `vlan_number` default `%N1` (from 29 to 256)
- Parameter 2: `vlan_type` default `8021ad` 
- Parameter 2 type: `8021ad|8021q`

```
    list protocols batadv:%N1
```
If the vlan is `0` tags are disabled and the routing is done on the raw interface.
```
    list protocols batadv:0
```

::: tip 
See the page about [batman-adv](protocols/batman-adv) for the default configuration.
:::
### babeld
- Default: `enabled`
- Packages required: `lime-proto-babeld`
- Parameter 1: `vlan` default `17`

```
    list protocols babeld:17
```
::: tip
See the page about [babeld](protocols/babeld) for the default configuration.
:::

### bmx7
- Default: `enabled`
- Packages required: `lime-proto-bmx7`
- Parameter 1: `vlan` default `18`

```
    list protocols bmx7:18
```

### ieee80211s
- Default: `enabled`
```
    list protocols ieee80211s
```

### lan
- Default: `enabled`
```
    list protocols lan
```

### olsr
- Default: `enabled`
- Packages required: `lime-proto-olsr`
- Parameter 1: `vlan`

```
    list protocols olsr:14
```
Do not use a VLAN ID between 29 and 284 as this range is reserved for batadv:%N1 

### olsr2
- Default: `enabled`
- Packages required: `lime-proto-olsr2`
```
    list protocols olsr2:16
```
### olsr6
- Default: `enabled`
- Packages required: `lime-proto-olsr6`
```
    list protocols olsr6:16
```

## Other network protocols

### bgp
- Packages required: `lime-proto-bgp`

```
config bgp_peer peer1
    option remoteIP '192.0.2.6'
    option remoteAS '65550'

config bgp_peer peer2
    option remoteIP '2001:db8::c001'
    option remoteAS '65549'
```

One section for each BGP peer

## Interface specific protocols
The following protocols should only be included in an interface specific section, i.e. `config net lan1`. See the next page for details.

::: tip NOTE
The following protocols should be included in an interface specific section `config net <section_name>`
:::

### manual

Disable lime-config for `lan1`
```
config net port1
    linux_name 'lan1'
    list protocols 'manual'
```
::: warning NOTE
If you use `manual` you must not specify other protocols on the same port, or your configuration will be broken!
:::

### static
```
config net port1
    option linux_name 'lan1'
    list protocols 'static'
    option static_ipv4 '192.168.1.2/24'
    option static_gateway_ipv4 '192.168.1.1'
    option static_ipv6 '2a00:1508:0a00::1234/64'
    option static_gateway_ipv6 'fe80::1'
```

- `static_gateway_ipv4|static_gateway_ipv6` - Skip this line if no default route should be added on this interface.

### wan
- Packages required: `lime-proto-wan`

```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'wan'
```

The [default flavor](/reference/flavors) include the package `lime-proto-hwd-openwrt-wan` which install `lime-proto-wan`
and configure the default OpenWrt WAN port as WAN.


