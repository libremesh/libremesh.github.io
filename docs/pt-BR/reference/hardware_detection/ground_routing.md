---
title: "Roteamento terrestre"
---
# Roteamento terrestre

Uma seção para cada link de roteamento terrestre.

Com roteamento terrestre nos referimos a configurações que têm o LibreMesh em um roteador que está conectado via cabo(s), eventualmente através de um switch, 
a alguns roteadores wireless executando o firmware original em modo WDS (ponte transparente) Ap/Sta.

Provavelmente você desejará configurar tantas seções de roteamento terrestre com números de VLAN ou portas de switch diferentes quantos dispositivos conectados em modo WDS.
Para uma descrição detalhada consulte https://github.com/libremesh/lime-packages/issues/443

```
config hwd_gr link1
    option net_dev 'eth0'                               
    option vlan '5'
    option switch_dev 'switch0'
    option switch_cpu_port '0'
    list switch_ports '4t'                              
```

- `option net_dev 'eth0'` - Dispositivo ethernet simples sobre o qual a VLAN 802.1q será construída. Em caso de dúvida consulte https://openwrt.org/toh/start
- `option vlan '5'` - ID da VLAN para usar para este link de roteamento terrestre, use um número pequeno porque switches baratos não suportam IDs grandes. isso também será usado como VID 802.1q em portas etiquetadas
- `option switch_dev 'switch0'` - Estas opções relativas ao switch devem ser definidas apenas se seu dispositivo ethernet estiver conectado a um chip de switch. Se o switch existir você pode ler seu nome (como switch0) no arquivo /etc/config/network
- `option switch_cpu_port '0'` - Consulte o mapa de portas do switch do seu dispositivo em https://openwrt.org/toh/start para saber o índice da porta CPU
- `list switch_ports '4t'` - Lista de portas do switch nas quais você deseja que a VLAN seja passada, use o sufixo 't' para especificar que a porta está etiquetada, consulte https://openwrt.org/toh/start para correspondência com portas físicas
