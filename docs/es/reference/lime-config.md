---
outline: deep
---

# lime-config
El comando `lime-config` configura LibreMesh sobre OpenWrt.

## lime-files
Estos archivos se combinan desde el nivel bajo `lime-defaults` hasta el nivel alto `lime-node` para producir la configuración completa en `lime-autogen`.

## Módulos
Los módulos se configuran en este orden `hardware_detection`, `wireless`, `network`, `firewall`, `system`, `generic_config`.

### hardware_detection
Carga todos los paquetes que comienzan con `lime-hwd-*`    
`lime-hwd-openwrt-wan` configura la puerta WAN de OpenWrt como WAN. Si está deshabilitado, o el paquete no está instalado, la puerta WAN se configura como LAN.

### wireless
Escanea el dispositivo OpenWrt para encontrar radios existentes.   
Produce la configuración UCI para cada radio, cargando configuraciones de `lime-autogen` en el orden: 
- `config lime 'wifi'` (opciones generales wifi)
- `config lime '5ghz'` (opciones específicas de banda)
- `config lime '2ghz'` (opciones específicas de banda)
- `config radioN` (opciones específicas de radio)

### network

#### escaneo
Escanea el dispositivo OpenWrt para encontrar dispositivos ethernet existentes.    

#### protocolos generales
Configura todos los `protocolos generales` desde `lime-autogen.network.protocols`

#### protocolos específicos de interfaz
Para cada dispositivo ethernet, si está presente una sección `config net` específica, la usa; de lo contrario, toma la lista de protocolos de los `protocolos generales`.    
Configura todos los protocolos en el dispositivo ethernet.

El archivo `lime-defaults` proporciona la configuración predeterminada para una amplia lista de protocolos.     
Solo se configuran los protocolos para los cuales el paquete relativo `lime-proto-<proto-name>` está instalado. 
En la configuración predeterminada son 
- `ieee80211s` incluido en el paquete `lime-system`
- `lan` incluido en el paquete `lime-system`
- `anygw` - proporcionado por `lime-proto-anygw` 
- `babeld` - proporcionado por `lime-proto-babeld` 
- `batadv` - proporcionado por `lime-proto-batadv` 

### firewall
Proporciona una configuración predeterminada para: configuración general, zona LAN, zona WAN.   
Consulta las [zonas de firewall de OpenWrt](https://openwrt.org/docs/guide-user/firewall/firewall_configuration#zones).

#### predeterminado
`configuración de firewall predeterminada:    
`input: ACCEPT`   
`output: ACCEPT`   
`forward: ACCEPT` 

#### Zona LAN
Proporciona la configuración de firewall predeterminada para la `Zona LAN`, y actualiza la lista de interfaces lan:    

Ejemplo de configuración autogenerada en un router de banda dual con 4 puertos lan/1 wan ethernet.
```
config zone
	option name 'lan'
	list network 'lan'
	list network 'lm_net_br_lan_anygw_if'
	list network 'lm_net_wlan0_mesh_batadv_if'
	list network 'lm_net_wlan0_mesh_babeld_if'
	list network 'lm_net_wlan1_mesh_batadv_if'
	list network 'lm_net_wlan1_mesh_babeld_if'
	list network 'lm_net_lan1_babeld_if'
	list network 'lm_net_lan1_batadv_if'
	list network 'lm_net_lan2_batadv_if'
	list network 'lm_net_lan2_babeld_if'
	list network 'lm_net_wan_batadv_if'
	list network 'lm_net_wan_babeld_if'
	list network 'lm_net_lan3_batadv_if'
	list network 'lm_net_lan3_babeld_if'
	list network 'lm_net_lan4_batadv_if'
	list network 'lm_net_lan4_babeld_if'
	option input 'ACCEPT'
	option output 'ACCEPT'
	option forward 'ACCEPT'
	option mtu_fix '1'
```
  
`mtu_fix: 1` - Habilita el ajuste del tamaño máximo de segmento (MSS) también para LAN. Habilitado por defecto solo para WAN.   
`network: <lista-de-interfaces-lan>` - Lista de interfaces dentro del bridge `br-lan`
  Las interfaces LAN se determinan anteriormente durante la configuración del protocolo de red `lan`


#### Zona WAN
Mantiene la configuración predeterminada de OpenWrt.

```
config zone
	option name 'wan'
	list network 'wan'
	list network 'wan6'
	option input 'REJECT'
	option output 'ACCEPT'
	option forward 'REJECT'
	option masq '1'
	option mtu_fix '1'
```

### system
Configura `hostname` y `root_password`

### generic_config
Lee y ejecuta las secciones `generic_uci_config`, `copy_asset` y `run_asset`. 
Aplica configuración UCI personalizada o copia/ejecuta scripts de shell.
Consulta la página [Generic Config](generic_config) para conocer las opciones detalladas.


## Confirmar cambios
Los cambios son confirmados por el comando `lime-config` y escritos en archivos `/etc/config/`.  
::: tip  
Asegúrate de no perder la conexión a tu dispositivo después de la configuración.    
Para aplicar los cambios de la forma más segura, realiza un `reboot` del dispositivo.    
:::

### lime-apply
En la mayoría de los casos, se puede omitir el reinicio ejecutando el comando `lime-apply`, que llama al `reload_config` de OpenWrt.   
Dependiendo de las configuraciones cambiadas, puede ser necesario un reinicio completo de algunos servicios, como `wireless`, `network` y `firewall`.    
```
lime-config; lime-apply; wifi; \
/etc/init.d/network restart; \
/etc/init.d/firewall restart
```
