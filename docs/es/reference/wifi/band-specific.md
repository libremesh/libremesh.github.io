# Opciones específicas de banda WiFi

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
Configura todos los radios a 2ghz agregando una sección `config lime-wifi-band '2ghz'` en `lime-node`
Los ajustes de esta sección se aplican a todos los radios de la banda `2ghz` (o `5ghz`). Y tienen prioridad sobre la sección `config lime wifi`.
```
config lime-wifi-band '2ghz'
    option channel '11'
    option htmode 'HT20'
    option distance '1000'                             
    option adhoc_mcast_rate '24000'
    option ieee80211s_mcast_rate '24000'
```

- `htmode 'HT20'` - htmode establece el ancho del canal. HT40 debería tener un mejor rendimiento en entornos no ruidosos.
    Consulta la wiki de OpenWrt: https://openwrt.org/docs/guide-user/network/wifi/basic#htmodewi-fi_channel_width
- `distance '1000'`  # 1 km de distancia máxima, clientes o pares más lejanos no podrán conectarse

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

- `channel 48` - Puede ser una lista o una opción única, en caso de ser una lista, se seleccionará un canal para cada radio según el índice del radio
Consulta los canales permitidos en https://en.wikipedia.org/wiki/List_of_WLAN_channels#regulatory_tables5.0ghz
- `distance '10000'` - Distancia entre este nodo/ap y el nodo/cliente más alejado en metros, afecta el rendimiento. 
Si no estás seguro del número correcto, es mejor usar una distancia demasiado grande aquí que una demasiado pequeña. 
Clientes o pares más alejados no podrán conectarse
- `htmode 'HT40'` - htmode establece el ancho del canal. VHT80 debería tener un mejor rendimiento en entornos no ruidosos. 
Consulta la lista de canales válidos en este comentario: https://github.com/libremesh/lime-packages/issues/647#issuecomment-1503968192 
y la wiki de OpenWrt [htmode: Ancho de canal Wi-Fi](https://openwrt.org/docs/guide-user/network/wifi/basic#htmodewi-fi_channel_width)


## Ejemplos

### Banda dual 
Para redes donde solo se usan routers de banda dual:
- el radio de 5GHz se puede reservar para las conexiones entre nodos.
- los radios de 2.4Ghz se pueden reservar para puntos de acceso.

```
config lime-wifi-band '5ghz'
    list modes 'ieee80211s'                                

config lime-wifi-band '2ghz'
    list modes 'ap'                                     
    list modes 'apname'                                 
```
