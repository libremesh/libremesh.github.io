---
title: "Configuraciones UCI genéricas"
---

# Configuraciones UCI genéricas
Secciones adicionales de LibreMesh para:    
- `generic_uci_config` - Define configuraciones adicionales de OpenWrt.    
- `copy_asset` - Copia un archivo del directorio de assets a una ruta especificada.   
- `run_assets` - Ejecuta un archivo desde el directorio de assets, esquema explicado en copy_asset.

La principal ventaja de estas secciones es permitir al usuario mantener toda la configuración de LibreMesh dentro de `lime-files` (un `lime-community` genérico y eventualmente un `lime-node` específico).    
Consulte los [valores predeterminados UCI de OpenWrt](https://openwrt.org/docs/guide-developer/uci-defaults) para métodos estándar de **integración de configuraciones personalizadas**.

## generic_uci_config
```
config generic_uci_config 'uhttpd_https'
	list uci_set 'uhttpd.main.redirect_https=0'
```
Por defecto, uhttpd recibe la instrucción de evitar la redirección forzada de http a https.

## copy_asset
Copia un archivo del directorio de assets a una ruta especificada.    
Los directorios de assets del nodo son /etc/lime-assets/node y /etc/lime-assets/community.    
El directorio de la comunidad debe contener los mismos archivos en todos los nodos de la comunidad.

```
config copy_asset collectd
	option asset 'community/collectd.conf' # ou 'node/collectd.conf' ou 'community/mynode_collectd.conf' 
	option dst '/etc/collectd.conf'
```

## run_asset
Ejecuta un archivo desde el directorio de assets, esquema explicado en copy_asset.
```
config run_asset dropbear
	option asset 'community/dropbear.sh'
	option when 'ATFIRSTBOOT' # ATFIRSTBOOT, ATCONFIG
```
