---
title: "Actualización"
---
# Actualización

::: tip PRECAUCIÓN
De vez en cuando, algunos dispositivos OpenWrt pueden encontrar problemas al actualizar y resultar "brickeados" o "brickeados parcialmente".
Asegúrate de haber **leído las notas de liberación de OpenWrt** para la `versión`/`rama` que estás instalando.   

En **entornos de producción con múltiples nodos LibreMesh** desplegados, es recomendable mantener al menos un dispositivo, por cada modelo que estés usando, para probar que las actualizaciones funcionan bien. O eventualmente recuperarlo usando un `Adaptador USB Serie`.
:::

Consulta la wiki de OpenWrt para obtener detalles sobre el proceso de actualización:
- [Sysupgrade](https://openwrt.org/docs/techref/sysupgrade)
- [Actualización del firmware OpenWrt usando LuCI y CLI](https://openwrt.org/docs/guide-user/installation/generic.sysupgrade)
- [Preservar la configuración de OpenWrt durante la actualización del firmware](https://openwrt.org/docs/guide-quick-start/admingui_sysupgrade_keepsettings)


## Sysupgrade
El comando predeterminado de OpenWrt `sysupgrade` preserva:
- archivos definidos en `/lib/upgrade/keep.d`
- la lista de `conffiles` (archivos de configuración definidos por ciertos paquetes) que han sido modificados:
  - Ve la lista completa para `apk` con `cat /lib/apk/packages/*.conffiles`
  - Ve la lista completa para `opkg` con `cat /usr/lib/opkg/info/*.conffiles`

Los archivos iniciales se conservan en `/rom/` y los archivos modificados se crean en `/overlay/upper/`.

```
apk add diffutils
diff /overlay/upper/etc/config/babeld /rom/etc/config/babeld
```


## Ejemplos

### Actualizar a una nueva versión mayor de OpenWrt
Ejemplo que mantiene solo `lime-node` y `dropbear`.

Sobrescribe la lista de archivos a conservar manteniendo solo lo esencial.
Recomendado si toda la configuración está en `lime-node`.
```
mkdir /tmp/keep.d; mv /lib/upgrade/keep.d/* /tmp/keep.d/
mv /usr/lib/opkg/status /tmp/opkg_status
for i in /etc/config/dropbear /etc/dropbear /etc/config/lime-node; do echo $i >> /etc/sysupgrade.conf; done
sysupgrade -l
```

Descarga el archivo sysupgrade
```
wget -O /tmp/firmware.bin <archivo_sysupgrade>
```
la url del archivo syupgrade es por ejemplo https://sysupgrade-01.antennine.org/store/45347ae7f75029abc37f0a4e41ebf9af72ef7b9ce8c93ff27a7d7ec5e9a54b2e/openwrt-25.12.0-82ccd0311e22-mediatek-filogic-cudy_wr3000s-v1-squashfs-sysupgrade.bin

Actualiza el router
```
sysupgrade -v /tmp/firmware.bin
```

## Herramientas
Herramientas para actualizar la versión base de OpenWrt y los paquetes LibreMesh:

### eupgrade
proporciona actualizaciones semi-automatizadas verificando si un nuevo firmware está disponible desde un servidor https.

### owut
proporciona actualizaciones usando una instancia de [`ASU`](https://github.com/openwrt/asu) (imagebuilder en línea). Pruébalo instalando el paquete `profile-antennine.org-an-lime-owut`

### safe-upgrade
Wrapper alrededor de `sysupgrade`. Requiere almacenamiento flash grande, al menos el doble del tamaño del firmware, para poder revertir en caso de que algo no funcione.
