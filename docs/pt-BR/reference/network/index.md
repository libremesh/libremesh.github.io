---
outline: deep
---

# Opciones de red
La configuración de cada dispositivo de red se calcula a partir de:
- las **opciones generales** en `config lime network`, 
- una **sección específica de interfaz** opcional relativa a ese dispositivo de red en particular.

## Valores predeterminados
Valores predeterminados según `/etc/config/lime-defaults`
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

## Opciones generales
```
config lime 'network'
	option primary_interface 'eth0'
	option main_ipv4_address '10.%N1.0.0/16'
	option main_ipv6_address 'fd%N1:%N2%N3:%N4%N5::/64'
```

### primary_interface
- Tipo: `string`
- Predeterminado: `eth0`

```
config lime network
    option primary_interface 'eth0'
```

La dirección mac de este dispositivo se usará en diferentes lugares.    
Una lista parcial incluye:
- Opciones parametrizadas con `%Mn`
- Las interfaces soft de Batman-adv usan los últimos 3 bytes de la interfaz principal bat0 que es igual a la mac de `primary_interface`

### main_ipv4_address
- Tipo: `<static>|<parametrizado>|<direccion-de-red>`
- Predeterminado: `10.%N1.0.0/16`
- Parámetro 1: subred (obligatorio)
- Parámetro 2: parametrización de IP asignada automáticamente al nodo

```
config lime network
    option main_ipv4_address '10.%N1.0.0/16'
```

Aquí tienes 4 posibilidades: 
- `static` - `10.0.2.1/16` - establece una IP estática y la subred
- `parametrizado` - `10.%N1.%M5.%M6/16` - Parametrizable con %Mn y %Nn y establece la subred
- `direccion-de-red` - `10.%N1.0.0/16` - Establece toda una dirección de red (no una IP específica) para obtener la IP autocompletada en esa red con bits de la dirección MAC. esto funciona también con máscaras de red distintas de `/24` o `/16`, como `10.0.128.0/17` (pero no direcciones de red válidas, por ejemplo `192.0.128.0/16` o `192.0.129.0/17` no serán parametrizadas).
- `direccion-de-red` - `10.0.128.0/16/17` - Usa el segundo parámetro para la parametrización de la IP del nodo. Esto da como resultado una subred `/16` pero la IP del router LibreMesh será asignada automáticamente en un rango `/17` (de 10.0.128.1 a 10.0.255.254).

### main_ipv6_address
- Tipo: `string`
- Predeterminado: `fd%N1:%N2%N3:%N4%N5::/64`
- Parámetro 1: subred (obligatorio) predeterminado `/64`
- Parámetro 2: parametrización de IP asignada automáticamente al nodo

```
config lime network
    option main_ipv4_address '10.%N1.0.0/16'
```

Parametrizable de la misma manera que `main_ipv4_address`.    
Si se usa, el autocompletado de IP llenará como máximo los últimos 24 bits, por lo que especificar un rango de autocompletado de IP mayor que /104 no es útil.

## Servidores DNS

### list resolvers
- Tipo: `list`
- Predeterminado: `4.2.2.2 141.1.1.1 2001:470:20::2`

```
config lime network
    list resolvers 4.2.2.2                              # b.resolvers.Level3.net  
    list resolvers 141.1.1.1                            # cns1.cw.net 
    list resolvers 2001:470:20::2                       # ordns.he.net
```

Servidores DNS que usará el nodo. La lista está ordenada de mayor a menor prioridad.   
Establece cada entrada vacía para usar el servidor DNS del proveedor de internet

```
config lime network
    list resolvers ''
```
