---
outline: deep
---

# Opções de protocolos de rede

Os valores padrão conforme `lime-defaults`
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
O pacote `lime-proto-anygw` está incluído no [`sabor padrão`](/reference/flavors)
:::

### anygw_dhcp_start
- Tipo: `number`
- Padrão: `2`
- Pacotes necessários: `lime-proto-anygw`

```
config lime network
    option anygw_dhcp_start '2'
```

Primeiro IP na sub-rede a ser usado para DHCP para clientes.    
Por exemplo, se a sub-rede é 10.x.0.0/16 e você quer que os clientes obtenham um IPv4 de um pool DHCP começando em 10.x.100.2, o parâmetro de início deverá ser 100 * 256 + 2 = 25602.

### anygw_dhcp_limit
- Tipo: `number`
- Padrão: `0`
- Pacotes necessários: `lime-proto-anygw`

```
config lime network
    option anygw_dhcp_limit '0'
```

Número de IPs disponíveis para DHCP.    
Use zero para que o pool DHCP abranja desde anygw_dhcp_start até o final da sub-rede.    
Por exemplo, se a sub-rede é 10.x.0.0/16, o início do pool DHCP está em 10.x.100.2 e você quer que termine em 10.x.127.254, 
o parâmetro limite deverá ser (127 - 100) * 256 + (254 - 2) + 1 = 7165. 

### anygw_mac
- Tipo: `string`
- Padrão: `aa:aa:aa:%N1:%N2:aa`
- Pacotes necessários: `lime-proto-anygw`

```
config lime network
    option anygw_mac 'aa:aa:aa:%N1:%N2:aa'
```

Parametrizável com `%Nn`. Tenha em mente que a regra `nftables` usará uma máscara de `ff:ff:ff:00:00:00`.


## batadv
Consulte a [página de batman-adv](protocols/batman-adv) para a configuração padrão.

::: tip NOTA
O pacote `lime-proto-batadv` está incluído no [`sabor padrão`](/reference/flavors)
:::

### batadv_orig_interval
- Tipo: `number` `ms`
- Padrão: `2000`

```
config lime network
    option batadv_orig_interval '2000' 
```

O BATMAN-adv enviará um pacote de mensagem Originator (OGM) a cada 2000 ms (2 segundos). 
Este valor deve ser adequado para redes estáticas, nas quais os roteadores LibreMesh não estão se deslocando. 
Se você tem um nó LibreMesh em movimento (por exemplo, em sua mochila), considere diminuir este valor. 
Um valor menor significa que o BATMAN-adv levará menos tempo para perceber quais links são melhores, 
mas gerará mais tráfico de fundo em todas as interfaces.

### batadv_routing_algo
- Tipo: `BATMAN_IV|BATMAN_V`
- Padrão: `BATMAN_IV`

```
config lime network
    option batadv_routing_algo 'BATMAN_IV' 
```

O BATMAN_V usa throughput ao invés de perda de pacotes (como no BATMAN_IV) para avaliar a qualidade de um link.

## bmx7

### bmx7_mtu
- Tipo: `number`
- Padrão: `1500`

```
config lime network
    option bmx7_mtu '1500'
```
Define o MTU para interfaces de túnel bmx7.

### bmx7_publish_ownip
- Tipo: `boolean`
- Padrão: `false`

```
config lime network
    option bmx7_publish_ownip false
```
Anuncia também uma rota /32 sobre cada nó.


### bmx7_over_batman
- Tipo: `boolean`
- Padrão: `false`

```
config lime network
    option bmx7_over_batman false
```

### bmx7_pref_gw
- Tipo: `string|none`
- Padrão: `none`

```
config lime network
    option bmx7_pref_gw none
```

Força o bmx7 a usar um gateway específico para a Internet (o hostname deve ser usado como identificador).

### bmx7_wifi_rate_max
- Tipo: `number|auto`
- Padrão: `auto`

```
config lime network
    option bmx7_wifi_rate_max 'auto'
```

### bmx7_enable_pki
- Tipo: `boolean`
- Padrão: `false`

```
config lime network
    option bmx7_enable_pki false
```
Confia apenas nos nós em /etc/bmx7/trustedNodes quando ativado (o padrão é confiar em todos os nós).


## autoap - lime-ap-watchping

### autoap_enabled
Tipo: `boolean`    
Padrão: `0`    
Pacotes necessários: `lime-ap-watchping`

```
config lime network
    option autoap_enabled 0
```
Se habilitado, o SSID do AP é alterado para ERROR quando há problemas de rede.

### autoap_hosts
Tipo: `string`    
Padrão: `8.8.8.8 141.1.1.1`    
Pacotes necessários: `lime-ap-watchping`

```
config lime network
    option autoap_hosts "8.8.8.8 141.1.1.1"
```
Hosts usados para verificar se a rede está funcionando corretamente.

## odhcpd

```
config lime network
    option use_odhcpd false
```
Opção para habilitar o uso de odhcpd como servidor dhcp.    
Habilite-o para ter um servidor dhcp ao compilar o libremesh sem `lime-proto-anygw`, que por padrão usa `dnsmasq-dhcpv6`.
