---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "LibreMesh"
  text: "A modular framework for creating OpenWrt-based firmwares for wireless mesh nodes"
# tagline:
  image:
    src: ./lime.svg
  actions:
    - theme: brand
      text: What is LibreMesh?
      link: /what-is-libremesh
    - theme: alt
      text: Quickstart
      link: /getting-started      
    - theme: alt
      text: Firmware Selector
      link: https://firmware-selector.libremesh.org

features:
  - icon:
      src: /network_topology_mesh_icon.png
    title: Mesh Networks
    details: 
      Mesh networks are such networks where all participants (nodes) are able to route traffic from other participants. 
      So there are not central points and the physical topology can be completely random. 
      Usually mesh networks are decentralized, bottom-up organized, deployed and maintained by the people using them. 
      We believe this is the only way for achieving a real free network out of control of the governments and global enterprises.
  - icon:
      src: /gnu_logo.png
    title: Free Networks, Free Society
    details: We understand that a free network as a telecommunications network should accomplish these three points
        It is open, so anyone can connect to it if physically possible.
        It is neutral, so there are not preferences for the kind, origin or destination of the data.
        It is free as in freedom (libre means free as in "free speech" in Spanish).
        Everything we develop is free software for a free society so anyone can use, copy, modify and distribute according with AGPL license.

  - icon:
      src: /openwrt_logo_icon.png
    title: Firmware and Embedded Device
    details: An embedded device is a small computer. Usually the operating system running in such small computers is called Firmware. 
      Our way of deploying free mesh networks is by installing our own firmware to the devices (usually WiFi routers). 
      Our system is based on the OpenWrt project, which at the same time is based on the well known Linux operating system.
---

## Organizations supporting LibreMesh:

|              |                   |                            |                                       |
| -------------| ----------------- | -------------------------- | ------------------------------------- |
| AlterMundi   | Argentina         | https://altermundi.net     | ![AlterMundi](/altermundi_logo.png)   |
| FreiFunk     | Germany           | https://freifunk.net       | ![FreiFunk](/freifunk_logo.png)       |
| FunkFeuer    | Austria           | https://funkfeuer.at       | ![FunkFeuer](/funkfeuer_logo.png)     |
| Guifi        | Iberian peninsula | https://guifi.net          | ![Guifi](/guifi_logo.png)             |
| IBEBrasil    | Brasil            | https://ibebrasil.org.br   | ![IBEBrasil](/ibebrasil_logo.png)     |
| LibreRouter  | Global            | https://librerouter.org    | ![LibreRouter](/librerouter_logo.png) |
| Ninux        | Italy             | https://ninux.org          | ![Ninux](/ninux_logo.png)             |
| Wakoma       | Global            | https://wakoma.co          | ![Wakoma](/wakoma_logo.png)           |

## Community mesh networks using LibreMesh:

|                 |                     |                                           |                           |
| --------------- | ------------------- | ----------------------------------------- | ------------------------- |
| Antennine       | Bologna, Italy      | https://antennine.noblogs.org             | ![Ninux](/ninux_logo.png) |
| Calafou         | Catalunia           | https://calafou.org/                      |
| Coolab          | Brasil              | https://www.coolab.org/                   | 
| Janastu CowMesh | Rural Karnataka     | https://open.janastu.org/projects/cowmesh | 

<style>
#organizations-supporting-libremesh + table > thead,
#community-mesh-networks-using-libremesh + table > thead {
    display: none;
}
</style>


