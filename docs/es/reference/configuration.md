---
outline: deep
---

# Configuración

## lime-files

La configuración de LibreMesh se realiza principalmente mediante un conjunto de archivos `/etc/config/lime-<level>`.
Estos archivos se pueden gestionar a través de la [UCI](https://openwrt.org/docs/guide-user/base-system/uci) de OpenWrt 
o editarse manualmente usando `vim`.   
Para modificarlos a través de la [interfaz web LuCI](https://openwrt.org/docs/guide-user/luci/luci.essentials) instala `luci-app-filemanager`.

Las opciones contenidas en estos archivos se combinan y sobrescriben desde la prioridad más baja a la más alta:

``` sh-vue
/etc/config/
├─ lime-defaults    # NO EDITAR, configuración predeterminada
├─ lime-community   # configuración de la comunidad
├─ lime-<MAC>       # configuración del nodo, específica del dispositivo
├─ lime-node        # configuración del nodo
└─ lime-autogen     # NO EDITAR, configuración autogenerada
```
### Secciones
La configuración se divide en tres secciones principales: 
- `config lime system` - Opciones del sistema: nombre de host, dominio, root_password   
- `config lime network` - Opciones de red: ipv4/ipv6, resolutores DNS, lista de protocolos, opciones de protocolos
- `config lime wifi` - Opciones inalámbricas: lista de modos, opciones de AP/Ad-Hoc/ApUP/80211s 

Por defecto, seguido de configuraciones específicas de la banda de radio:
- `config lime-wifi-band 2ghz`
- `config lime-wifi-band 5ghz`

Opcionalmente, seguido de secciones específicas de interfaz y opciones específicas de protocolos
- `config net port1`
- `config wifi radio0`

::: tip Sección específica de interfaz
Las secciones específicas de interfaz deben incluirse en `lime-node` o `lime-<MAC>`.
:::

Opcionalmente, seguido de otros protocolos específicos, scripts y configuraciones uci, o hardware_modules
- `config bgp_peer peer1` 
- `config generic_uci_config uhttpd_https`
- `config hwd_watchcat periodic_reboot`

### Opciones parametrizables
Dentro de `lime-files`, las opciones marcadas con `Parametrizable con %Mn, %Nn, %H`, pueden incluir las plantillas:
- `%Mn`: reemplazado por la n-ésima byte de la MAC de la **`primary_interface`**
- `%Nn`: reemplazado por la n-ésima (n = 1..5) byte del identificador de red, calculado a partir del **hash de `ap_ssid`**.
  Todos los nodos que forman una nube mesh (comparten el mismo `ap_ssid`) producirán el mismo valor
- `%H`: reemplazado por el `hostname`


## lime-config
El comando `lime-config` configura LibreMesh sobre OpenWrt.   
Consulta la página [lime-config](lime-config) para obtener los detalles.
