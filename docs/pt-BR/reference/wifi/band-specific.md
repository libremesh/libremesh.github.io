---
title: "Opções específicas de banda Wi-Fi"
---
# Opções específicas de banda Wi-Fi

## Valores predeterminados
```
config lime-wifi-band '2ghz'
	option channel '11'
	option htmode 'HT20'
	option distance '1000'
	option adhoc_mcast_rate '24000'
	option ieee80211s_mcast_rate '24000'

config lime-wifi-band '5ghz'
	list channel '48'
	list channel '157'
	option htmode 'HT40'
	option distance '10000'
	option adhoc_mcast_rate '6000'
	option ieee80211s_mcast_rate '6000'
```

## 2ghz
Configure todos os rádios em 2ghz adicionando uma seção `config lime-wifi-band '2ghz'` em `lime-node`
Os ajustes nesta seção se aplicam a todos os rádios na banda `2ghz` (ou `5ghz`). E têm precedência sobre a seção `config lime wifi`.
```
config lime-wifi-band '2ghz'
    option channel '11'
    option htmode 'HT20'
    option distance '1000'                             
    option adhoc_mcast_rate '24000'
    option ieee80211s_mcast_rate '24000'
```

- `htmode 'HT20'` - htmode define a largura do canal. HT40 deve ter melhor desempenho em ambientes não ruidosos.
    Consulte a wiki do OpenWrt: https://openwrt.org/docs/guide-user/network/wifi/basic#htmodewi-fi_channel_width
- `distance '1000'`  # distância máxima de 1 km, clientes ou pares mais distantes não poderão se conectar

## 5ghz
```
config lime-wifi-band '5ghz'
    list channel '48'                                   
    list channel '157'
    option htmode 'HT40'
    option distance '10000'                             
    option adhoc_mcast_rate '6000'
    option ieee80211s_mcast_rate '6000'

```

- `channel 48` - Pode ser uma lista ou uma opção única, no caso de ser uma lista, um canal para cada rádio será selecionado de acordo com o índice do rádio
Verifique os canais permitidos em https://en.wikipedia.org/wiki/List_of_WLAN_channels#regulatory_tables5.0ghz
- `distance '10000'` - Distância entre este nó/ap e o nó/cliente mais distante em metros, afeta o desempenho. 
Se você não tiver certeza do número correto, é melhor usar uma distância muito grande aqui do que muito pequena. 
Clientes ou pares mais distantes não poderão se conectar
- `htmode 'HT40'` - htmode define a largura do canal. VHT80 deve ter melhor desempenho em ambientes não ruidosos. 
Confira a lista de canais válidos neste comentário: https://github.com/libremesh/lime-packages/issues/647#issuecomment-1503968192 
e consulte a wiki do OpenWrt [htmode: Largura do canal Wi-Fi](https://openwrt.org/docs/guide-user/network/wifi/basic#htmodewi-fi_channel_width)


## Exemplos
### Banda dupla 
Para redes onde apenas roteadores de banda dupla são usados:
- o rádio de 5GHz pode ser reservado para conexões entre nós.
- os rádios de 2.4Ghz podem ser reservados para pontos de acesso.

```
config lime-wifi-band '5ghz'
    list modes 'ieee80211s'                                

config lime-wifi-band '2ghz'
    list modes 'ap'                                     
    list modes 'apname'                                 
```