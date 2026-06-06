---
outline: deep
---

# Opciones de protocolos de red

Los valores predeterminados según `lime-defaults`
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

## anygw

::: tip NOTA
El paquete `lime-proto-anygw` está incluido en el [`sabor por defecto`](/reference/flavors)
:::

### anygw_dhcp_start
- Tipo: `number`
- Predeterminado: `2`
- Paquetes requeridos: `lime-proto-anygw`

```
config lime network
    option anygw_dhcp_start '2'
```

Primera IP en la subred que se usará para DHCP para clientes.    
Por ejemplo, si la subred es 10.x.0.0/16 y quieres que los clientes obtengan una IPv4 de un grupo DHCP comenzando en 10.x.100.2, el parámetro de inicio deberá ser 100 * 256 + 2 = 25602.

### anygw_dhcp_limit
- Tipo: `number`
- Predeterminado: `0`
- Paquetes requeridos: `lime-proto-anygw`

```
config lime network
    option anygw_dhcp_limit '0'
```

Número de IPs disponibles para DHCP.    
Usa cero para que el grupo DHCP abarque desde anygw_dhcp_start hasta el final de la subred.    
Por ejemplo, si la subred es 10.x.0.0/16, el inicio del grupo DHCP está en 10.x.100.2 y quieres que termine en 10.x.127.254, 
el parámetro límite deberá ser (127 - 100) * 256 + (254 - 2) + 1 = 7165. 

### anygw_mac
- Tipo: `string`
- Predeterminado: `aa:aa:aa:%N1:%N2:aa`
- Paquetes requeridos: `lime-proto-anygw`

```
config lime network
    option anygw_mac 'aa:aa:aa:%N1:%N2:aa'
```

Parametrizable con `%Nn`. Ten en cuenta que la regla `nftables` usará una máscara de `ff:ff:ff:00:00:00`.


## batadv
Consulta la [página de batman-adv](protocols/batman-adv) para la configuración predeterminada.

::: tip NOTA
El paquete `lime-proto-batadv` está incluido en el [`sabor por defecto`](/reference/flavors)
:::

### batadv_orig_interval
- Tipo: `number` `ms`
- Predeterminado: `2000`

```
config lime network
    option batadv_orig_interval '2000' 
```

BATMAN-adv enviará un paquete de mensaje Originator (OGM) cada 2000 ms (2 segundos). 
Este valor debería ser adecuado para redes estáticas, en las que los routers LibreMesh no se desplazan. 
Si tienes un nodo LibreMesh en movimiento (por ejemplo, en tu mochila), considera disminuir este valor. 
Un valor menor significa que BATMAN-adv tardará menos en determinar qué enlaces son mejores, 
pero generará más tráfico de fondo en todas las interfaces.

### batadv_routing_algo
- Tipo: `BATMAN_IV|BATMAN_V`
- Predeterminado: `BATMAN_IV`

```
config lime network
    option batadv_routing_algo 'BATMAN_IV' 
```

BATMAN_V utiliza el throughput en lugar de la pérdida de paquetes (como en BATMAN_IV) para evaluar la calidad de un enlace.

## bmx7

### bmx7_mtu
- Tipo: `number`
- Predeterminado: `1500`

```
config lime network
    option bmx7_mtu '1500'
```
Establece el MTU para las interfaces de túnel bmx7.

### bmx7_publish_ownip
- Tipo: `boolean`
- Predeterminado: `false`

```
config lime network
    option bmx7_publish_ownip false
```
Anuncia también una ruta /32 sobre cada nodo.


### bmx7_over_batman
- Tipo: `boolean`
- Predeterminado: `false`

```
config lime network
    option bmx7_over_batman false
```

### bmx7_pref_gw
- Tipo: `string|none`
- Predeterminado: `none`

```
config lime network
    option bmx7_pref_gw none
```

Fuerza a bmx7 a usar un gateway específico hacia Internet (debe usarse el hostname como identificador).

### bmx7_wifi_rate_max
- Tipo: `number|auto`
- Predeterminado: `auto`

```
config lime network
    option bmx7_wifi_rate_max 'auto'
```

### bmx7_enable_pki
- Tipo: `boolean`
- Predeterminado: `false`

```
config lime network
    option bmx7_enable_pki false
```
Confía solo en los nodos en /etc/bmx7/trustedNodes cuando está activado (el valor predeterminado es confiar en todos los nodos).


## autoap - lime-ap-watchping

### autoap_enabled
Tipo: `boolean`    
Predeterminado: `0`    
Paquetes requeridos: `lime-ap-watchping`

```
config lime network
    option autoap_enabled 0
```
Si está habilitado, el SSID del AP se cambia a ERROR cuando hay problemas de red.

### autoap_hosts
Tipo: `string`    
Predeterminado: `8.8.8.8 141.1.1.1`    
Paquetes requeridos: `lime-ap-watchping`

```
config lime network
    option autoap_hosts "8.8.8.8 141.1.1.1"
```
Hosts utilizados para verificar si la red funciona correctamente.

## odhcpd

```
config lime network
    option use_odhcpd false
```
Opción para habilitar el uso de odhcpd como servidor dhcp.    
Habilítalo para tener un servidor dhcp al compilar libremesh sin `lime-proto-anygw`, que por defecto usa `dnsmasq-dhcpv6`.
