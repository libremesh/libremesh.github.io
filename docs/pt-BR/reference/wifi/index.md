---
title: "Opções WiFi"
---
# Opções WiFi
A configuração de cada dispositivo de rádio é calculada a partir de:
- as **opções gerais** em `config lime wifi`
- a correspondente **seção específica de banda** para `2ghz` e `5ghz` também incluída em `lime-defaults`
- uma **seção específica de interface** opcional relativa a esse dispositivo de rádio específico.

## Valores padrão
Os valores padrão conforme `lime-defaults`

```
config lime wifi
	list modes 'ap'
	list modes 'apname'
	list modes 'ieee80211s'
	option ap_ssid 'LibreMesh.org'
	option apname_ssid 'LibreMesh.org/%H'
	option adhoc_ssid 'LiMe'
	option adhoc_bssid 'ca:fe:00:c0:ff:ee'
	option apup_ssid 'LibreMesh.org'
	option ieee80211s_mesh_fwding '0'
	option ieee80211s_mesh_nolearn '1'
	option ieee80211s_mesh_id 'LiMe'
	option unstuck_interval '10'
	option unstuck_timeout '300'

config lime-wifi-band '2ghz'
	option channel '11'
	option htmode 'HT20'
	option distance '1000'
	option adhoc_mcast_rate '24000'
	option ieee80211s_mcast_rate '24000'

config lime-wifi-band '5ghz'
	list channel '48'
	list channel '157'
	option htmode 'HT40'
	option distance '10000'
	option adhoc_mcast_rate '6000'
	option ieee80211s_mcast_rate '6000'
```

## Opções gerais
Os ajustes na seção `config lime wifi` se aplicam a **todos os rádios**.

As configurações do LibreMesh nas seções `wifi` `lime-wifi-band` e específicas `radioN` contêm opções para configurar:
- **opções do dispositivo de rádio** como `channel`, `distance`, `htmode` e `txpower`
- **opções da interface wifi** para Pontos de Acesso, como `ap_ssid`, `ap_key`, `ap_encryption`, ou outros modos suportados como 80211s ou cliente. 
- **opções de rede**, a lista de protocolos e opções são herdadas da seção de rede padrão `config lime 'network'`

### ap_ssid
- Tipo: `string`
- Padrão: `LibreMesh.org`

```
config lime wifi
	option ap_ssid 'LibreMesh.org'
```

Defina aqui o nome da sua rede, **este valor é necessário mesmo se o AP não for usado**, pois é usado para calcular campos com %Nn.


### country
- Tipo: código do país
- Padrão: não definido, usa `00` (Mundial) por padrão

Defina isso para o código do país da sua localização, por exemplo na Espanha, definir `ES` permite usar o canal 13

### modes
- `adhoc` - Consulte a configuração adhoc abaixo
- `ap` - Este modo configura um Ponto de Acesso, com o mesmo ssid em cada nó para roaming.
- `apbb` - AP de backbone, para conexão de outros roteadores LibreMesh em vez de usuários
- `apname` - Este modo configura um Ponto de Acesso, com um ssid específico para cada nó.
- `apup` - Este modo configura o rádio para operação APuP.
- `client` - a configuração do cliente deve ser feita em [Opções específicas Wi-Fi](./interface-specific.html#modo-cliente-wifi)
- `ieee80211s` - Usado para links mesh entre nós.

#### opções do modes
Consulte a próxima página [Modos Wi-Fi](./modes) para detalhes sobre opções de `Access Points`, `Adhoc`, `APuP` e `802.11s`.

## Solução para rádios surdos
::: warning Advertência ath9k

Roteadores com rádios Atheros e o driver ath9k têm um bug conhecido que os deixam surdos, 
se você estiver usando uma versão OpenWrt anterior a 24.10.6 certifique-se de incluir o pacote libremesh `wifi-unstuck-wa`
:::

### unstuck_interval
- Padrão: `10`
- Pacotes necessários: `wifi-unstuck-wa`

```
config lime 'wifi'
    option unstuck_interval '10'
```

Intervalo em minutos que define a frequência com que o script de contornação fornecido pelo pacote `wifi-unstuck-wa`
é executado, que reexamina todas as frequências nos rádios ativos.


### unstuck_timeout
- Padrão: `10`
- Pacotes necessários: `wifi-unstuck-wa`

```
config lime 'wifi'
    option unstuck_interval '10'
```

Tempo limite em segundos que define a duração da solução alternativa mencionada acima.
