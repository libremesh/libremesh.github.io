---
outline: deep
---

# Network protocols options

The default values as per `lime-defaults`
```
config lime 'network'
	option anygw_dhcp_start '2'
	option anygw_dhcp_limit '0'
	option anygw_mac "aa:aa:aa:%N1:%N2:aa"
	option batadv_orig_interval '2000'
	option batadv_routing_algo 'BATMAN_IV'
	option bmx7_mtu '1500'
	option bmx7_publish_ownip false
	option bmx7_over_batman false
	option bmx7_pref_gw none
	option bmx7_wifi_rate_max 'auto'
	option bmx7_enable_pki false
	option use_odhcpd false
```

## anygw options

::: tip NOTE
The package `lime-proto-anygw` is included in the [`default flavor`](/reference/flavors)
:::

### anygw_dhcp_start
- Type: `number`
- Default: `2`
- Packages required: `lime-proto-anygw`

```
config lime network
    option anygw_dhcp_start '2'
```

First IP in the subnet to be used for DHCP for clients.    
For example, if the subnet is 10.x.0.0/16 and you want the clients to get an IPv4 from a DHCP pool starting from 10.x.100.2, the start parameter will have to be 100 * 256 + 2 = 25602.

### anygw_dhcp_limit
- Type: `number`
- Default: `0`
- Packages required: `lime-proto-anygw`

```
config lime network
    option anygw_dhcp_limit '0'
```

Number of IPs available for DHCP.    
Use zero for having the DHCP pool ranging from anygw_dhcp_start up to the end of the subnet.    
For example, if the subnet is 10.x.0.0/16, the start of the DHCP pool is at 10.x.100.2 and you want it to finish at 10.x.127.254, 
the limit parameter will have to be (127 - 100) * 256 + (254 - 2) + 1 = 7165. 

### anygw_mac
- Type: `string`
- Default: `aa:aa:aa:%N1:%N2:aa`
- Packages required: `lime-proto-anygw`

```
config lime network
    option anygw_mac 'aa:aa:aa:%N1:%N2:aa'
```

Parametrizable with `%Nn`. Keep in mind that the `nftables` rule will use a mask of `ff:ff:ff:00:00:00`.


## batadv options

::: tip NOTE
The package `lime-proto-batadv` is included in the [`default flavor`](/reference/flavors)
:::

### batadv_orig_interval
- Type: `number` `ms`
- Default: `2000`

```
config lime network
    option batadv_orig_interval '2000' 
```

BATMAN-adv will send one Originator Message (OGM) packet every 2000 ms (2 seconds). 
This value should be ok for the static networks, in which the LibreMesh routers are not moving. 
If you have a LibreMesh node moving (e.g. in your backpack) consider decreasing this value. 
A smaller value means that BATMAN-adv will take less time for realizing which links are better, 
but will generate more background traffic on all the interfaces.

### batadv_routing_algo
- Type: `BATMAN_IV|BATMAN_V`
- Default: `BATMAN_IV`

```
config lime network
    option batadv_routing_algo 'BATMAN_IV' 
```

BATMAN_V uses throughput rather than packet loss (as in BATMAN_IV) for evaluating the quality of a link.

## bmx7 options

### bmx7_mtu
- Type: `number`
- Default: `1500`

```
config lime network
    option bmx7_mtu '1500'
```
Set MTU for bmx7 tunnel interfaces.

### bmx7_publish_ownip
- Type: `boolean`
- Default: `false`

```
config lime network
    option bmx7_publish_ownip false
```
Announce also a /32 route about each node.


### bmx7_over_batman
- Type: `boolean`
- Default: `false`

```
config lime network
    option bmx7_over_batman false
```

### bmx7_pref_gw
- Type: `string|none`
- Default: `none`

```
config lime network
    option bmx7_pref_gw none
```

Force bmx7 to use a specific gateway to Internet (hostname must be used as identifier).

### bmx7_wifi_rate_max
- Type: `number|auto`
- Default: `auto`

```
config lime network
    option bmx7_wifi_rate_max 'auto'
```

### bmx7_enable_pki
- Type: `boolean`
- Default: `false`

```
config lime network
    option bmx7_enable_pki false
```
Trust only nodes in /etc/bmx7/trustedNodes when set (default is to trust all nodes).


## autoap - lime-ap-watchping

### autoap_enabled
Type: `boolean`    
Default: `0`    
Packages required: `lime-ap-watchping`

```
config lime network
    option autoap_enabled 0
```
If enabled AP SSID is changed to ERROR when network issues.

### autoap_hosts
Type: `string`    
Default: `8.8.8.8 141.1.1.1`    
Packages required: `lime-ap-watchping`

```
config lime network
    option autoap_hosts "8.8.8.8 141.1.1.1"
```
Hosts used to check if the network is working fine.

## odhcpd

```
config lime network
    option use_odhcpd false
```
Option to enable the usage of odhcpd as dhcp server.    
Enable it to have a dhcp server when building libremesh without `lime-proto-anygw` that by default uses `dnsmasq-dhcpv6`.
