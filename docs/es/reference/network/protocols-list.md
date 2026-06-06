---
outline: deep
---

# Lista de protocolos de red

Los valores predeterminados según `lime-defaults`
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

## Protocolos de red
Lista de protocolos configurados por LibreMesh, solo `lan` e `ieee80211s` están incluidos en el paquete `lime-system`
Los demás requieren el paquete relativo `lime-proto-<proto>`. 

::: tip NOTA
Si estableces algunos protocolos en `/etc/config/lime-node`, o `/etc/config/lime-community` sobrescribes la *lista completa* de protocolos establecida en `/etc/config/lime-defaults`
:::

Verifica la lista aplicada en `lime-autogen`
```sh
uci get lime-autogen.network.protocols
```

### anygw
- Predeterminado: `habilitado`
- Paquetes requeridos: `lime-proto-anygw`
```
    list protocols anygw
```

### batadv
- Predeterminado: `habilitado`
- Paquetes requeridos: `lime-proto-batadv`
- Parámetro 1: `vlan_number` predeterminado `%N1` (de 29 a 256)
- Parámetro 2: `vlan_type` predeterminado `8021ad` 
- Tipo del parámetro 2: `8021ad|8021q`

```
    list protocols batadv:%N1
```
Si la vlan es `0`, las etiquetas están deshabilitadas y el enrutamiento se realiza en la interfaz sin etiquetar.
```
    list protocols batadv:0
```

::: tip 
Consulta la página sobre [batman-adv](protocols/batman-adv) para la configuración predeterminada.
:::
### babeld
- Predeterminado: `habilitado`
- Paquetes requeridos: `lime-proto-babeld`
- Parámetro 1: `vlan` predeterminado `17`

```
    list protocols babeld:17
```
::: tip
Consulta la página sobre [babeld](protocols/babeld) para la configuración predeterminada.
:::

### bmx7
- Predeterminado: `habilitado`
- Paquetes requeridos: `lime-proto-bmx7`
- Parámetro 1: `vlan` predeterminado `18`

```
    list protocols bmx7:18
```

### ieee80211s
- Predeterminado: `habilitado`
```
    list protocols ieee80211s
```

### lan
- Predeterminado: `habilitado`
```
    list protocols lan
```

### olsr
- Predeterminado: `habilitado`
- Paquetes requeridos: `lime-proto-olsr`
- Parámetro 1: `vlan`

```
    list protocols olsr:14
```
No uses un ID de VLAN entre 29 y 284, ya que este rango está reservado para batadv:%N1 

### olsr2
- Predeterminado: `habilitado`
- Paquetes requeridos: `lime-proto-olsr2`
```
    list protocols olsr2:16
```
### olsr6
- Predeterminado: `habilitado`
- Paquetes requeridos: `lime-proto-olsr6`
```
    list protocols olsr6:15
```

## Otros protocolos de red

### bgp
- Paquetes requeridos: `lime-proto-bgp`

```
config bgp_peer peer1
    option remoteIP '192.0.2.6'
    option remoteAS '65550'

config bgp_peer peer2
    option remoteIP '2001:db8::c001'
    option remoteAS '65549'
```

Una sección para cada par BGP

## Protocolos específicos de interfaz
Los siguientes protocolos solo deben incluirse en una sección específica de interfaz, es decir, `config net lan1`. Consulta la siguiente página para obtener más detalles.

::: tip NOTA
Los siguientes protocolos deben incluirse en una sección específica de interfaz `config net <nombre_seccion>`
:::

### manual

Deshabilita lime-config para `lan1`
```
config net port1
    linux_name 'lan1'
    list protocols 'manual'
```
::: warning NOTA
Si usas `manual` no debes especificar otros protocolos en el mismo puerto, o tu configuración se romperá!
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

- `static_gateway_ipv4|static_gateway_ipv6` - Omite esta línea si no se debe agregar una ruta predeterminada en esta interfaz.

### wan
- Paquetes requeridos: `lime-proto-wan`

```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'wan'
```

El [sabor por defecto](/reference/flavors) incluye el paquete `lime-proto-hwd-openwrt-wan` que instala `lime-proto-wan`
y configura el puerto WAN predeterminado de OpenWrt como WAN.

