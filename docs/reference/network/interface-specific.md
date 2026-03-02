---
outline: deep
---

# Network interface specific options

## Configure an ethernet port
Create a section named `port2` for the network device `lan2`   
Do not put any `.` in the section name.
```
config net port2
  option linux_name 'eth0.2'
  ...
```

Available protocols: `apbb, batadv, babeld, bgp, bmx7, client, lan, manual, olsr, olsr2, olsr6, static, wan`

::: tip manual
If you use the protocol `manual` do not specify other protocols, may result in an unpredictable behavior/configuration (likely you loose connection to the node)
:::

## WAN port
Configure an network ethernet port as WAN using the protocol `wan` or `static`.

### wan (DHCP)
Use `wan` protocol to get Internet connectivity via DHCP
```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'wan'

```

### static (ipv4)
Use `static` protocols and specify the router 'IPv4/subnet' and the gateway IPv4.
```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'static'
  option static_ipv4 '192.168.1.2/24'
  option static_gateway_ipv4 '192.168.1.1'
```

### static (ipv6)
Use `static` protocols and specify the router 'IPv6/subnet' and the gateway IPv6.
```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'static'
  option static_ipv6 '2a00:1508:0a00::1234/64'
  option static_gateway_ipv6 'fe80::1'
```

## LAN port
Configure `lan1` for users to connect to, not for connection to other nodes.
```
config net port1
    option linux_name 'lan1'
    list protocols 'lan'
```

## Mesh only port
The protocol `batadv:%N1` needs to be specified if the other node is in the same mesh cloud i.e. same `ap_ssid`.
```
config net port1
    option linux_name 'lan1'
    list protocols 'batadv:%N1'
    list protocols 'babeld:17'
```
