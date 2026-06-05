---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "LibreMesh"
  text: "Un framework modular para crear firmwares basados en OpenWrt para nodos de mesh inalámbricos"
  tagline: Hacer posible las redes libres
  image:
    src: /lime.svg
  actions:
    - theme: brand
      text: ¿Qué es LibreMesh?
      link: /es/what-is-libremesh
    - theme: alt
      text: Primeros pasos
      link: /es/getting-started
    - theme: alt
      text: Firmware Selector
      link: https://firmware-selector.libremesh.org

features:
  - icon:
      src: /network_topology_mesh_icon.png
    title: Redes mesh
    details:
      Las redes mesh son redes en las que todos los participantes (nodos) pueden enrutar el tráfico de otros participantes.
      No hay puntos centrales y la topología física puede ser completamente aleatoria.
      Por lo general, las redes mesh son descentralizadas, organizadas desde abajo hacia arriba, desplegadas y mantenidas por las personas que las usan.
      Creemos que es la única manera de conseguir una red realmente libre, fuera del control de gobiernos y empresas globales.
  - icon:
      src: /gnu_logo.png
    title: Redes libres, sociedad libre
    details: Entendemos que una red libre, como red de telecomunicaciones, debe cumplir estos tres puntos.
        Es abierta, así que cualquiera puede conectarse si es físicamente posible.
        Es neutral, por lo que no hay preferencias por el tipo, origen o destino de los datos.
        Es libre como la libertad (libre significa "free as in free speech" en inglés).
        Todo lo que desarrollamos es software libre para una sociedad libre, de modo que cualquiera pueda usarlo, copiarlo, modificarlo y distribuirlo bajo la licencia AGPL.

  - icon:
      src: /openwrt_logo_icon.png
    title: Firmware y dispositivos embebidos
    details: Un dispositivo embebido es una computadora pequeña. Normalmente, al sistema operativo que corre en esas computadoras pequeñas se le llama firmware.
      Nuestra forma de desplegar redes mesh libres es instalando nuestro propio firmware en los dispositivos (normalmente routers WiFi).
      Nuestro sistema se basa en el proyecto OpenWrt, que a su vez se basa en el conocido sistema operativo Linux.
---

## Organizaciones que apoyan a LibreMesh:

|              |                   |                            |                                       |
| -------------| ----------------- | -------------------------- | ------------------------------------- |
| AlterMundi   | Argentina         | https://altermundi.net     | ![AlterMundi](/altermundi_logo.png)   |
| Coolab       | Brasil            | https://wiki.coolab.org    | ![Coolab](/coolab_logo.png)       |
| FreiFunk     | Alemania          | https://freifunk.net       | ![FreiFunk](/freifunk_logo.png)       |
| FunkFeuer    | Austria           | https://funkfeuer.at       | ![FunkFeuer](/funkfeuer_logo.png)     |
| Guifi        | Península Ibérica | https://guifi.net          | ![Guifi](/guifi_logo.png)             |
| IBEBrasil    | Brasil            | https://ibebrasil.org.br   | ![IBEBrasil](/ibebrasil_logo.png)     |
| LibreRouter  | Global            | https://librerouter.org    | ![LibreRouter](/librerouter_logo.png) |
| Ninux        | Italia            | https://ninux.org          | ![Ninux](/ninux_logo.png)             |
| NUPEF        | Brasil            | https://nupef.org.br/      |                                       |
| Wakoma       | Global            | https://wakoma.co          | ![Wakoma](/wakoma_logo.png)           |

## Redes mesh comunitarias que usan LibreMesh:

|                 |                     |                                           |                           |
| --------------- | ------------------- | ----------------------------------------- | ------------------------- |
| Antennine       | Bolonia, Italia     | https://antennine.noblogs.org             | ![Ninux](/ninux_logo.png) |
| Calafou         | Cataluña            | https://calafou.org/                      |                           |
| Coolab          | Brasil              | https://www.coolab.org/                   |                           |
| Janastu CowMesh | Karnataka rural     | https://open.janastu.org/projects/cowmesh |                           |
| NUPEF           | Brasil              | https://nupef.org.br/                     |                           |

<style>
#organizaciones-que-apoyan-a-libremesh + table > thead,
#redes-mesh-comunitarias-que-usan-libremesh + table > thead {
    display: none;
}
</style>
