---
outline: deep
---

# Network options
Configuration for each network device is calculated from:
- the **general options** in `config lime network`, 
- an (optional) **interface specific section** relative to that specific network device.

## Default values
Default values as per `/etc/config/lime-defaults`
```
config lime network
	option primary_interface 'eth0'
	option main_ipv4_address '10.%N1.0.0/16'
	option anygw_dhcp_start '2'
	option anygw_dhcp_limit '0'
	option main_ipv6_address 'fd%N1:%N2%N3:%N4%N5::/64'
	list protocols ieee80211s
	list protocols lan
	list protocols anygw
	list protocols batadv:%N1
	list protocols olsr:14
	list protocols olsr6:15
	list protocols olsr2:16
	list protocols babeld:17
	list protocols bmx7:18
	list resolvers 4.2.2.2   # b.resolvers.Level3.net
	list resolvers 141.1.1.1 # cns1.cw.net
	list resolvers 2001:470:20::2 # ordns.he.net
	option bmx7_mtu '1500'
	option bmx7_publish_ownip false
	option bmx7_over_batman false
	option bmx7_pref_gw none
	option bmx7_wifi_rate_max 'auto'
	option bmx7_enable_pki false
	option batadv_orig_interval '2000'
	option batadv_routing_algo 'BATMAN_IV'
	option anygw_mac "aa:aa:aa:%N1:%N2:aa"
	option use_odhcpd false
```

## General options
```
config lime 'network'
	option primary_interface 'eth0'
	option main_ipv4_address '10.%N1.0.0/16'
	option main_ipv6_address 'fd%N1:%N2%N3:%N4%N5::/64'
```

### primary_interface
- Type: `string`
- Default: `eth0`

```
config lime network
    option primary_interface 'eth0'
```

The mac address of this device will be used in different places.    
An partial list includes:
- Options parametrized with `%Mn`
- Batman-adv soft interfaces use the last 3 bytes from main interface bat0 which is equal to the mac of `primary_interface`

### main_ipv4_address
- Type: `<static>|<parametrized>|<network-address>`
- Default: `10.%N1.0.0/16`
- Parameter 1: subnet (required)
- Parameter 2: node auto-assigned IP parametrization

```
config lime network
    option main_ipv4_address '10.%N1.0.0/16'
```

Here you have 4 possibilities: 
- `static` - `10.0.2.1/16` - set a static IP and the subnet
- `parametrized` - `10.%N1.%M5.%M6/16` - Parametrizable with %Mn and %Nn and set the subnet
- `network-address` - `10.%N1.0.0/16` - Set a whole network address (not a specific IP) for getting the IP autocompleted in that network with bits from MAC address. this works also with netmasks other than `/24` or `/16`, like `10.0.128.0/17` (but not valid network addresses, for example `192.0.128.0/16` or `192.0.129.0/17` won't get parametrized).
- `network-address` - `10.0.128.0/16/17` - Use the second parameter for node IP parametrization. This results in `/16` subnet but the IP of the LibreMesh router will be auto-assigned in a `/17` range (from 10.0.128.1 to 10.0.255.254).

### main_ipv6_address
- Type: `string`
- Default: `fd%N1:%N2%N3:%N4%N5::/64`
- Parameter 1: subnet (required) default `/64`
- Parameter 2: node auto-assigned IP parametrization

```
config lime network
    option main_ipv4_address '10.%N1.0.0/16'
```

Parametrizable in the same way as `main_ipv4_address`.    
If used, the IP autocompletion will fill maximum the last 24 bits, so specifying an IP autocompletion range bigger than /104 is not useful.

## DNS servers

### list resolvers
- Type: `list`
- Default: `4.2.2.2 141.1.1.1 2001:470:20::2`

```
config lime network
    list resolvers 4.2.2.2                              # b.resolvers.Level3.net  
    list resolvers 141.1.1.1                            # cns1.cw.net 
    list resolvers 2001:470:20::2                       # ordns.he.net
```

DNS servers node will use. The list is ordered from top to bottom.   
Set every entry empty for using the upstream (ISP) DNS server

```
config lime network
    list resolvers ''
```