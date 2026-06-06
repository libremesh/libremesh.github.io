# Batman-adv

![batmanadv](/batmanadv_logo.svg){width=250 height=200}

## Referencia
- [B.A.T.M.A.N. en Wikipedia](https://en.wikipedia.org/wiki/B.A.T.M.A.N.)
- Página de la wiki de OpenWrt para [B.A.T.M.A.N. / batman-adv](https://openwrt.org/docs/guide-user/network/wifi/mesh/batman)
- Página de la wiki de Open-Mesh para [B.A.T.M.A.N. advanced](https://www.open-mesh.org/projects/batman-adv/wiki/Wiki)

## Opciones predeterminadas:
- `routing_algo`: `BATMAN_IV`
- `bridge_loop_avoidance`: `1`
- `multicast_mode`: `0`
- `batadv_orig_interval`: `2000`
- `distributed_arp_table`: `0`
- `gw_mode`: `client` - establece gw_mode=client en todas partes. Dado que no hay gw_mode=server, esto hace que bat0 nunca reenvíe solicitudes, por lo que un servidor DHCP rogue no afecta a toda la red (las solicitudes DHCP siempre se responden localmente)
- Soporta `alfred` si está instalado, reemplazado por `shared-state`

- Establece una dirección mac única para cada interfaz batman    
    Evita la inundación de dmesg causada por BLA con mensajes como "br-lan:
    paquete recibido en bat0 con la propia dirección como origen".
    Ajusta la dirección MAC para cada una de las interfaces utilizadas por Batman-adv
    00 + Unicast administrado localmente .. 2 bytes del nombre de la interfaz
.. 3 bytes de la interfaz principal

- establece el `mtu` para cada interfaz vlan a `1532`

## Ejemplos

### batctl

---

**obtener interfaces activas**
```
root@LiMe-ab46b8:~# batctl if
eth0_270: active
wlan0-mesh_270: active
```

---

**obtener vecinos**
```
root@LiMe-ab46b8:~# batctl n
[B.A.T.M.A.N. adv 2025.4-openwrt-2, MainIF/MAC: eth0_270/02:95:39:ab:46:b8 (bat0/76:ff:fb:da:33:92 BATMAN_IV)]
IF             Neighbor              last-seen
   wlan0-mesh_270	  02:58:47:59:82:57    4.640s

```
