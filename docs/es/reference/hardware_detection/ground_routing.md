---
title: "Enrutamiento terrestre"
---
# Enrutamiento terrestre

Una sección para cada enlace de enrutamiento terrestre.

Con enrutamiento terrestre nos referimos a configuraciones que tienen LibreMesh en un router que está conectado mediante cable(s), eventualmente a través de un switch, 
a algunos routers inalámbricos que ejecutan el firmware original en modo WDS (puente transparente) Ap/Sta.

Probablemente quieras configurar tantas secciones de enrutamiento terrestre con diferentes números de VLAN o diferentes puertos de switch como dispositivos conectados en modo WDS.
Para una descripción detallada consulta https://github.com/libremesh/lime-packages/issues/443

```
config hwd_gr link1
    option net_dev 'eth0'                               
    option vlan '5'
    option switch_dev 'switch0'
    option switch_cpu_port '0'
    list switch_ports '4t'                              

```

- `option net_dev 'eth0'` - Dispositivo ethernet plano sobre el cual se construirá la VLAN 802.1q. En caso de duda, consulta https://openwrt.org/toh/start
- `option vlan '5'` - ID de VLAN para usar para este enlace de enrutamiento terrestre, usa un número pequeño porque los switches económicos no soportan IDs grandes. esto también se usará como VID 802.1q en puertos etiquetados
- `option switch_dev 'switch0'` - Estas opciones relativas al switch deben establecerse solo si tu dispositivo ethernet está conectado a un chip de switch. Si el switch existe puedes leer su nombre (como switch0) en el archivo /etc/config/network
- `option switch_cpu_port '0'` - Consulta el mapa de puertos del switch de tu dispositivo en https://openwrt.org/toh/start para conocer el índice del puerto CPU
- `list switch_ports '4t'` - Lista de puertos del switch en los que deseas que se transmita la VLAN, usa el sufijo 't' para especificar que el puerto está etiquetado, consulta https://openwrt.org/toh/start para la correspondencia con los puertos físicos
