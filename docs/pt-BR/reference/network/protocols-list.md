---
outline: deep
---

# Lista de protocolos de rede

Os valores padrão conforme `lime-defaults`
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

## Protocolos de rede
Lista de protocolos configurados pelo LibreMesh, apenas `lan` e `ieee80211s` estão incluídos no pacote `lime-system`
Os outros requerem o pacote relativo `lime-proto-<proto>`. 

::: tip NOTA
Se você definir alguns protocolos em `/etc/config/lime-node`, ou `/etc/config/lime-community` você sobrescreve a *lista completa* de protocolos definida em `/etc/config/lime-defaults`
:::

Verifique a lista aplicada em `lime-autogen`
```sh
uci get lime-autogen.network.protocols
```

### anygw
- Padrão: `habilitado`
- Pacotes necessários: `lime-proto-anygw`
```
    list protocols anygw
```

### batadv
- Padrão: `habilitado`
- Pacotes necessários: `lime-proto-batadv`
- Parâmetro 1: `vlan_number` padrão `%N1` (de 29 a 256)
- Parâmetro 2: `vlan_type` padrão `8021ad` 
- Tipo do parâmetro 2: `8021ad|8021q`

```
    list protocols batadv:%N1
```
Se a vlan for `0`, as tags são desativadas e o roteamento é feito na interface sem tag.
```
    list protocols batadv:0
```

::: tip 
Veja a página sobre [batman-adv](protocols/batman-adv) para a configuração padrão.
:::
### babeld
- Padrão: `habilitado`
- Pacotes necessários: `lime-proto-babeld`
- Parâmetro 1: `vlan` padrão `17`

```
    list protocols babeld:17
```
::: tip
Veja a página sobre [babeld](protocols/babeld) para a configuração padrão.
:::

### bmx7
- Padrão: `habilitado`
- Pacotes necessários: `lime-proto-bmx7`
- Parâmetro 1: `vlan` padrão `18`

```
    list protocols bmx7:18
```

### ieee80211s
- Padrão: `habilitado`
```
    list protocols ieee80211s
```

### lan
- Padrão: `habilitado`
```
    list protocols lan
```

### olsr
- Padrão: `habilitado`
- Pacotes necessários: `lime-proto-olsr`
- Parâmetro 1: `vlan`

```
    list protocols olsr:14
```
Não use um ID de VLAN entre 29 e 284, pois essa faixa é reservada para batadv:%N1 

### olsr2
- Padrão: `habilitado`
- Pacotes necessários: `lime-proto-olsr2`
```
    list protocols olsr2:16
```
### olsr6
- Padrão: `habilitado`
- Pacotes necessários: `lime-proto-olsr6`
```
    list protocols olsr6:15
```

## Outros protocolos de rede

### bgp
- Pacotes necessários: `lime-proto-bgp`

```
config bgp_peer peer1
    option remoteIP '192.0.2.6'
    option remoteAS '65550'

config bgp_peer peer2
    option remoteIP '2001:db8::c001'
    option remoteAS '65549'
```

Uma seção para cada par BGP

## Protocolos específicos de interface
Os seguintes protocolos devem ser incluídos apenas em uma seção específica de interface, ou seja, `config net lan1`. Consulte a próxima página para detalhes.

::: tip NOTA
Os seguintes protocolos devem ser incluídos em uma seção específica de interface `config net <nome_da_secao>`
:::

### manual

Desativa o lime-config para `lan1`
```
config net port1
    linux_name 'lan1'
    list protocols 'manual'
```
::: warning NOTA
Se você usar `manual`, não deve especificar outros protocolos na mesma porta, ou sua configuração será quebrada!
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

- `static_gateway_ipv4|static_gateway_ipv6` - Pule esta linha se nenhuma rota padrão deve ser adicionada nesta interface.

### wan
- Pacotes necessários: `lime-proto-wan`

```
config net port1_wan
  option linux_name 'lan1'
  list protocols 'wan'
```

O [sabor padrão](/reference/flavors) inclui o pacote `lime-proto-hwd-openwrt-wan` que instala `lime-proto-wan`
e configura a porta WAN padrão do OpenWrt como WAN.

