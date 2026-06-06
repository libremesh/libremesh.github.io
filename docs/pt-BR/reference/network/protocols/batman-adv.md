# Batman-adv

![batmanadv](/batmanadv_logo.svg){width=250 height=200}

## Referência
- [B.A.T.M.A.N. na Wikipedia](https://en.wikipedia.org/wiki/B.A.T.M.A.N.)
- Página da wiki do OpenWrt para [B.A.T.M.A.N. / batman-adv](https://openwrt.org/docs/guide-user/network/wifi/mesh/batman)
- Página da wiki Open-Mesh para [B.A.T.M.A.N. advanced](https://www.open-mesh.org/projects/batman-adv/wiki/Wiki)

## Opções padrão:
- `routing_algo`: `BATMAN_IV`
- `bridge_loop_avoidance`: `1`
- `multicast_mode`: `0`
- `batadv_orig_interval`: `2000`
- `distributed_arp_table`: `0`
- `gw_mode`: `client` - define gw_mode=client em todos os lugares. Como não há gw_mode=server, isso faz com que bat0 nunca encaminhe solicitações, então um servidor DHCP rogue não afeta toda a rede (solicitações DHCP são sempre respondidas localmente)
- Suporta `alfred` se instalado, substituído por `shared-state`

- Define um endereço mac único para cada interface batman    
    Evita a inundação de dmesg causada por BLA com mensagens como "br-lan:
    pacote recebido em bat0 com o próprio endereço como origem".
    Ajusta o endereço MAC para cada uma das interfaces usadas pelo Batman-adv
    00 + Unicast administrado localmente .. 2 bytes do nome da interface
.. 3 bytes da interface principal

- define o `mtu` para cada interface vlan para `1532`

## Exemplos

### batctl

---

**obter interfaces ativas**
```
root@LiMe-ab46b8:~# batctl if
eth0_270: active
wlan0-mesh_270: active
```

---

**obter vizinhos**
```
root@LiMe-ab46b8:~# batctl n
[B.A.T.M.A.N. adv 2025.4-openwrt-2, MainIF/MAC: eth0_270/02:95:39:ab:46:b8 (bat0/76:ff:fb:da:33:92 BATMAN_IV)]
IF             Neighbor              last-seen
   wlan0-mesh_270	  02:58:47:59:82:57    4.640s

```
