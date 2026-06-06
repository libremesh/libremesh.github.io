# Atualização

::: tip CUIDADO
De tempos em tempos, pode acontecer de alguns dispositivos OpenWrt encontrarem problemas ao atualizar e ficarem "travados" ou "travados parcialmente"
Certifique-se de ter **lido as notas de lançamento do OpenWrt** para a `versão`/`branch` que está instalando.   

Em **ambientes de produção com múltiplos nós LibreMesh** implantados, é recomendável manter pelo menos um dispositivo, para cada modelo que você está usando, para testar se as atualizações estão ok. Ou eventualmente recuperá-lo usando um `Adaptador USB Serial`.
:::

Consulte a wiki do OpenWrt para obter detalhes sobre o processo de atualização:
- [Sysupgrade](https://openwrt.org/docs/techref/sysupgrade)
- [Atualizando firmware OpenWrt usando LuCI e CLI](https://openwrt.org/docs/guide-user/installation/generic.sysupgrade)
- [Preservando configurações OpenWrt durante a atualização do firmware](https://openwrt.org/docs/guide-quick-start/admingui_sysupgrade_keepsettings)


## Sysupgrade
O comando padrão do OpenWrt `sysupgrade` preserva:
- arquivos definidos em `/lib/upgrade/keep.d`
- a lista de `conffiles` (arquivos de configuração definidos por certos pacotes) que foram alterados:
  - Veja a lista completa para `apk` com `cat /lib/apk/packages/*.conffiles`
  - Veja a lista completa para `opkg` com `cat /usr/lib/opkg/info/*.conffiles`

Os arquivos iniciais são preservados em `/rom/` e os arquivos alterados são criados em `/overlay/upper/`.

```
apk add diffutils
diff /overlay/upper/etc/config/babeld /rom/etc/config/babeld
```


## Exemplos

### Atualizar para uma nova versão principal do OpenWrt
Exemplo que mantém apenas `lime-node` e `dropbear`.

Substitua a lista de arquivos a serem preservados mantendo apenas os essenciais.
Recomendado se toda a configuração estiver no `lime-node`.
```
mkdir /tmp/keep.d; mv /lib/upgrade/keep.d/* /tmp/keep.d/
mv /usr/lib/opkg/status /tmp/opkg_status
for i in /etc/config/dropbear /etc/dropbear /etc/config/lime-node; do echo $i >> /etc/sysupgrade.conf; done
sysupgrade -l
```

Baixe o arquivo sysupgrade
```
wget -O /tmp/firmware.bin <arquivo_sysupgrade>
```
a url do arquivo de atualização é por exemplo https://sysupgrade-01.antennine.org/store/45347ae7f75029abc37f0a4e41ebf9af72ef7b9ce8c93ff27a7d7ec5e9a54b2e/openwrt-25.12.0-82ccd0311e22-mediatek-filogic-cudy_wr3000s-v1-squashfs-sysupgrade.bin

Atualize o roteador
```
sysupgrade -v /tmp/firmware.bin
```

## Ferramentas
Ferramentas para atualizar a versão base do OpenWrt e os pacotes LibreMesh:

### eupgrade
fornece atualizações semi-automatizadas verificando se um novo firmware está disponível em um servidor https.

### owut
fornece atualizações usando uma instância de [`ASU`](https://github.com/openwrt/asu) (imagebuilder online). Teste instalando o pacote `profile-antennine.org-an-lime-owut`

### safe-upgrade
Wrapper ao redor de `sysupgrade`. Requer armazenamento flash grande, pelo menos o dobro do tamanho do firmware, para reverter em caso de algo não funcionar.
