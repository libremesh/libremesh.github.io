---
outline: deep
---

# lime-config
O comando `lime-config` configura o LibreMesh sobre o OpenWrt.

## lime-files
Esses arquivos são combinados do nível baixo `lime-defaults` até o nível alto `lime-node` para produzir a configuração completa em `lime-autogen`.

## Módulos
Os módulos são configurados nesta ordem `hardware_detection`, `wireless`, `network`, `firewall`, `system`, `generic_config`.

### hardware_detection
Carrega todos os pacotes que começam com `lime-hwd-*`    
`lime-hwd-openwrt-wan` configura a porta WAN do OpenWrt como WAN. Se desativado, ou o pacote não estiver instalado, a porta WAN é configurada como LAN.

### wireless
Varre o dispositivo OpenWrt para encontrar rádios existentes.   
Produz a configuração UCI para cada rádio, carregando configurações de `lime-autogen` na ordem: 
- `config lime 'wifi'` (opções gerais wifi)
- `config lime '5ghz'` (opções específicas da banda)
- `config lime '2ghz'` (opções específicas da banda)
- `config radioN` (opções específicas do rádio)

### network

#### varredura
Varre o dispositivo OpenWrt para encontrar dispositivos ethernet existentes.    

#### protocolos gerais
Configura todos os `protocolos gerais` de `lime-autogen.network.protocols`

#### protocolos específicos de interface
Para cada dispositivo ethernet, se estiver presente uma seção `config net` específica, a usa; caso contrário, usa a lista de protocolos dos `protocolos gerais`.    
Configura todos os protocolos no dispositivo ethernet.

O arquivo `lime-defaults` fornece a configuração padrão para uma ampla lista de protocolos.     
Apenas os protocolos para os quais o pacote relativo `lime-proto-<proto-name>` está instalado são configurados. 
Na configuração padrão são 
- `ieee80211s` incluído no pacote `lime-system`
- `lan` incluído no pacote `lime-system`
- `anygw` - fornecido por `lime-proto-anygw` 
- `babeld` - fornecido por `lime-proto-babeld` 
- `batadv` - fornecido por `lime-proto-batadv` 

### firewall
Fornece uma configuração padrão para: configurações gerais, zona LAN, zona WAN.   
Consulte as [zonas de firewall do OpenWrt](https://openwrt.org/docs/guide-user/firewall/firewall_configuration#zones).

#### padrão
`configuração de firewall padrão:    
`input: ACCEPT`   
`output: ACCEPT`   
`forward: ACCEPT` 

#### Zona LAN
Fornece a configuração de firewall padrão para a `Zona LAN`, e atualiza a lista de interfaces lan:    

Exemplo de configuração autogerada em um roteador de banda dupla com 4 portas lan/1 wan ethernet.
```
config zone
	option name 'lan'
	list network 'lan'
	list network 'lm_net_br_lan_anygw_if'
	list network 'lm_net_wlan0_mesh_batadv_if'
	list network 'lm_net_wlan0_mesh_babeld_if'
	list network 'lm_net_wlan1_mesh_batadv_if'
	list network 'lm_net_wlan1_mesh_babeld_if'
	list network 'lm_net_lan1_babeld_if'
	list network 'lm_net_lan1_batadv_if'
	list network 'lm_net_lan2_batadv_if'
	list network 'lm_net_lan2_babeld_if'
	list network 'lm_net_wan_batadv_if'
	list network 'lm_net_wan_babeld_if'
	list network 'lm_net_lan3_batadv_if'
	list network 'lm_net_lan3_babeld_if'
	list network 'lm_net_lan4_batadv_if'
	list network 'lm_net_lan4_babeld_if'
	option input 'ACCEPT'
	option output 'ACCEPT'
	option forward 'ACCEPT'
	option mtu_fix '1'
```
  
`mtu_fix: 1` - Habilita o ajuste do tamanho máximo de segmento (MSS) também para LAN. Habilitado por padrão apenas para WAN.   
`network: <lista-de-interfaces-lan>` - Lista de interfaces dentro da bridge `br-lan`
  As interfaces LAN são determinadas anteriormente durante a configuração do protocolo de rede `lan`


#### Zona WAN
Mantém as configurações padrão do OpenWrt.

```
config zone
	option name 'wan'
	list network 'wan'
	list network 'wan6'
	option input 'REJECT'
	option output 'ACCEPT'
	option forward 'REJECT'
	option masq '1'
	option mtu_fix '1'
```

### system
Define `hostname` e `root_password`

### generic_config
Lê e executa as seções `generic_uci_config`, `copy_asset` e `run_asset`. 
Aplica configuração UCI personalizada ou copia/executa scripts shell.
Consulte a página [Generic Config](generic_config) para opções detalhadas.


## Confirmar alterações
As alterações são confirmadas pelo comando `lime-config` e escritas em arquivos `/etc/config/`.  
::: tip  
Certifique-se de não perder a conexão com o seu dispositivo após a configuração.    
Para aplicar as alterações da forma mais segura, execute um `reboot` do dispositivo.    
:::

### lime-apply
Na maioria dos casos, pode-se pular a reinicialização executando o comando `lime-apply`, que chama o `reload_config` do OpenWrt.   
Dependendo das configurações alteradas, pode ser necessário uma reinicialização completa de alguns serviços, como `wireless`, `network` e `firewall`.    
```
lime-config; lime-apply; wifi; \
/etc/init.d/network restart; \
/etc/init.d/firewall restart
```
