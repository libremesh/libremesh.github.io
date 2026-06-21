---
title: "Conectando ao roteador"
---
# Conectando ao roteador

## pelo navegador web
No FQDN do anygw padrão http://thisnode.info.    

Esses endereços também estão disponíveis:
  - http://10.13.0.1 - anygw padrão ipv4
  - http://10.13.x.x - endereço ipv4 padrão do nó na LAN `br-lan`
  - http://meuno.info - outro FQDN do anygw
  - http://minodo.info - outro FQDN do anygw
  - http://\<hostname\> - `hostname` do dispositivo
  - http://\<hostname\>.thisnode.info - FQDN do dispositivo
  - http://\[fd0d:fe46:8ce8::1\] - anygw padrão ipv6
  - http://\[fd0d:fe46:8ce8::x\:xx\] - endereço ipv6 padrão do nó na LAN `br-lan`

![lime-app](/lime-app.png)

## por SSH

Veja [SSH no OpenWrt (em)](https://openwrt.org/docs/guide-quick-start/sshadministration)

Os seguintes aliases de bash são recomendados:
- `+ssh-rsa` - (opcional) Necessário se o nó roda uma versão do OpenWrt anterior à branch 23.05
- `ussh` - um alias para:    
    - Ignorar arquivos de hosts conhecidos, útil ao se conectar ao endereço do Anygw `10.13.0.1` ou ao FQDN do anygw `thisnode.info`    
    - Desativar `StrictHostKeyChecking`, útil para reconectar após atualizar para uma versão mais recente do OpenWrt sem "manter configurações".

```sh
cat << EOF >> ~/.bashrc
alias ssh="ssh -o HostKeyAlgorithms=+ssh-rsa -o PubkeyAcceptedKeyTypes=+ssh-rsa"
alias ussh="ssh -o UserKnownHostsFile=/dev/null -o GlobalKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
EOF
source ~/.bashrc
```

Conecte-se ao dispositivo
```sh
ussh root@thisnode.info
```

Uma vez estabelecida a conexão, os banners padrão serão impressos no console:
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
