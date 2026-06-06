

# Configs UCI genéricas
Seções adicionais do LibreMesh para:    
- `generic_uci_config` - Define configurações adicionais do OpenWrt.    
- `copy_asset` - Copia um arquivo do diretório de assets para um caminho especificado.   
- `run_assets` - Executa um arquivo do diretório de assets, esquema explicado em copy_asset.

A principal vantagem dessas seções é permitir que o usuário mantenha toda a configuração do LibreMesh dentro de `lime-files` (um `lime-community` genérico e eventualmente um `lime-node` específico).    
Consulte os [valores padrão UCI do OpenWrt](https://openwrt.org/docs/guide-developer/uci-defaults) para métodos padrão de **integração de configurações personalizadas**.

## generic_uci_config
```
config generic_uci_config 'uhttpd_https'
	list uci_set 'uhttpd.main.redirect_https=0'
```
Por padrão, o uhttpd é instruído a evitar o redirecionamento forçado de http para https.

## copy_asset
Copia um arquivo do diretório de assets para um caminho especificado.    
Os diretórios de assets do nó são /etc/lime-assets/node e /etc/lime-assets/community.    
O diretório da comunidade deve conter os mesmos arquivos em todos os nós da comunidade.

```
config copy_asset collectd
	option asset 'community/collectd.conf' # ou 'node/collectd.conf' ou 'community/mynode_collectd.conf' 
	option dst '/etc/collectd.conf'
```

## run_asset
Executa um arquivo do diretório de assets, esquema explicado em copy_asset.
```
config run_asset dropbear
	option asset 'community/dropbear.sh'
	option when 'ATFIRSTBOOT' # ATFIRSTBOOT, ATCONFIG
```
