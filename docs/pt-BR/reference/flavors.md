---
title: "Sabores"
---
<script setup>
import { data as libremesh } from '/libremesh.data.js'
</script>

# Flavors

## Flavor padrão

### Lista de pacotes
O flavor `default` do LibreMesh contém estes pacotes:
<ul>
<li v-for="p in libremesh.flavors.default">
  <a v-if="!['batctl-default'].includes(p)" :href="'/packages/'+p">{{ p }}</a>
  <span v-else>{{ p }}</span>
</li>
</ul>

### Configuração

#### Porta WAN
Configurar como WAN
Configurar protocolos padrão sobre ele:
-  `babeld:17` - cria uma VLAN soft 8021ad número 17 e executa babel sobre ela
-  `batadv:%N1` - cria uma VLAN soft 8021ad número %N1 e a adiciona à lista de interfaces batman-adv

Isso cria 3 interfaces:
- `wan@eth0` - cliente dhcp
- `wan_17@eth0` - VLAN babeld 17 8021ad
- `wan_29@eth0` - VLAN babeld 29 8021ad

#### Portas LAN
Adicionar cada porta lan à bridge principal `br-lan`    
Configurar protocolos padrão sobre cada porta:
-  `babeld:17` - cria uma VLAN soft 8021ad número 17 e executa babel sobre ela
-  `batadv:%N1` - cria uma VLAN soft 8021ad número %N1 e a adiciona à lista de interfaces batman-adv

Configurar br-lan com opções de rede:
- `main_ipv4_address`
- `main_ipv6_address`

Cria 3 interfaces para cada porta lan:
- `lan@eth1` - dispositivo não gerenciado: pacotes sem tag irão para a interface `br-lan`
- `lan_17@eth1` - VLAN babeld 17 8021ad
- `lan_29@eth1` - VLAN babeld 29 8021ad

#### Rádios `2ghz` e `5ghz`
Configurar modos padrão `ieee80211s`, `ap`, `apname`

Configurar protocolos padrão sobre cada porta:
-  `babeld:17` - cria uma VLAN soft 8021ad número 17 e executa babel sobre ela
-  `batadv:%N1` - cria uma VLAN soft 8021ad número %N1 e a adiciona à lista de interfaces batman-adv



#### Anygw
A bridge br-lan inclui portas ethernet `lan` bem como interfaces de rádio configuradas como Ponto de Acesso (modo `ap` ou `apname`)

Sobre `br-lan` é configurada uma interface `mac-vlan` para o recurso `anygateway`.     
Os endereços MAC/ipv4/ipv6 desta interface são os mesmos para todos os nós que compartilham o mesmo `lime-autogen.wifi.ap_ssid`

#### Estado compartilhado
Um daemon Conflict-Free Replicated Data Type (CRDT).     
Este módulo habilita a troca de informações entre nós em uma rede descentralizada, garantindo consistência e confiabilidade.

Os arquivos não são persistidos por padrão na memória flash, podem ser vistos em `/tmp/shared-state/data/`
A informação compartilhada por padrão depende dos `publishers` instalados do shared-state.

- shared-state-babeld_hosts - nós conectados a `babeld`
- shared-state-bat_hosts - nós conectados a `batadv`
- shared-state-nodes_and_links


## Flavor Mini

### Lista de pacotes
O flavor `mini` do LibreMesh contém estes pacotes:

<ul>
<li v-for="p in libremesh.flavors.mini"><a :href="'/packages/'+p">{{ p }}</a></li>
</ul>

### Configuração
A configuração é a mesma do flavor padrão.

### Pacotes excluídos
Os pacotes removidos são:

- batctl-default - Ferramenta CLI para gerenciar interfaces batman-adv com comandos de depuração; na ausência, o batctl-tiny é instalado
- lime-app - a interface web
- lime-docs - documentação offline
- lime-debug - conjunto de ferramentas de depuração incluindo `tcpdump`, `mtr`, `iperf3`
- shared-state-async - shared-state mais recente em C++
- lime-hwd-ground-routing - para gerenciar conexões de roteamento terrestre
