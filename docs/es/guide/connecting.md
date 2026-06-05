# Conectarse al router

## desde el navegador web
En el FQDN del anygw por defecto http://thisnode.info.    

Estas direcciones también están disponibles:
  - http://10.13.0.1 - anygw por defecto ipv4
  - http://10.13.x.x - dirección ipv4 por defecto del nodo en la LAN `br-lan`
  - http://meuno.info - otro FQDN del anygw
  - http://minodo.info - otro FQDN del anygw
  - http://\<hostname\> - `hostname` del dispositivo
  - http://\<hostname\>.thisnode.info - FQDN del dispositivo
  - http://\[fd0d:fe46:8ce8::1\] - anygw por defecto ipv6
  - http://\[fd0d:fe46:8ce8::x\:xx\] - dirección ipv6 por defecto del nodo en la LAN `br-lan`

![lime-app](/lime-app.png)

## por SSH

Consulta [SSH a OpenWrt (en)](https://openwrt.org/docs/guide-quick-start/sshadministration)

Se recomiendan los siguientes alias de bash:
- `+ssh-rsa` - (opcional) Necesario si el nodo ejecuta una versión de OpenWrt anterior a la rama 23.05
- `ussh` - un alias para:    
    - Ignorar los archivos de hosts conocidos, útil al conectarse a la dirección del Anygw `10.13.0.1` o al FQDN del anygw `thisnode.info`    
    - Desactivar `StrictHostKeyChecking`, útil para reconectar tras actualizar a una versión más reciente de OpenWrt sin "conservar la configuración".

```sh
cat << EOF >> ~/.bashrc
alias ssh="ssh -o HostKeyAlgorithms=+ssh-rsa -o PubkeyAcceptedKeyTypes=+ssh-rsa"
alias ussh="ssh -o UserKnownHostsFile=/dev/null -o GlobalKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
EOF
source ~/.bashrc
```

Conéctate al dispositivo
```sh
ussh root@thisnode.info
```

Una vez establecida la conexión, se imprimirán los banners por defecto en la consola:
```
BusyBox v1.37.0 (2026-03-05 17:27:01 UTC) built-in shell (ash)

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------
 OpenWrt 25.12.0, r32713-f919e7899d Dave's Guitar
 -----------------------------------------------------

 === WARNING! =====================================
 There is no root password defined on this device!
 Use the "passwd" command to set up a new password
 in order to prevent unauthorized SSH logins.
 --------------------------------------------------

  ___   __ __                _______             __
 |   |_|__|  |--.----.-----.|   |   |-----.-----|  |--.
 |     |  |  _  |   _|  -__||       |  -__|__ --|     |
 |_____|__|_____|__| |_____||__|_|__|_____|_____|__|__|

 ------------------------------------------------------
 LiMe master development (master rev. 7929208 20260304_1752)
 ------------------------------------------------------
 https://libremesh.org
 ------------------------------------------------------

 === System Notes =================================================

 = edit via http://thisnode.info/app/#/notes or /etc/banner.notes =


 OpenWrt recently switched to the "apk" package manager!

 OPKG Command           APK Equivalent      Description
 ------------------------------------------------------------------
 opkg install <pkg>     apk add <pkg>       Install a package
 opkg remove <pkg>      apk del <pkg>       Remove a package
 opkg upgrade           apk upgrade         Upgrade all packages
 opkg files <pkg>       apk info -L <pkg>   List package contents
 opkg list-installed    apk info            List installed packages
 opkg update            apk update          Update package lists
 opkg search <pkg>      apk search <pkg>    Search for packages
 ------------------------------------------------------------------

For more information visit:
https://openwrt.org/docs/guide-user/additional-software/opkg-to-apk-cheatsheet

root@openwrt:~# 
```
