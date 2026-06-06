---
aside: false
---

<script setup>
import { data as openwrt } from '/openwrt.data.js'
</script>

# Buildroot

[[toc]]

## Configuração do sistema de compilação
Consulte a wiki do OpenWrt [Configuração do sistema de compilação](https://openwrt.org/docs/guide-developer/toolchain/install-buildsystem)
para a lista de pacotes de outras distribuições Linux.

### Debian/Ubuntu/Mint
```sh
sudo apt update
sudo apt install build-essential clang flex bison g++ gawk \
gcc-multilib g++-multilib gettext git libncurses-dev libssl-dev \
rsync swig unzip zlib1g-dev file wget bzip2
```

## Download

### Clonar o código fonte do OpenWrt
Consulte a wiki do OpenWrt [Uso do sistema de compilação](https://openwrt.org/docs/guide-developer/toolchain/use-buildsystem).    
Execute todos os comandos acima como usuário normal (não use root).

::: code-group

```sh-vue [{{ openwrt.stable_version }}]
git clone -b v{{ openwrt.stable_version }} --single-branch https://github.com/openwrt/openwrt
cd openwrt
```

```sh-vue [{{ openwrt.oldstable_version }}]
git clone -b v{{ openwrt.oldstable_version }} --single-branch https://github.com/openwrt/openwrt
cd openwrt
```

:::

### Adicionar os feeds do LibreMesh
Copie o arquivo de repositórios padrão do OpenWrt e adicione os repositórios do LibreMesh

::: tip
Use `master` para compilar o código mais recente do LibreMesh (compatível com openwrt-24.10 ou mais recente)     
Use `2024.1` para compilar a versão mais recente do LibreMesh (compatível com openwrt-24.10 e openwrt-23.05)    
:::

::: code-group

```sh [master]
cp feeds.conf.default feeds.conf
cat << EOF >> feeds.conf
src-git libremesh https://github.com/libremesh/lime-packages.git;master
src-git profiles https://github.com/libremesh/network-profiles.git
EOF
```

```sh [2024.1]
cp feeds.conf.default feeds.conf
cat << EOF >> feeds.conf
src-git libremesh https://github.com/libremesh/lime-packages.git;v2024.1
src-git profiles https://github.com/libremesh/network-profiles.git
EOF
```

:::


### Baixar e instalar pacotes dos feeds
```sh
scripts/feeds update -a
scripts/feeds install -a
```


## Configuração

### Usando menuconfig
```
make menuconfig
```

![menuconfig1](/buildroot-menuconfig0.webp)

Consulte o `target`, `subtarget` e `profile` do seu roteador na [Tabela de Hardware do OpenWrt](https://toh.openwrt.org).

Selecione então:
- `Target System` - padrão `Mediatek ARM`
- `Subtarget` - padrão `Filogic`
- `Target Profile` - padrão `OpenWrt One`

#### Seleção de pacotes

##### Pacotes padrão
**Desselecione** pacotes conflitantes:

- `Sistema base` -> `< >` `dnsmasq`
- `Rede` -> `< >` `odhcpd-ipv6only`

Por padrão, o LibreMesh usa `dnsmasq-dhcpv6` em vez do `dnsmasq` padrão do OpenWrt e `odhcpd-ipv6only`.

**Desselecione** localizações de feeds errôneas:

- `Configuração da imagem` -> `Repositórios de feeds separados` -> `< >` `Habilitar feed libremesh` 
- `Configuração da imagem` -> `Repositórios de feeds separados` -> `< >` `Habilitar feed profiles`

Os pacotes do OpenWrt estão disponíveis no servidor de downloads https://downloads.openwrt.org.   
Remova os repositórios do LibreMesh desta lista, pois pacotes pré-compilados não estarão disponíveis lá.    
Pacotes pré-compilados do LibreMesh estão disponíveis em https://feed.libremesh.org/.    
Estes são instaláveis:
- diretamente no roteador através do gerenciador de pacotes
- via ImageBuilder durante a geração do firmware

##### Economizando espaço e RAM

Opcionalmente, **desselecione** pacotes não utilizados:
- `Rede` -> `< >` `ppp`
- `Rede` -> `< >` `ppp-mod-pppoe`
- `Módulos do Kernel` -> `Suporte de Rede` -> `< >` `kmod-ppp`
- `Módulos do Kernel` -> `Suporte de Rede` -> `< >` `kmod-pppoe`
- `Módulos do Kernel` -> `Suporte de Rede` -> `< >` `kmod-pppox`

Consulte [Seleção de pacotes](../guide/packages-selection#saving-space-and-ram) para uma lista de outros pacotes opcionalmente desselecionáveis.

##### Pacotes LibreMesh
**Selecione** (pressione espaço até que apareça um asterisco, como `<*>`) os pacotes LibreMesh:

![menuconfig1](/buildroot-menuconfig1.webp)

* `LibreMesh` → `Documentação offline` → `<*>` `lime-docs-minimal` (documentação mínima do LibreMesh)
* `LibreMesh` → `<*>` `lime-app` (LimeApp) **(opcional)**
* `LibreMesh` → `<*>` `lime-hwd-openwrt-wan` (Respeitar a interface wan do openwrt como padrão)
* `LibreMesh` → `<*>` `lime-proto-anygw` (Suporte ao protocolo anygw do LibreMesh)
* `LibreMesh` → `<*>` `lime-proto-babeld` (Suporte ao protocolo babeld do LibreMesh)
* `LibreMesh` → `<*>` `lime-proto-batadv` (Suporte ao protocolo batman-adv do LibreMesh)
* `LibreMesh` → `<*>` `shared-state`
* `LibreMesh` → `<*>` `shared-state-async` **(opcional)**
  * `<*>` `shared-state-babeld_hosts` (módulo babeld-hosts para shared-state)
  * `<*>` `shared-state-bat_hosts` (módulo bat-hosts para shared-state) **(opcional)**
  * `<*>` `shared-state-nodes_and_links` (módulo nodes_and_links para shared-state)
* `LibreMesh` -> `<*>` `babeld-auto-gw-mode`
* `LibreMesh` -> `<*>` `check-date-http` (Manter a data local não muito distante do desvio NTP) **(opcional)**
* `LibreMesh` -> `<*>` `Documentação offline` -> `lime-docs` (documentação completa do LibreMesh) **(opcional)**
* `LibreMesh` -> `<*>` `lime-debug` (ferramentas de debug do libremesh) **(opcional)**

Os **pacotes opcionais** são recomendados, mas não obrigatórios, para uma rede LibreMesh funcional.    
Considere evitar selecionar esses pacotes `apenas` se a imagem criada for muito grande e não couber na memória do roteador.

Adicionalmente e de forma opcional, httpS para a interface web pode ser habilitado selecionando (tenha cuidado que a interface web será exibida como *não confiável*):

- `Utilitários` -> `Criptografia` -> `<*>` `px5g-standalone`

Se você planeja usar malha 802.11s criptografada, precisa garantir que tenha o pacote `wpad-mesh-*`, não `wpad-basic-*`, onde `*` é `mbedtls`, `openssl` ou `wolfssl`. O OpenWrt desde a branch 23.05 usa `mbedtls` por padrão.
- `Rede` -> `WirelessAPD` -> `< >` `wpad-basic-mbedtls`
- `Rede` -> `WirelessAPD` -> `<*>` `wpad-mesh-mbedtls`

::: tip NOTA
Para ter pacotes adicionais, a maneira mais fácil é selecioná-los no menuconfig. Mais pacotes podem ser instalados posteriormente via `apk` ou o mais antigo `opkg`, mas alguns exigem uma configuração específica do kernel para estar em vigor. Isso pode ser conseguido seguindo [essas instruções adicionais sobre kernel vermagic](../development/hacking/kernel_vermagic.md) Esteja ciente de que isso aumentará notavelmente o tempo e o espaço de armazenamento necessários para a compilação.
:::

#### Salvar a configuração
Salve a configuração e saia.

#### Arquivos adicionais

Nesta etapa, há a possibilidade de incluir arquivos personalizados na imagem do firmware compilada. Para isso, você terá que criar, dentro do diretório `openwrt/`, um diretório `files/` contendo a estrutura de diretórios e os arquivos que deseja adicionar. Por exemplo, se quiser ter um arquivo `/etc/config/lime-community`, você deve fazer o seguinte:

``` sh
mkdir -p files/etc/config/
touch files/etc/config/lime-community
```

e depois editar o arquivo `lime-community` recém-criado incluindo seu conteúdo personalizado. Se um arquivo de um pacote tiver o mesmo nome e caminho que um arquivo neste diretório, ele será sobrescrito. Esta é uma maneira rápida de incluir um arquivo de configuração personalizado, sem a necessidade de criar um [perfil de rede](../guide/network-profiles) online.


##### Perfis de Rede
Se sua comunidade local tiver um perfil no [repositório de perfis de rede](https://github.com/libremesh/network-profiles/), você pode selecioná-lo em:

- LibreMesh -> perfil-de-rede -> perfil-sua_comunidade-seu_perfil

![menuconfig2](/buildroot-menuconfig2.webp)

::: tip NOTA
Os perfis de rede são a configuração específica das comunidades, e são armazenados neste repositório coletivo 
[repositório](https://github.com/libremesh/network-profiles/), mas também podem ser mantidos localmente, dependendo de como cada comunidade gerencia sua rede. Para mais instruções sobre como criar um perfil ou como usar um local, consulte a [página de perfis de rede](../guide/network-profiles).
:::


### Usando make defconfig

#### exportar target-subtarget para o ambiente
``` sh-vue
export TARGET=ath79
export SUBTARGET=generic
```

#### configuração

#### Configurações de target, subtarget e genéricas

```sh
cat << EOF > .config
CONFIG_TARGET_${TARGET}=y
CONFIG_TARGET_${TARGET}_${SUBTARGET}=y
CONFIG_TARGET_ROOTFS_INITRAMFS=y
CONFIG_TARGET_MULTI_PROFILE=y
CONFIG_TARGET_PER_DEVICE_ROOTFS=y
# CONFIG_FEED_libremesh is not set
# CONFIG_FEED_profiles is not set
CONFIG_IMAGEOPT=y
CONFIG_VERSIONOPT=y
CONFIG_KERNEL_BUILD_USER=\"builder\"
CONFIG_KERNEL_BUILD_DOMAIN=\"buildhost\"
# CONFIG_VERSION_CODE_FILENAMES is not set
EOF
make defconfig
```

#### Módulos do kernel (opcional)
Compile opcionalmente todos os módulos do kernel para expô-los posteriormente em um servidor http
Necessário para instalar, através do gerenciador de pacotes, pacotes que dependem de módulos de kernel não padrão.
```sh
cat << EOF >> .config
CONFIG_DEVEL=y
CONFIG_ALL_KMODS=y
CONFIG_ALL_NONSHARED=y
EOF
make defconfig
```

#### Perfil do roteador
Seleciona o perfil do roteador com base na string compatível:

```
echo "CONFIG_TARGET_DEVICE_ath79_generic_DEVICE_librerouter_librerouter-v1=y" >> .config
make defconfig
```

#### Pacotes LibreMesh
```sh
cat << EOF >> .config
# CONFIG_PACKAGE_dnsmasq is not set
# CONFIG_PACKAGE_odhcpd-ipv6only is not set
# CONFIG_PACKAGE_ppp is not set
# CONFIG_PACKAGE_ppp-mod-pppoe is not set
CONFIG_PACKAGE_kmod-ppp=m
CONFIG_PACKAGE_kmod-pppoe=m
CONFIG_PACKAGE_kmod-pppox=m
CONFIG_PACKAGE_profile-libremesh-suggested-packages=y
EOF
make defconfig
```

## Compilar o LibreMesh

Finalmente, compile as imagens
```sh
make -j$(nproc)
```
Consulte o OpenWrt [dicas para o make](https://openwrt.org/docs/guide-developer/toolchain/use-buildsystem#make_tips) para opções detalhadas.

Se tudo correr bem, você deverá encontrar os binários produzidos dentro do diretório `bin/`.

::: tip NOTA
Se após a compilação você não vir a imagem compilada na pasta `bin/targets/.../.../`, pode ser que seu roteador tenha uma memória flash tão pequena que os pacotes mencionados anteriormente não caibam nela (também pode acontecer com roteadores de 8 MB de memória flash ao selecionar pacotes muito grandes para incluir). Nesse caso, você pode remover a lista de pacotes gerada por `.config` e repetir a seleção de pacotes sem incluir `lime-app`. Se a imagem compilada ainda for muito grande, tente selecionar apenas `lime-proto-anygw`, `lime-proto-batadv` e `lime-proto-babeld` ou seguindo [este guia](https://openwrt.org/docs/guide-user/additional-software/saving_space).
:::

Consulte as páginas no **Guia de desenvolvimento** [testes](/development/testing) e [virtualização](/development/virtualizing)
para emular no seu computador com qemu.
