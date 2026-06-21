---
title: "Modos Wi-Fi"
---
# Modos Wi-Fi

## Pontos de acesso

### SSID

#### ap_ssid
- Tipo: `string`
- Padrão: `LibreMesh.org`

```
config lime wifi
	option ap_ssid 'LibreMesh.org'
```

Defina aqui o nome da sua rede, **este valor é necessário mesmo se o AP não for usado**, pois é usado para calcular campos com %Nn.

#### apname_ssid
- Tipo: `string`
- Padrão: `LibreMesh.org/%H`

```
config lime wifi
	option ap_ssid 'LibreMesh.org/%H'
```
SSID específico para cada AP. Um usuário pode se conectar ao AP com nome para evitar o roaming.

#### apbb_ssid
- Tipo: `string`
- Padrão: não definido

```
config lime wifi
	option apbb_ssid 'backbone/%H'
```

### chave e criptografia

## Ponto de acesso Ad-Hoc

```
config lime 'wifi'
    list modes 'adhoc'
    option adhoc_ssid 'LiMe'
    option adhoc_bssid 'ca:fe:00:c0:ff:ee'
```

- `adhoc_ssid 'LiMe'` - SSID dos APs (nós) ao fazer mesh no modo ad-hoc, ou seja, os nós formam um IBSS. Não é usado ao fazer mesh em 802.11s (o padrão)


## Ponto de acesso APuP
Consulte o artigo no blog da FreiFunk sobre [Uma nova forma de fazer mesh – APuP](https://blog.freifunk.net/2024/08/24/a-new-way-to-mesh-apup/)

```
config lime 'wifi'
    list modes 'apup'
    option apup_ssid 'LibreMesh.org'
```

- `apup_ssid 'LibreMesh.org'` - Defina aqui o nome da sua rede baseada em APuP 

## 802.11s
```
config lime 'wifi'
    list modes 'ieee80211s'
    option ieee80211s_mesh_fwding '0'
    option ieee80211s_mesh_nolearn '1'
    option ieee80211s_mesh_id 'LiMe'
#   option ieee80211s_key 'SomePsk2AESKey'
#   option ieee80211s_encryption 'psk2/aes'
```
### chave e criptografia
Se você planeja usar mesh criptografada, deve garantir que tenha o pacote `wpad-mesh-*`, não `wpad-basic-*`, onde `*` é `mbedtls`, `openssl` ou `wolfssl`. O OpenWrt 23 usa `mbedtls` por padrão. Por exemplo, no ImageBuilder adicione

```
-wpad-basic-mbedtls wpad-mesh-mbedtls
```

### mesh_params
Parâmetros de mesh suportados
- `ieee80211s_mesh_id 'LiMe'` - Identificador da nuvem mesh (similar ao SSID em conceito). Usado pelos nós para se juntar e participar na rede mesh.
- `ieee80211s_mesh_fwding '0'` - Ajustes necessários apenas para 802.11s
- `ieee80211s_mesh_nolearn '1'` - Desabilita as capacidades de roteamento mesh multihop de 802.11s
- `ieee80211s_mcast_rate` - é ajustado em **opções específicas de banda** com `24000` para `2ghz` e `6000` para `5ghz`
