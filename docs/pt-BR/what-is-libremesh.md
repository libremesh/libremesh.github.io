---
outline: deep
---

# O que é o LibreMesh?

## Objetivos a alcançar

  - Permitir que usuários não especialistas montem uma rede mesh e façam a configuração e o gerenciamento básicos através de uma interface web usável no celular
  - Incentivar usuários não especializados a se apropriarem da tecnologia, aprofundando seu entendimento técnico das redes mesh
  - Escalabilidade
  - Segmentação de rede
  - Roaming em camada 2 dentro de certas áreas
  - Seleção inteligente de gateway com redundância e possibilidade de escolha pelo usuário
  - Compatibilidade com diversos cenários
  - Uma única imagem de firmware para todos os roteadores da sua rede

## O básico

A arquitetura de rede projetada para o LibreMesh se baseia em duas camadas:

### Camada 2 em nuvem
::: info A camada 2 em nuvem usa o protocolo de roteamento dinâmico [BATMAN-adv](https://en.wikipedia.org/wiki/B.A.T.M.A.N.).

![batmanadv](/batmanadv_logo.svg){width=250 height=200}

***
B.A.T.M.A.N. Advanced é um protocolo de roteamento mesh que roda no espaço do kernel.
Mesmo que a topologia da rede seja formada por múltiplos nós e múltiplos saltos, o B.A.T.M.A.N. Advanced a abstrai como um único domínio de broadcast em camada 2.
Assim, do ponto de vista do usuário, toda a mesh se parece com uma única LAN.
Essa arquitetura é robusta para fins de roaming, de modo que conexões TCP e UDP não se perdem ao se mover e trocar de ponto de acesso.
***
:::

### Camada 3 de rede
::: info Toda a camada 3 da rede usa por padrão o protocolo de roteamento [Babel](https://en.wikipedia.org/wiki/Babel_(protocol)).
![Babel](/babel_logo.svg){width=200 height=200}

***
Babel é um protocolo de roteamento robusto e eficiente tanto para redes mesh sem fio quanto para redes cabeadas
***
:::

### Misturando as camadas

Por padrão, todos os nós rodam ambos os protocolos de roteamento (Babel e BATMAN-adv), mas em VLANs diferentes.footnote:[LAN virtual isolada, por exemplo wlan0.13].

::: tip NOTA
A VLAN do Babel é sempre a mesma, então todos os nós conectados no nível de enlace se enxergam.    
A VLAN do BATMAN-adv depende do identificador da nuvem, que é calculado (por padrão) a partir do hash do SSID do AP.

A rede Babel será uma única rede para toda a mesh, mas a rede BATMAN-adv pode ser separada entre diferentes nuvens locais.
:::

![](/network1.png)

**Essa configuração isola as nuvens de camada 2**.
Por exemplo, um bairro, um complexo de empresas ou uma rede de hotspots ao nível de rua podem optar por isolar sua LAN do restante da rede.
Ao mesmo tempo, conseguirão alcançar os demais nós usando a rede roteada de camada 3.

O roaming estará disponível dentro da nuvem, de modo que sessões TCP, streaming de vídeo ou até mesmo uma chamada SIP podem ser mantidas enquanto você se move.
Por outro lado, graças à segmentação de camada 3, os problemas comuns encontrados em uma rede bridgeada em camada 2 —como broadcast storms ou pesadelos de DHCP—
não atrapalharão o funcionamento correto da rede.

::: tip
Tudo é automático e transparente para o usuário final.
:::

![](/network2.png)


## Os detalhes

Os pontos de acesso WiFi da mesma nuvem compartilham parâmetros comuns:

* O SSID (o nome de identificação do AP WiFi)
* Endereços IPv4 e IPv6 anycast especiais.footnote:[IP compartilhado por vários dispositivos na rede]
* Um endereço MAC anycast especial
* O servidor DHCP/RA que fornece IPs válidos da nuvem para os clientes.

Assim, um cliente conectado a um AP pode se mover pela mesh sem precisar renovar sua configuração IP.
Até a camada MAC será a mesma do ponto de vista dele.

![](/network3.png)

::: tip
O arquivo de concessões DHCP é compartilhado entre a nuvem para evitar colisões usando
[shared-state](https://github.com/libremesh/shared-state-async)

Desde que todos os nós compartilhem o mesmo MAC/IP anycast, do ponto de vista do cliente é totalmente transparente.
O gateway é sempre o mesmo, mesmo que o nó mesh (ao qual o cliente está conectado) mude.
:::

![](/network4.png)

Quando um cliente quer sair da LAN (nuvem) para alcançar a Internet ou qualquer outra rede,
ele enviará os pacotes para o endereço anycast especial do gateway. O nó ao qual o cliente
está fisicamente conectado se encarregará disso.

::: tip
Uma regra de nftables na bridge LAN/AP evita que os pacotes enviados ao endereço anycast
se propaguem pela nuvem.
O nó mesh ao qual o cliente está associado recebe o pacote, mas os outros não.
:::

![](/network5.png)

O pacote é roteado pela rede Babel de camada 3 até o gateway de Internet mais próximo.
Pode ser um nó da mesma nuvem ou qualquer outro de uma nuvem distante.

![](/network6.png)


## Diagramas

- Listagem de diagramas de todas as interfaces de rede criadas no LibreMesh rodando em um roteador **OpenWrt One**.
[![diagram_libremesh-interfaces-openwrt-one](/diagram_libremesh-interfaces-openwrt-one.png)](/diagrams/libremesh-interfaces-openwrt-one)
