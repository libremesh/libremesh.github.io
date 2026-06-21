---
title: "Opciones WiFi"
---
# Opciones WiFi
La configuración de cada dispositivo de radio se calcula a partir de:
- las **opciones generales** en `config lime wifi`
- la correspondiente **sección específica de banda** para `2ghz` y `5ghz` también incluida en `lime-defaults`
- una **sección específica de interfaz** opcional relativa a ese dispositivo de radio en particular.

## Valores predeterminados
Los valores predeterminados según `lime-defaults`

```
config lime wifi
	list modes 'ap'
	list modes 'apname'
	list modes 'ieee80211s'
	option ap_ssid 'LibreMesh.org'
	option apname_ssid 'LibreMesh.org/%H'
	option adhoc_ssid 'LiMe'
	option adhoc_bssid 'ca:fe:00:c0:ff:ee'
	option apup_ssid 'LibreMesh.org'
	option ieee80211s_mesh_fwding '0'
	option ieee80211s_mesh_nolearn '1'
	option ieee80211s_mesh_id 'LiMe'
	option unstuck_interval '10'
	option unstuck_timeout '300'

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

## Opciones generales
Los ajustes en la sección `config lime wifi` se aplican a **todos los radios**.

Las configuraciones de LibreMesh en las secciones `wifi` `lime-wifi-band` y las específicas `radioN` contienen opciones para configurar:
- **opciones del dispositivo de radio** como `channel`, `distance`, `htmode` y `txpower`
- **opciones de la interfaz wifi** para Puntos de Acceso, como `ap_ssid`, `ap_key`, `ap_encryption`, u otros modos compatibles como 80211s o cliente. 
- **opciones de red**, la lista de protocolos y opciones se heredan de la sección de red predeterminada `config lime 'network'`

### ap_ssid
- Tipo: `string`
- Predeterminado: `LibreMesh.org`

```
config lime wifi
	option ap_ssid 'LibreMesh.org'
```

Establece aquí el nombre de tu red, **este valor es requerido incluso si no se usa el AP**, ya que se utiliza para calcular campos con %Nn.


### country
- Tipo: código de país
- Predeterminado: sin establecer, usa `00` (Mundial) por defecto

Establece esto al código de país de tu ubicación, por ejemplo en España, establecer `ES` te permite usar el canal 13

### modes
- `adhoc` - Consulta la configuración adhoc más abajo
- `ap` - Este modo configura un Punto de Acceso, con el mismo ssid en cada nodo para roaming.
- `apbb` - AP de backbone, para conexión de otros routers LibreMesh en lugar de usuarios
- `apname` - Este modo configura un Punto de Acceso, con un ssid específico para cada nodo.
- `apup` - Este modo configura el radio para operación APuP.
- `client` - la configuración del cliente debe hacerse en [Opciones específicas Wi-Fi](./interface-specific.html#modo-cliente-wifi)
- `ieee80211s` - Usado para enlaces mesh entre nodos.

#### opciones de modes
Consulta la siguiente página [Modos WiFi](./modes) para detalles sobre las opciones de `Access Points`, `Adhoc`, `APuP` y `802.11s`.

## Solución para radios sordos
::: warning Advertencia ath9k

Los routers con radios Atheros y el controlador ath9k tienen un fallo conocido que hace que se queden sordos, 
si usas una versión de OpenWrt anterior a la 24.10.6 asegúrate de incluir el paquete libremesh `wifi-unstuck-wa`
:::

### unstuck_interval
- Predeterminado: `10`
- Paquetes requeridos: `wifi-unstuck-wa`

```
config lime 'wifi'
    option unstuck_interval '10'
```

Intervalo en minutos que define la frecuencia con la que se ejecuta el script de solución alternativa proporcionado por el paquete `wifi-unstuck-wa`
que reescanea todas las frecuencias en los radios activos.


### unstuck_timeout
- Predeterminado: `10`
- Paquetes requeridos: `wifi-unstuck-wa`

```
config lime 'wifi'
    option unstuck_interval '10'
```

Tiempo de espera en segundos que define la duración de la solución alternativa mencionada anteriormente.
