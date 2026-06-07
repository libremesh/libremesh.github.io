---
title: "Primeros pasos"
---
# Primeros pasos

## Instalación

### Requisitos
Consulta la [Tabla de hardware (Table of Hardware)](https://toh.openwrt.org) para ver si tu dispositivo es compatible con OpenWrt.

::: tip NOTA
Se recomienda que el router tenga **al menos**:
  - 16 MB de memoria flash y 128 MB de RAM.
  - 1 radio funcionando a 2.4 GHz y 1 a 5 GHz

Es posible instalar LibreMesh en routers con 8 MB de flash y 64 MB de RAM    
Lee el [`8/64 warning`](https://openwrt.org/supported_devices/864_warning) de OpenWrt y consulta la página [selección de paquetes (en)](/guide/packages-selection) para personalizar la compilación.  
:::

::: warning ATENCIÓN
Asegúrate de haber leído la página de la wiki de OpenWrt correspondiente a tu dispositivo.    
Lee las instrucciones de instalación y comprueba que dispones del hardware necesario —si hace falta— para instalar el firmware, como un [adaptador USB-UART/Serie](https://openwrt.org/docs/guide-user/installation/generic.flashing.serial) y/o un
[adaptador USB-JTAG](https://openwrt.org/docs/techref/hardware/port.jtag)
:::

### Descargar el firmware
---

**Firmware Selector**   
El Firmware Selector solicita una compilación de firmware a través de una instancia de [`ASU`](https://github.com/openwrt/asu) (ImageBuilder en línea).

https://firmware-selector.libremesh.org

---

**Versiones precompiladas**    
Archivo de lanzamientos antiguos con firmwares precompilados mediante Buildroot.

https://firmware-libremesh.antennine.org

---

**Compila LibreMesh en tu equipo**    
Consulta la página [`Compilar LibreMesh` (en)](/build/) para ver las instrucciones de cómo compilar LibreMesh en tu equipo.

---

### Instalar el firmware
Instala el firmware en tu dispositivo siguiendo el método de instalación indicado en la [wiki de OpenWrt](https://openwrt.org)
o, si no aparece, busca las instrucciones en el mensaje de **`git-commit`** dejado por quien añadió el soporte para ese modelo de dispositivo. Consulta la [Tabla de hardware](https://toh.openwrt.org).

::: tip NOTA
Si tu dispositivo trae el firmware de fábrica, se recomienda **instalar OpenWrt primero**:
:::

1. Descarga el último firmware `stable` para tu dispositivo desde el [`OpenWrt Firmware Selector`](https://firmware-selector.openwrt.org).    
   Usa la imagen `factory` para la primera instalación. Consulta [Factory Install: First Time Installation (en)](https://openwrt.org/docs/guide-quick-start/factory_installation):
2. Comprueba que el dispositivo con OpenWrt arranca y funciona correctamente.    
   Ten en cuenta que OpenWrt por defecto no enciende la Wi-Fi.    
   Actívala desde `LuCI` en el menú `Network` / `Wireless`.
3. Actualiza a LibreMesh usando una imagen `squashfs-sysupgrade.bin`:
    - Sube el firmware a través de la interfaz web `LuCI` desde el menú `System` / `Backup / Flash Firmware`.
    - O instálalo por SSH usando el comando `sysupgrade -n firmware.bin`.


## Conectarse al router
Se puede acceder al router por web en http://thisnode.info.    
Consulta la página [Conectarse al router (en)](/guide/connecting) para ver las opciones detalladas y la resolución de problemas.


## Configuración
LibreMesh trae un [sabor por defecto (en)](/reference/flavors) que funciona sin más, sin necesidad de configuración manual.

Consulta la página de [configuración (en)](/reference/configuration) para ver las opciones detalladas.


## Mantenimiento
Instala versiones estables más recientes de OpenWrt para mantener el dispositivo actualizado:
- Suscríbete al boletín [`OpenWrt Announce`](https://lists.openwrt.org/mailman/listinfo/openwrt-announce).
- O sigue al [`OpenWrt Announcement-Bot`](https://social.tchncs.de/@openwrt) en Mastodon.

Consulta la página [Actualizar (en)](/guide/upgrade) para ver las operaciones recomendadas con LibreMesh.
