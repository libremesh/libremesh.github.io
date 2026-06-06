# Guia de testes

O LibreMesh tem testes unitários que nos ajudam a adicionar novas funcionalidades mantendo o esforço de manutenção contido.

Encorajamos os colaboradores a escrever testes ao adicionar novas funcionalidades e também ao corrigir regressões.

Os testes unitários do LibreMesh são baseados na poderosa biblioteca [busted](https://lunarmodules.github.io/busted/) que tem uma documentação muito boa.

Os testes são executados dentro de uma imagem Docker x86_64 com algumas bibliotecas lua e openwrt disponíveis.

Também temos uma máquina virtual qemu para desenvolvimento, é uma imagem completa do libremesh que pode ser usada em desenvolvimento.

## Como executar os testes

Apenas execute `./run_tests`:
![run_tests](https://i.imgur.com/TBIE7Gp.png)


Isso irá construir automaticamente a imagem de teste do Docker na primeira execução e então executar os testes e criar o relatório de cobertura.    
Nota: você deve ter o Docker instalado e em execução.   
Nota: você deve executar os testes como `usuário não root`: para executar docker sem root adicione seu usuário no grupo docker, então reinicie o docker.service, e faça login novamente como seu próprio usuário.
```
su root
/sbin/groupadd docker
/sbin/usermod -aG docker $USER
systemctl restart docker
su - $USER
```
Verifique se o docker está funcionando, ele deve retornar sem erros e uma saída como a abaixo:
```
user@machine: docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Use `LUA_ENABLE_LOGGING=1 ./run_tests` se quiser enviar os logs para stdout.

## Estrutura do diretório de testes

O código lua do pacote `foo` deve estar na forma de *estrutura de árvore de arquivos expandida*:
`package/foo/files/usr/lib/lua/foo.lua`

Arquivos de teste vivem dentro de um diretório `tests` com seus nomes começando com `test_`: