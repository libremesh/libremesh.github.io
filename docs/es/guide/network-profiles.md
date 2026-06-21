---
title: "Perfiles de red"
---
# Perfiles de red

## O que é um Perfil de Rede?

Perfis de rede são a forma mais conveniente para uma comunidade organizar seus arquivos de configuração. Durante o [processo de compilação](/build/buildroot), os usuários podem selecionar o perfil de rede desejado, que selecionará automaticamente todo o software necessário e incluirá os arquivos de configuração para essa comunidade.

Eles estão organizados em pastas com algum conteúdo no [repositório de perfis de rede](https://github.com/libremesh/network-profiles).

## Como criar um Perfil de Rede

Praticamente, cada comunidade pode criar uma pasta no [repositório de perfis de rede](https://github.com/libremesh/network-profiles) com o nome da comunidade e, dentro dela, criar um ou mais perfis (por exemplo, você pode ter perfis diferentes para nós do backbone ou para pontos de acesso, ou para nós com memória flash ou RAM grande ou pequena).

Você precisará criar um usuário no GitHub, fazer um fork do [repositório de perfis de rede](https://github.com/libremesh/network-profiles), clonar seu fork em um computador, criar os diretórios, criar um `Makefile` (veja abaixo), adicionar conteúdo na pasta `root/` (veja abaixo), confirmar as alterações, enviá-las para seu fork e finalmente abrir um pull request do seu repositório para o [repositório oficial de perfis](https://github.com/libremesh/network-profiles).

### Clonando seu fork

Aqui omitiremos a explicação da maioria dos passos relacionados com git e GitHub; pesquise na internet como realizá-los ou nos pergunte nos [canais de comunicação do projeto](/communication).

Depois de fazer fork do [repositório de perfis de rede](https://github.com/libremesh/network-profiles) com seu usuário, clone seu fork:

``` sh
git clone git@github.com:seu_usuario/network-profiles.git
```

### Criando os diretórios

Cada comunidade terá que criar seu diretório.

``` sh
cd network-profiles
mkdir MinhaRede.cool
```

E dentro desse diretório, você terá que criar uma pasta para cada perfil diferente que desejar ter. A maioria das comunidades terá apenas um perfil.

``` sh
cd MinhaRede.cool
mkdir padrao
mkdir baixamem
mkdir gateway
```

### Criando um Makefile

Os Perfis de Rede são convertidos em pacotes que, como mencionado acima, incluirão alguns arquivos mas também podem selecionar um novo software para ser instalado como dependência. Para compilá-los como pacotes, é necessário um Makefile.

No Makefile você pode indicar uma descrição e incluir uma lista de dependências, que são os pacotes selecionados ao escolher seu perfil de rede.

O Makefile para o repositório de perfis de rede deve estar dentro do diretório do perfil, por exemplo `network-profiles/MinhaRede.cool/padrao/Makefile`, e terá o seguinte aspecto:

``` makefile
include $(TOPDIR)/rules.mk

PROFILE_DESCRIPTION:=Perfil padrão para a comunidade MinhaRede
PROFILE_DEPENDS:=+lime-proto-babeld +lime-proto-batadv +lime-proto-anygw

include ../../profile.mk

# call BuildPackage - Assinatura do buildroot do OpenWrt
```

e as linhas que você deve personalizar são apenas as de PROFILE_DESCRIPTION e PROFILE_DEPENDS. Na lista de PROFILE_DEPENDS, observe que o nome de cada pacote é precedido por um `+`. Não há necessidade de especificar o pacote `lime-system` pois já está incluído.

### Adicionando arquivos à pasta "root"

Para incluir arquivos personalizados na imagem compilada, você pode criar uma pasta `root/` na pasta do perfil, por exemplo `network-profiles/MinhaRede.cool/padrao/root/`. Neste diretório, você terá que criar a estrutura de pastas e os arquivos que deseja ter no firmware compilado.

O que é sempre interessante incluir é um arquivo `lime-community`, que é o arquivo contendo as opções de configuração para sua comunidade. Este arquivo precisará aparecer na imagem do firmware em `/etc/config/lime-community`, para que você precise criá-lo aqui em `network-profiles/MinhaRede.cool/padrao/root/etc/config/lime-community`.

<!-- As opções que não são definidas no arquivo lime-community são obtidas do lime-defaults. Para mais informações sobre isso, leia a [documentação no site](docs/en_config.html). -->

### Alternativa ao uso de Perfis de Rede

Usar um perfil de rede é uma forma conveniente de compartilhar arquivos pela internet com todos os outros membros de sua comunidade; mas pode ser exagerado se você só quer testar adicionando um arquivo de vez em quando.

No buildroot (que é o sistema que você pode usar para compilar o LibreMesh conforme descrito na [página de desenvolvimento](/build/buildroot)) você pode criar um diretório chamado `files`, e o conteúdo deste diretório sobrescreverá, na imagem final do LibreMesh, todos os arquivos com o mesmo caminho e nome, incluindo os do Perfil de Rede selecionado.

Por exemplo:
``` sh
cd openwrt
mkdir files
rsync -aPh --delete ~/network-profiles/valsamoggia.ninux.org/vs-ninux-generic/root/ files/
```
