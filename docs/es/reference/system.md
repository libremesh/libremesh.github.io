---
outline: deep
---

# Opciones del sistema
Los valores predeterminados según `lime-defaults`
```
config lime system
	option hostname 'LiMe-%M4%M5%M6'
	option domain 'thisnode.info'
	option keep_on_upgrade 'libremesh dropbear minimum-essential /etc/sysupgrade.conf'
	option root_password_policy 'DO_NOTHING'
	option root_password_secret ''
	option deferrable_reboot_uptime_s '97200'
	option deferrable_reboot_ping_target '4.2.2.2'
	option firstbootwizard_configured false
	option firstbootwizard_dismissed false
```

## hostname
- Predeterminado: `LiMe-%M4%M5%M6`
- Parametrizable con `%Mn`

```
config lime system
    option hostname 'LiMe-%M4%M5%M6'
```

El nombre de host del nodo

## domain
- Tipo: `string`
- Predeterminado: `thisnode.info`

```
config lime system
    option domain 'thisnode.info'
```

Dominio DNS para la nube L2, puede ser algo como `mynube.mired.tld`

## keep_on_upgrade
- Tipo: `list`
- Predeterminado: `libremesh dropbear minimum-essential /etc/sysupgrade.conf`

```
config lime system
  option keep_on_upgrade 'libremesh dropbear minimum-essential /etc/sysupgrade.conf'
```

Archivos que definen la lista de archivos y directorios a respaldar durante la actualización.    
La ruta del archivo es relativa al `/lib/upgrade/keep.d` predeterminado de OpenWrt si no se define `/`.    
Esta opción es utilizada por el comando `lime-sysupgrade` y por el paquete opcional `safe-upgrade`.

Consulta la página [Actualización](/guide/upgrade) para obtener más detalles.

## root_password_policy
- Tipo: `DO_NOTHING | RANDOM | SET_SECRET`
- Predeterminado: `DO_NOTHING`

```
config lime system
    option root_password_policy 'DO_NOTHING'
```

Determina la configuración de lime para la contraseña root:
- `DO_NOTHING` - deja la contraseña root vacía (tendrás que establecerla manualmente o a través de FirstBootWizard).
- `RANDOM` - se establecerá una contraseña aleatoria segura si root no tiene contraseña, usa esto si tu firmware se construye con claves ssh internas. 
- `SET_SECRET` - la contraseña root se configurará según lo especificado en root_password_secret.

La opción predeterminada evita que libremesh sobrescriba la configuración manual, por ejemplo, a través de `luci`, `uci` o `lime-app`.

## root_password_secret
- Tipo: `string`
- Predeterminado: `''`

```
config lime system
    option root_password_secret ''
```

Se usa solo cuando `root_password_policy` está configurado como `SET_SECRET`.    
El hash de la contraseña se almacenará en /etc/shadow.
Usa una contraseña segura con al menos 10 números y letras, ¡cuanto más larga mejor!.

```
openssl passwd -5
```

Puedes generar el secreto con `openssl passwd -1` para ser compatible con la mayoría de los firmwares OpenWrt.    
Para mayor seguridad, usa `openssl passwd -6` para SHA512 (o -5 para SHA256), pero ten en cuenta que no todos los firmwares lo soportan.

## firstbootwizard_configured
- Tipo: `string`
- Predeterminado: `false`
- Paquetes requeridos: `first-boot-wizard`

```
config lime system
    option firstbootwizard_configured false
```
Cuando es true, el asistente de primer arranque no aparecerá por defecto.

## firstbootwizard_dismissed
- Tipo: `string`
- Predeterminado: `false`
- Paquetes requeridos: `first-boot-wizard`

```
config lime system
    option firstbootwizard_dismissed false
```

Cuando es true, el banner del asistente de primer arranque estará oculto.
