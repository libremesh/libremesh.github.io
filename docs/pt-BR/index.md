---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "LibreMesh"
  text: "Um framework modular para criar firmwares baseados em OpenWrt para nós mesh sem fio"
  tagline: Tornando possíveis as redes livres
  image:
    src: ./lime.svg
  actions:
    - theme: brand
      text: O que é o LibreMesh?
      link: /pt-BR/what-is-libremesh
    - theme: alt
      text: Primeiros passos
      link: /pt-BR/getting-started
    - theme: alt
      text: Firmware Selector
      link: https://firmware-selector.libremesh.org

features:
  - icon:
      src: /network_topology_mesh_icon.png
    title: Redes mesh
    details:
      Redes mesh são redes nas quais todos os participantes (nós) podem rotear o tráfego de outros participantes.
      Não há pontos centrais e a topologia física pode ser completamente aleatória.
      Geralmente as redes mesh são descentralizadas, organizadas de baixo para cima, implantadas e mantidas pelas pessoas que as utilizam.
      Acreditamos que essa é a única forma de alcançar uma rede verdadeiramente livre, fora do controle de governos e grandes empresas.
  - icon:
      src: /gnu_logo.png
    title: Redes livres, sociedade livre
    details: Entendemos que uma rede livre, como rede de telecomunicações, deve cumprir estes três pontos.
        É aberta, de modo que qualquer pessoa possa se conectar se for fisicamente possível.
        É neutra, sem preferências pelo tipo, origem ou destino dos dados.
        É livre como em liberdade (libre significa "free as in free speech" em inglês).
        Tudo o que desenvolvemos é software livre para uma sociedade livre, para que qualquer pessoa possa usar, copiar, modificar e distribuir sob a licença AGPL.

  - icon:
      src: /openwrt_logo_icon.png
    title: Firmware e dispositivos embarcados
    details: Um dispositivo embarcado é um computador pequeno. Normalmente, o sistema operacional que roda nesses computadores pequenos é chamado de firmware.
      Nossa forma de implantar redes mesh livres é instalando nosso próprio firmware nos dispositivos (geralmente roteadores WiFi).
      Nosso sistema é baseado no projeto OpenWrt, que por sua vez é baseado no conhecido sistema operacional Linux.
---

## Organizações que apoiam o LibreMesh:

|              |                   |                            |                                       |
| -------------| ----------------- | -------------------------- | ------------------------------------- |
| AlterMundi   | Argentina         | https://altermundi.net     | ![AlterMundi](/altermundi_logo.png)   |
| Coolab       | Brasil            | https://wiki.coolab.org    | ![Coolab](/coolab_logo.png)       |
| FreiFunk     | Alemanha          | https://freifunk.net       | ![FreiFunk](/freifunk_logo.png)       |
| FunkFeuer    | Áustria           | https://funkfeuer.at       | ![FunkFeuer](/funkfeuer_logo.png)     |
| Guifi        | Península Ibérica | https://guifi.net          | ![Guifi](/guifi_logo.png)             |
| IBEBrasil    | Brasil            | https://ibebrasil.org.br   | ![IBEBrasil](/ibebrasil_logo.png)     |
| LibreRouter  | Global            | https://librerouter.org    | ![LibreRouter](/librerouter_logo.png) |
| Ninux        | Itália            | https://ninux.org          | ![Ninux](/ninux_logo.png)             |
| NUPEF        | Brasil            | https://nupef.org.br/      |                                       |
| Wakoma       | Global            | https://wakoma.co          | ![Wakoma](/wakoma_logo.png)           |

## Redes mesh comunitárias que usam o LibreMesh:

|                 |                     |                                           |                           |
| --------------- | ------------------- | ----------------------------------------- | ------------------------- |
| Antennine       | Bolonha, Itália     | https://antennine.noblogs.org             | ![Ninux](/ninux_logo.png) |
| Calafou         | Catalunha           | https://calafou.org/                      |                           |
| Coolab          | Brasil              | https://www.coolab.org/                   |                           |
| Janastu CowMesh | Karnataka rural     | https://open.janastu.org/projects/cowmesh |                           |
| NUPEF           | Brasil              | https://nupef.org.br/                     |                           |

<style>
#organizações-que-apoiam-o-libremesh + table > thead,
#redes-mesh-comunitárias-que-usam-o-libremesh + table > thead {
    display: none;
}
</style>
