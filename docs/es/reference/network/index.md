---
outline: deep
---

# Opciones de rede
A configuração de cada dispositivo de rede é calculada a partir de:
- as **opções gerais** em `config lime network`, 
- uma **seção específica de interface** opcional relativa a esse dispositivo de rede específico.

## Valores padrão
Valores padrão conforme `/etc/config/lime-defaults`
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

## Opções gerais
```
config lime 'network'
	option primary_interface 'eth0'
	option main_ipv4_address '10.%N1.0.0/16'
	option main_ipv6_address 'fd%N1:%N2%N3:%N4%N5::/64'
```

### primary_interface
- Tipo: `string`
- Padrão: `eth0`

```
config lime network
    option primary_interface 'eth0'
```

O endereço mac deste dispositivo será usado em diferentes lugares.    
Uma lista parcial inclui:
- Opções parametrizadas com `%Mn`
- As interfaces soft do Batman-adv usam os últimos 3 bytes da interface principal bat0 que é igual ao mac de `primary_interface`

### main_ipv4_address
- Tipo: `<static>|<parametrizado>|<endereco-de-rede>`
- Padrão: `10.%N1.0.0/16`
- Parâmetro 1: sub-rede (obrigatório)
- Parâmetro 2: parametrização de IP auto-atribuído ao nó

```
config lime network
    option main_ipv4_address '10.%N1.0.0/16'
```

Aqui você tem 4 possibilidades: 
- `static` - `10.0.2.1/16` - define um IP estático e a sub-rede
- `parametrizado` - `10.%N1.%M5.%M6/16` - Parametrizável com %Mn e %Nn e define a sub-rede
- `endereco-de-rede` - `10.%N1.0.0/16` - Define um endereço de rede inteiro (não um IP específico) para obter o IP autocompletado nessa rede com bits do endereço MAC. isso funciona também com máscaras de rede diferentes de `/24` ou `/16`, como `10.0.128.0/17` (mas não endereços de rede válidos, por exemplo `192.0.128.0/16` ou `192.0.129.0/17` não serão parametrizados).
- `endereco-de-rede` - `10.0.128.0/16/17` - Usa o segundo parâmetro para a parametrização de IP do nó. Isso resulta em sub-rede `/16` mas o IP do roteador LibreMesh será auto-atribuído em uma faixa `/17` (de 10.0.128.1 a 10.0.255.254).

### main_ipv6_address
- Tipo: `string`
- Padrão: `fd%N1:%N2%N3:%N4%N5::/64`
- Parâmetro 1: sub-rede (obrigatório) padrão `/64`
- Parâmetro 2: parametrização de IP auto-atribuído ao nó

```
config lime network
    option main_ipv4_address '10.%N1.0.0/16'
```

Parametrizável da mesma forma que `main_ipv4_address`.    
Se usado, o autopreenchimento de IP preencherá no máximo os últimos 24 bits, então especificar uma faixa de autopreenchimento de IP maior que /104 não é útil.

## Servidores DNS

### list resolvers
- Tipo: `list`
- Padrão: `4.2.2.2 141.1.1.1 2001:470:20::2`

```
config lime network
    list resolvers 4.2.2.2                              # b.resolvers.Level3.net  
    list resolvers 141.1.1.1                            # cns1.cw.net 
    list resolvers 2001:470:20::2                       # ordns.he.net
```

Servidores DNS que o nó usará. A lista é ordenada de cima para baixo.   
Defina cada entrada vazia para usar o servidor DNS upstream (do provedor de internet)

```
config lime network
    list resolvers ''
```
