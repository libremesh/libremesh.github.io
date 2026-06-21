---
outline: deep
---

# Configuração

## lime-files

A configuração do LibreMesh é feita principalmente por um conjunto de arquivos `/etc/config/lime-<level>`.
Esses arquivos podem ser gerenciados através da [UCI](https://openwrt.org/docs/guide-user/base-system/uci) 
do OpenWrt ou editados manualmente com `vim`.   
Para modificá-los através da [interface web LuCI](https://openwrt.org/docs/guide-user/luci/luci.essentials), instale `luci-app-filemanager`.

As opções contidas nesses arquivos são mescladas e sobrescritas da menor para a maior prioridade:

``` sh-vue
/etc/config/
├─ lime-defaults    # NÃO EDITE, configuração padrão
├─ lime-community   # configuração da comunidade
├─ lime-<MAC>       # configuração do nó, específica do dispositivo
├─ lime-node        # configuração do nó
└─ lime-autogen     # NÃO EDITE, configuração autogerada
```
### Seções
A configuração é dividida em três seções principais: 
- `config lime system` - Opções do sistema: hostname, domínio, root_password   
- `config lime network` - Opções de rede: ipv4/ipv6, resolvers DNS, lista de protocolos, opções de protocolos
- `config lime wifi` - Opções wireless: lista de modos, opções de AP/Ad-Hoc/ApUP/80211s 

Por padrão, seguido por configurações específicas da banda de rádio:
- `config lime-wifi-band 2ghz`
- `config lime-wifi-band 5ghz`

Opcionalmente, seguido por seções específicas de interface e opções específicas de protocolos
- `config net port1`
- `config wifi radio0`

::: tip Seção específica de interface
Seções específicas de interface devem ser incluídas em `lime-node` ou `lime-<MAC>`.
:::

Opcionalmente, seguido por outros protocolos específicos, scripts e configs uci, ou hardware_modules
- `config bgp_peer peer1` 
- `config generic_uci_config uhttpd_https`
- `config hwd_watchcat periodic_reboot`

### Opções parametrizáveis
Dentro de `lime-files`, as opções marcadas com `Parametrizável com %Mn, %Nn, %H`, podem incluir os templates:
- `%Mn`: substituído pelo n-ésimo byte da MAC da **`primary_interface`**
- `%Nn`: substituído pelo n-ésimo (n = 1..5) byte do identificador de rede, calculado a partir do **hash de `ap_ssid`**.
  Todos os nós que formam uma nuvem mesh (compartilham o mesmo `ap_ssid`) produzão o mesmo valor
- `%H`: substituído pelo `hostname`


## lime-config
O comando `lime-config` configura o LibreMesh sobre o OpenWrt.   
Consulte a página [lime-config](lime-config) para os detalhes.
