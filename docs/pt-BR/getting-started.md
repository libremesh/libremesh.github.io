---
title: "Primeiros passos"
---
# Primeiros passos

## Instalação

### Requisitos
Consulte a [Tabela de hardware (Table of Hardware)](https://toh.openwrt.org) para ver se o seu dispositivo é compatível com o OpenWrt.

::: tip NOTA
Recomenda-se que o roteador tenha **pelo menos**:
  - 16 MB de memória flash e 128 MB de RAM.
  - 1 rádio funcionando em 2,4 GHz e 1 em 5 GHz

É possível instalar o LibreMesh em roteadores com 8 MB de flash e 64 MB de RAM    
Leia o [`8/64 warning`](https://openwrt.org/supported_devices/864_warning) do OpenWrt e consulte a página [seleção de pacotes (em)](/guide/packages-selection) para personalizar a compilação.  
:::

::: warning ATENÇÃO
Certifique-se de ter lido a página da wiki do OpenWrt sobre o seu dispositivo.    
Leia as instruções de instalação e verifique se você tem o hardware necessário — se for o caso — para instalar o firmware, como um [adaptador USB-UART/Serial](https://openwrt.org/docs/guide-user/installation/generic.flashing.serial) e/ou um
[adaptador USB-JTAG](https://openwrt.org/docs/techref/hardware/port.jtag)
:::

### Baixar o firmware
---

**Firmware Selector**   
O Firmware Selector solicita uma compilação de firmware através de uma instância do [`ASU`](https://github.com/openwrt/asu) (ImageBuilder online).

https://firmware-selector.libremesh.org

---

**Versões pré-compiladas**    
Arquivo de releases antigas com firmwares pré-compilados via Buildroot.

https://firmware-libremesh.antennine.org

---

**Compile o LibreMesh no seu host**    
Consulte a página [`Compilar o LibreMesh` (em)](/build/) para ver as instruções de como compilar o LibreMesh no seu host.

---

### Instalar o firmware
Instale o firmware no seu dispositivo seguindo o método de instalação indicado na [wiki do OpenWrt](https://openwrt.org)
ou, se não estiver lá, procure as instruções na mensagem de **`git-commit`** deixada por quem adicionou o suporte para aquele modelo de dispositivo. Veja a [Tabela de hardware](https://toh.openwrt.org).

::: tip NOTA
Se o seu dispositivo estiver rodando o firmware de fábrica, é recomendado **instalar o OpenWrt primeiro**:
:::

1. Baixe o firmware `stable` mais recente para o seu dispositivo no [`OpenWrt Firmware Selector`](https://firmware-selector.openwrt.org).    
   Use a imagem `factory` para a primeira instalação. Consulte [Factory Install: First Time Installation (em)](https://openwrt.org/docs/guide-quick-start/factory_installation):
2. Verifique se o dispositivo com OpenWrt inicializa e funciona corretamente.    
   Atenção: por padrão, o OpenWrt não liga o Wi-Fi.    
   Ligue-o pelo `LuCI` no menu `Network` / `Wireless`.
3. Atualize para o LibreMesh usando uma imagem `squashfs-sysupgrade.bin`:
    - Envie o firmware pela interface web `LuCI` no menu `System` / `Backup / Flash Firmware`.
    - Ou instale via SSH usando o comando `sysupgrade -n firmware.bin`.


## Conectando ao roteador
O roteador pode ser acessado pela web em http://thisnode.info.    
Veja a página [Conectando ao roteador (em)](/guide/connecting) para opções detalhadas e solução de problemas.


## Configuração
O LibreMesh vem com um [sabor padrão (em)](/reference/flavors) que funciona out of the box, sem precisar de configuração manual.

Veja a página de [configuração (em)](/reference/configuration) para opções detalhadas.


## Manutenção
Instale versões estáveis mais recentes do OpenWrt para manter o dispositivo atualizado:
- Inscreva-se na newsletter [`OpenWrt Announce`](https://lists.openwrt.org/mailman/listinfo/openwrt-announce).
- Ou siga o [`OpenWrt Announcement-Bot`](https://social.tchncs.de/@openwrt) no Mastodon.

Veja a página [Atualizar (em)](/guide/upgrade) para operações recomendadas com o LibreMesh.
