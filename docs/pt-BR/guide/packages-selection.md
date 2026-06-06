---
outline: deep
---
<script setup>
import { data as openwrt } from '/openwrt.data.js'
import { data as libremesh } from '/libremesh.data.js'
</script>

# Selección de paquetes

## Personalización de la compilación

Se recomienda realizar una personalización de la compilación. La principal ventaja de preinstalar todos los paquetes necesarios es preservar el **espacio de firmware** y la **RAM utilizada** en el dispositivo.

::: tip NOTA
Es posible instalar nuevo software mediante el gestor de paquetes `opkg` o el más reciente `apk`.   
Se **desaconseja encarecidamente** actualizar paquetes. Lee la [`advertencia sobre actualización de paquetes`](https://openwrt.org/meta/infobox/upgrade_packages_warning) de OpenWrt.
:::

::: warning Advertencia ath9k
Los routers con radios Atheros y el controlador `ath9k` tienen un fallo conocido que hace que se queden sordos, 
si usas una versión de OpenWrt anterior a la 24.10.6 asegúrate de incluir el paquete libremesh `wifi-unstuck-wa` 
:::

::: warning Advertencia ath10k
Los routers con radios Atheros y el controlador predeterminado de OpenWrt `ath10k-ct` (ath10k fabricado por CandelaTech) son inestables/defectuosos con malla 80211s, solo funcionan con chipsets wave2. Reemplaza los paquetes relacionados con `ath10k-ct` por los paquetes `ath10k` correspondientes.
:::


## Ahorrando espacio y RAM

- https://openwrt.org/supported_devices/864_warning
- https://openwrt.org/docs/guide-user/additional-software/saving_space

### Sabor Mini

Para dispositivos `8/64` debería ser posible instalar una versión reducida del `sabor por defecto`.    
Consulta los detalles de los paquetes excluidos en [Sabor Mini](/reference/flavors)
Esta lista de paquetes también es seleccionable incluyendo el perfil de red `profile-libremesh-suggested-packages-tiny`.

<ul>
<li v-for="p in libremesh.flavors.mini"><a :href="'/pt-BR/packages/'+p">{{ p }}</a></li>
</ul>

### Excluyendo paquetes

Por defecto, LibreMesh usa `dnsmasq-dhcpv6` en lugar del `dnsmasq` predeterminado de OpenWrt y `odhcpd-ipv6only`.    
Asegúrate de incluir una eliminación para estos al construir LibreMesh mediante ImageBuilder o Buildroot.


Adicionalmente, estos paquetes podrían ser excluidos en la compilación del firmware:

::: code-group

``` [{{ openwrt.stable_version }}]
-dnsmasq -odhcpd-ipv6only -apk-mbedtls -ca-bundle -ppp -ppp-mod-pppoe
```

``` [{{ openwrt.oldstable_version }}]
-dnsmasq -odhcpd-ipv6only -opkg -ca-bundle -ppp -ppp-mod-pppoe
```

:::

La misma lista para usar al construir con Buildroot.
::: code-group


``` [{{ openwrt.stable_version }}]
cat << EOF >> .config
CONFIG_PACKAGE_dnsmasq=m
CONFIG_PACKAGE_odhcpd-ipv6only=m
CONFIG_PACKAGE_apk-mbedtls=m
CONFIG_PACKAGE_ca-bundle=m
CONFIG_PACKAGE_ppp=m
CONFIG_PACKAGE_ppp-mod-pppoe=m
EOF
make defconfig
```

``` [{{ openwrt.oldstable_version }}]
cat << EOF >> .config
CONFIG_PACKAGE_dnsmasq=m
CONFIG_PACKAGE_odhcpd-ipv6only=m
CONFIG_PACKAGE_opkg=m
CONFIG_PACKAGE_ca-bundle=m
CONFIG_PACKAGE_ppp=m
CONFIG_PACKAGE_ppp-mod-pppoe=m
EOF
make defconfig
```

:::

#### `apk-mbedtls`
- Descripción: gestor de paquetes apk    
- Tamaño instalado: `258 KiB` (mediatek-filogic-v25.12.0)

El router no podrá instalar paquetes después de la instalación

#### `opkg`  
- Descripción: gestor de paquetes opkg (openwrt-24.10 y anteriores) 

El router no podrá instalar paquetes después de la instalación.

#### `ca-bundle`
- Descripción: Certificados CA del sistema como un paquete    
- Tamaño instalado: `219 KiB` (mediatek-filogic-v25.12.0)
    
El router no podrá usar TLS, es decir, descargar datos de sitios que usen solo `https:` en lugar de `http:`

#### `ppp`
- Descripción: Este paquete contiene el demonio PPP (Protocolo Punto a Punto).
- Tamaño instalado: `355 KiB` (mediatek-filogic-v25.12.0)

Exclúyelo si no necesitas establecer conexiones ppp

#### `ppp-mod-pppoe`
- Descripción: Este paquete contiene un plugin PPPoE (PPP sobre Ethernet) para ppp.  
- Tamaño instalado: `65 KiB` (mediatek-filogic-v25.12.0)

Exclúyelo si no necesitas establecer conexiones pppoe

### Ejemplo de compilación

```
make image \
    PROFILE=ubnt_unifi \
    BIN_DIR=/images \
    FILES=files \
    PACKAGES="-dnsmasq -odhcpd-ipv6only \
      -apk-mbedtls -ca-bundle -ppp -ppp-mod-pppoe \
      profile-libremesh-suggested-packages-tiny"
```
