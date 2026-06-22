# Alignment

The alignment screen is a tool for evaluating and improving the quality of the Wi-Fi link between the base node and one or more nodes within its range. It is used both at installation time and during diagnostics and maintenance.

- [Main screen and associated nodes](#main-screen-and-associated-nodes)
- [Viewing the alignment info of a specific link](#viewing-the-alignment-info-of-a-specific-link)
- [When no possible link is found](#when-no-possible-link-is-found)
- [When a link loses signal](#when-a-link-loses-signal)

## Main screen and associated nodes
When you open the screen, this is the main view:

![Alignment main screen](/guide/lime-app/images/alignment_radios.png)

1. Two tabs, one for each radio of the LibreRouter. The selected tab is highlighted in bold.
   - **Radio 1.** This tab shows the nodes associated with this radio, which corresponds to **Antenna 1** of the device.
   - **Radio 2.** This tab shows the nodes associated with this radio, which corresponds to **Antenna 2** of the device.

2. A list of the associated nodes with a brief summary.

![Node list with link quality](/guide/lime-app/images/alignment_nodes.png)

   a. **The name of the node and the radio through which the base node is communicating with it.**
   b. **Link-quality value.** A number that quantifies the strength of the signal, expressed in dBm (decibel-milliwatts). If the link is lost at some point, a cross is shown.
   c. **Coloured line.** A visual reference for link quality: green means good, yellow/orange means medium, red means low.

## Viewing the alignment info of a specific link

Tapping a node's name opens a screen with the details of that link. It is useful when you want to point the base node at a specific neighbour, get more information, and avoid being confused by the other links.

![Specific link details](/guide/lime-app/images/alignment_detail.png)

1. **Link-quality value** in dBm (decibel-milliwatts).
2. **Signal-read-out speaker.** A voice reads out the current signal. It is useful while aligning: you can hear the value without looking at the screen. Enable or disable it from the same icon 🔈/🔇.
3. **Coloured reference line** for link quality.
   ![Quality colour scale](/guide/lime-app/images/alignment_color_scale.png)
4. **The radio from which the base node is pointing.**
5. **The name of the node you are aligning against** and the radio it is on.
6. Best signal. Shows the best alignment achieved, with a seconds reference.

To return to the main alignment screen, use the back button in the upper-left corner:

![Back button](/guide/lime-app/images/alignment_back_button.png)

## When no possible link is found

If the base node does not see any signal on one of its radios, the screen reads «This radio is not linked to other nodes»:

![No link found](/guide/lime-app/images/alignment_no_link.png)

## When a link loses signal

The following information is displayed:

![Lost link](/guide/lime-app/images/alignment_lost.png)

📌 For more information and recommendations, see [Aligning antennas of a LibreRouter with LimeApp](/guide/lime-app/aligning-antennas).

---

> **Attribution.** Translated from [«Alineación»](https://conectividad.altermundi.net/documentacion/usar-lime-app1-4/un-paseo-por-el-menu-1-4/alineacion/) by [AlterMundi](https://altermundi.net/), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
