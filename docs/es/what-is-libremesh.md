---
outline: deep
---

# ¿Qué es LibreMesh?

## Objetivos a alcanzar

  - Permitir a usuarios no expertos montar una red mesh y realizar la configuración y gestión básicas desde una interfaz web usable en el teléfono móvil
  - Animar a los usuarios no expertos a profundizar en su comprensión técnica de las redes mesh
  - Escalabilidad
  - Segmentación de red
  - Roaming en capa 2 dentro de ciertas áreas
  - Selección inteligente de gateway con redundancia y posibilidad de elección por el usuario
  - Compatibilidad con muchos escenarios distintos
  - Una única imagen de firmware para todos los routers de tu red

## Lo básico

La arquitectura de red diseñada para LibreMesh se basa en dos capas:

### Capa 2 en la nube
::: info La capa 2 en la nube usa el protocolo de enrutamiento dinámico [BATMAN-adv](https://en.wikipedia.org/wiki/B.A.T.M.A.N.).

![batmanadv](/batmanadv_logo.svg){width=250 height=200}

***
B.A.T.M.A.N. Advanced es un protocolo de enrutamiento mesh que se ejecuta en el espacio del kernel.
Aunque la topología de la red esté formada por múltiples nodos y múltiples saltos, B.A.T.M.A.N. Advanced la abstrae como un único dominio de difusión en capa 2.
De este modo, desde el punto de vista del usuario, toda la mesh se ve como una sola LAN.
Esta arquitectura es robusta para el roaming, por lo que las conexiones TCP y UDP no se pierden al moverse entre puntos de acceso.
***
:::

### Capa 3 de red
::: info Toda la capa 3 de la red usa por defecto el protocolo de enrutamiento [Babel](https://en.wikipedia.org/wiki/Babel_(protocol)).
![Babel](/babel_logo.svg){width=200 height=200}

***
Babel es un protocolo de enrutamiento robusto y eficiente tanto para redes mesh inalámbricas como cableadas
***
:::

### Mezclando capas

Por defecto, todos los nodos ejecutan ambos protocolos de enrutamiento (Babel y BATMAN-adv), pero en VLANs distintas.footnote:[LAN virtual aislada, por ejemplo wlan0.13].

::: tip NOTA
La VLAN de Babel es siempre la misma, así que todos los nodos conectados a nivel de enlace se ven entre sí.    
La VLAN de BATMAN-adv depende del identificador de la nube, que se calcula (por defecto) a partir del hash del SSID del AP.

La red Babel será una única red para toda la mesh, pero la red BATMAN-adv puede estar separada entre distintas nubes locales.
:::

![](/network1.png)

**Esta configuración aísla las nubes de capa 2**.
Por ejemplo, un barrio, un complejo de oficinas o una red de hotspots a nivel de calle pueden elegir aislar su LAN del resto de la red.
Al mismo tiempo, podrán alcanzar el resto de los nodos usando la red enrutada de capa 3.

El roaming estará disponible dentro de la nube, por lo que las sesiones TCP, el streaming de vídeo o incluso una llamada SIP se pueden mantener mientras te mueves.
Por otro lado, gracias a la segmentación de capa 3, los problemas habituales de una red puenteada en capa 2 —como tormentas de broadcast o pesadillas de DHCP—
no afectarán al correcto funcionamiento de la red.

::: tip
Todo es automático y transparente para el usuario final.
:::

![](/network2.png)


## Los detalles

Los puntos de acceso WiFi de la misma nube comparten parámetros comunes:

* El SSID (el nombre identificador del AP WiFi)
* Direcciones IPv4 e IPv6 anycast especiales.footnote:[IP compartida por varios dispositivos en la red]
* Una dirección MAC anycast especial
* El servidor DHCP/RA que proporciona IPs válidas desde la nube a los clientes.

Así, un cliente conectado a un AP puede moverse por la mesh sin necesidad de renovar su configuración IP.
Incluso la capa MAC será la misma desde su punto de vista.

![](/network3.png)

::: tip
El archivo de concesiones DHCP se comparte entre la nube para evitar colisiones usando
[shared-state](https://github.com/libremesh/shared-state-async)

Mientras todos los nodos compartan el mismo MAC/IP anycast, desde el punto de vista del cliente es totalmente transparente.
El gateway siempre es el mismo aunque el nodo mesh (al que está conectado) cambie.
:::

![](/network4.png)

Cuando un cliente quiere salir de la LAN (nube) para llegar a Internet o a cualquier otra red,
enviará los paquetes a la dirección anycast especial del gateway. El nodo al que el cliente
está físicamente conectado se encargará de esto.

::: tip
Una regla de nftables en el bridge LAN/AP evita que los paquetes enviados a la dirección anycast
se propaguen por la nube.
El nodo mesh al que está asociado el cliente recibe el paquete, pero los demás no.
:::

![](/network5.png)

El paquete se enruta a través de la red Babel de capa 3 hasta el gateway de Internet más cercano.
Puede ser un nodo de la misma nube o cualquier otro de una nube lejana.

![](/network6.png)


## Diagramas

- Listado de diagramas de todas las interfaces de red creadas en LibreMesh ejecutándose en un router **OpenWrt One**.
[![diagram_libremesh-interfaces-openwrt-one](/diagram_libremesh-interfaces-openwrt-one.png)](/diagrams/libremesh-interfaces-openwrt-one)
