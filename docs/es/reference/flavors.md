<script setup>
import { data as libremesh } from '/libremesh.data.js'
</script>

# Flavors

## Flavor por defecto

### Lista de paquetes
El flavor `default` de LibreMesh contiene estos paquetes:
<ul>
<li v-for="p in libremesh.flavors.default">
  <a v-if="!['batctl-default'].includes(p)" :href="'/packages/'+p">{{ p }}</a>
  <span v-else>{{ p }}</span>
</li>
</ul>

### Configuración

#### Puerto WAN
Configurar como WAN
Configurar protocolos predeterminados sobre él:
-  `babeld:17` - crea una soft VLAN 8021ad número 17 y ejecuta babel sobre ella
-  `batadv:%N1` - crea una soft VLAN 8021ad número %N1 y la agrega a la lista de interfaces batman-adv

Esto crea 3 interfaces:
- `wan@eth0` - cliente dhcp
- `wan_17@eth0` - VLAN babeld 17 8021ad
- `wan_29@eth0` - VLAN babeld 29 8021ad

#### Puertos LAN
Agregar cada puerto lan al bridge principal `br-lan`    
Configurar protocolos predeterminados sobre cada puerto:
-  `babeld:17` - crea una soft VLAN 8021ad número 17 y ejecuta babel sobre ella
-  `batadv:%N1` - crea una soft VLAN 8021ad número %N1 y la agrega a la lista de interfaces batman-adv

Configurar br-lan con opciones de red:
- `main_ipv4_address`
- `main_ipv6_address`

Crea 3 interfaces para cada puerto lan:
- `lan@eth1` - dispositivo sin gestión: los paquetes sin etiquetar irán a la interfaz `br-lan`
- `lan_17@eth1` - VLAN babeld 17 8021ad
- `lan_29@eth1` - VLAN babeld 29 8021ad

#### Radios `2ghz` y `5ghz`
Configurar modos predeterminados `ieee80211s`, `ap`, `apname`

Configurar protocolos predeterminados sobre cada puerto:
-  `babeld:17` - crea una soft VLAN 8021ad número 17 y ejecuta babel sobre ella
-  `batadv:%N1` - crea una soft VLAN 8021ad número %N1 y la agrega a la lista de interfaces batman-adv



#### Anygw
El bridge br-lan incluye puertos ethernet `lan` así como interfaces de radio configuradas como Punto de Acceso (modo `ap` o `apname`)

Sobre `br-lan` se configura una interfaz `mac-vlan` para la función `anygateway`.     
Las direcciones MAC/ipv4/ipv6 de esta interfaz son las mismas para todos los nodos que comparten el mismo `lime-autogen.wifi.ap_ssid`

#### Estado compartido
Un demonio Conflict-Free Replicated Data Type (CRDT).     
Este módulo habilita el intercambio de información entre nodos en una red descentralizada, garantizando consistencia y confiabilidad.

Los archivos no se persisten por defecto en la memoria flash, se pueden ver en `/tmp/shared-state/data/`
La información compartida por defecto depende de los `publishers` instalados de shared-state.

- shared-state-babeld_hosts - nodos conectados a `babeld`
- shared-state-bat_hosts - nodos conectados a `batadv`
- shared-state-nodes_and_links


## Flavor Mini

### Lista de paquetes
El flavor `mini` de LibreMesh contiene estos paquetes:

<ul>
<li v-for="p in libremesh.flavors.mini"><a :href="'/packages/'+p">{{ p }}</a></li>
</ul>

### Configuración
La configuración es la misma que la del flavor por defecto.

### Paquetes excluidos
Los paquetes eliminados son:

- batctl-default - Utilidad CLI para gestionar interfaces batman-adv con comandos de depuración; en su ausencia se instala batctl-tiny
- lime-app - la interfaz web
- lime-docs - documentación sin conexión
- lime-debug - conjunto de herramientas de depuración que incluye `tcpdump`, `mtr`, `iperf3`
- shared-state-async - shared-state más reciente en C++
- lime-hwd-ground-routing - para gestionar conexiones de enrutamiento terrestre
