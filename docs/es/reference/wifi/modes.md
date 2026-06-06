# Modos WiFi

## Puntos de acceso

### SSID

#### ap_ssid
- Tipo: `string`
- Predeterminado: `LibreMesh.org`

```
config lime wifi
	option ap_ssid 'LibreMesh.org'
```

Establece aquí el nombre de tu red, **este valor es requerido incluso si el AP no se usa**, ya que se utiliza para calcular campos con %Nn.

#### apname_ssid
- Tipo: `string`
- Predeterminado: `LibreMesh.org/%H`

```
config lime wifi
	option ap_ssid 'LibreMesh.org/%H'
```
SSID específico para cada AP. Un usuario puede conectarse al AP con nombre para evitar el roaming.

#### apbb_ssid
- Tipo: `string`
- Predeterminado: sin establecer

```
config lime wifi
	option apbb_ssid 'backbone/%H'
```

### clave y cifrado

## Punto de acceso Ad-Hoc

```
config lime 'wifi'
    list modes 'adhoc'
    option adhoc_ssid 'LiMe'
    option adhoc_bssid 'ca:fe:00:c0:ff:ee'
```

- `adhoc_ssid 'LiMe'` - SSID de los APs (nodos) al hacer malla en modo ad-hoc, es decir, los nodos forman un IBSS. No se usa al hacer malla en 802.11s (el predeterminado)


## Punto de acceso APuP
Consulta el artículo en el blog de FreiFunk sobre [Una nueva forma de hacer malla – APuP](https://blog.freifunk.net/2024/08/24/a-new-way-to-mesh-apup/)

```
config lime 'wifi'
    list modes 'apup'
    option apup_ssid 'LibreMesh.org'
```

- `apup_ssid 'LibreMesh.org'` - Establece aquí el nombre de tu red basada en APuP 

## 802.11s
```
config lime 'wifi'
    list modes 'ieee80211s'
    option ieee80211s_mesh_fwding '0'
    option ieee80211s_mesh_nolearn '1'
    option ieee80211s_mesh_id 'LiMe'
#   option ieee80211s_key 'SomePsk2AESKey'
#   option ieee80211s_encryption 'psk2/aes'
```
### clave y cifrado
Si planeas usar malla cifrada, debes asegurarte de tener el paquete `wpad-mesh-*`, no `wpad-basic-*`, donde `*` es `mbedtls`, `openssl` o `wolfssl`. OpenWrt 23 usa `mbedtls` de forma predeterminada. Por ejemplo, en ImageBuilder agrega

```
-wpad-basic-mbedtls wpad-mesh-mbedtls
```

### mesh_params
Parámetros de malla compatibles
- `ieee80211s_mesh_id 'LiMe'` - Identificador de la nube mesh (similar al SSID en concepto). Usado por los nodos para unirse y participar en la red mesh.
- `ieee80211s_mesh_fwding '0'` - Ajustes necesarios solo para 802.11s
- `ieee80211s_mesh_nolearn '1'` - Deshabilita las capacidades de enrutamiento mesh multihop de 802.11s
- `ieee80211s_mcast_rate` - se ajusta en **opciones específicas de banda** con `24000` para `2ghz` y `6000` para `5ghz`
