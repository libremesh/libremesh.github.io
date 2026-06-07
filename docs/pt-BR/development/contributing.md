---
title: "Contribuindo"
---
# Contribuindo

Ao contribuir para este repositório, por favor discuta primeiro a alteração que você deseja fazer via issue,
e-mail ou qualquer outro método antes de fazer uma alteração. 

Por favor, note que temos um código de conduta, por favor siga-o em todas as suas interações com o projeto.

## Forks e Pull Requests

O desenvolvimento no lime-packages segue o método Fork e Pull Request popularizado pelo GitHub:

- Cada colaborador tem sua própria cópia completa, chamada de *Fork*
- Colaboradores implementam funcionalidades ou corrigem bugs em seu próprio fork em um branch de funcionalidade.
- Quando o colaborador deseja integrar suas alterações de volta ao repositório principal,
  criará um *Pull Request*.

Cada um desses passos será discutido por sua vez:

#### Forking

A primeira coisa que você precisará para desenvolver é criar uma nova cópia do repositório para
trabalhar. Isso é conhecido como "Forking" e é uma característica definidora de sistemas
SCM distribuídos: cada pessoa trabalha em sua própria cópia completa do repositório. O Git é projetado para
tornar trivial manter esses repositórios sincronizados passando revisões assinadas entre as
cópias individuais.

Para criar um fork:

1. Faça login no GitHub e vá para o [repositório GitHub do lime-packages](https://github.com/libremesh/lime-packages).

2. Clique em "Fork". Você deve ser redirecionado para uma cópia completa do repositório que agora reside em sua conta.

3. Em sua estação de trabalho, crie um clone do repositório Git:
    ```git clone git@github.com:<seu-nome-de-usuario>/lime-packages.git```
    Isso criará mais uma cópia completa do repositório: uma que residirá
    em sua estação de trabalho.

4. Faça checkout do branch `master`.
   ```git checkout master```

### Branching

Quaisquer alterações feitas na base de código do lime-packages devem ser feitas em seu próprio branch. O branch
deve ser criado a partir da ponta do `master`, que é o branch de desenvolvimento. Antes de começar
qualquer trabalho, certifique-se de buscar as últimas alterações upstream do repositório.
Fazer isso garantirá que você tenha uma cópia atualizada do `master`, que alterações feitas por outros
não serão perdidas, e também reduzirá as chances de conflitos quando chegar a hora de mesclar as
alterações de volta ao lime-packages.

#### Nomes de Branches

Existe apenas um branch principal:

- `master`: este branch é a versão de trabalho que está atualmente em desenvolvimento. Todos
    os novos branches de funcionalidade devem ser criados a partir da ponta do `master` e todos os PRs devem ter `master`
    definido como destino.

Para quaisquer novos branches de funcionalidade, a convenção de nomenclatura recomendada é:

### `<tipo>/<nome>`

#### `<tipo>`
```
issue     - Alterações de código vinculadas a um problema conhecido.
feature   - Nova funcionalidade.
hotfix    - Correções rápidas na base de código.
sandbox   - Experimentos (nunca serão mesclados).
```

#### `<nome>`
Sempre use traços para separar palavras, e mantenha curto.

##### Exemplos
```
issue/133
feature/smonit
hotfix/driver-xxx
sandbox/new-crazy-thing
```

#### Fluxo de trabalho geral

O fluxo de trabalho geral para branching é o seguinte:

1. Busque as alterações mais recentes de `upstream` (ou seja, do repositório principal):

   ```git fetch upstream master```

2. Faça checkout da sua cópia de `master` e mescle as alterações upstream:

     ```git checkout master```
     
     ```git merge upstream/master```

     Agora você tem uma cópia atualizada do branch `master`.

3. Crie um novo branch para suas alterações:

     ```git checkout -b <nome do branch>```

4. Execute os testes: leia a [[documentação de testes](testing)].

5. Faça suas alterações, recomendamos tentar adicionar um teste.

6. Certifique-se de que os testes continuem sendo executados com sucesso.

7. Envie as alterações para `origin` (ou seja, seu fork)

     ```git push origin <nome do branch>```

8. Crie um novo Pull Request (veja abaixo).

#### Criando um Pull Request

Para integrar suas alterações no repositório principal de lime-packages, você precisará
criar um *Pull Request* no GitHub.

1. Faça login no GitHub e vá para o seu fork de lime-packages.

2. Clique em "New Pull Request"

3. Certifique-se de que as seguintes propriedades estejam definidas:

    - Fork base = `libremesh/lime-packages`
    - Base = `master`
    - Fork de origem = seu fork de lime-packages
    - Comparar = o branch que você deseja mesclar

4. Adicione uma descrição do que é a alteração e clique em "Create Pull Request".

Neste ponto, é recomendável notificar um dos outros desenvolvedores do
pull request e pedir que eles realizem uma revisão rápida. Eles farão 
quaisquer comentários no próprio pull request, que você deve receber como notificações do GitHub ou como
e-mails.

Uma vez que o revisor tenha aprovado o pull request, e o GitHub tenha indicado que ele pode
ser mesclado automaticamente, você é livre para mesclar o pull request.

#### Lidando com conflitos

Às vezes, o GitHub relatará que o Pull Request não pode ser mesclado automaticamente,
o que geralmente significa que há conflitos de mesclagem.

Geralmente é uma boa ideia resolver os conflitos no branch em que você está trabalhando,
em vez de fazer isso no `master`.

Para fazer isso:

1. Obtenha as alterações mais recentes do branch upstream `master`

    ```git fetch upstream master```

2. Certifique-se de estar na sua branch de funcionalidade.

3. Mescle as alterações upstream no master. Você verá "mensagens de conflito"

    ```git merge upstream/master$$
     
4. Use uma ferramenta de mesclagem para resolver os conflitos. Se uma estiver configurada com o Git,
    executar `git mergetool` deve abri-la. Algumas ferramentas GUI como 
    [esta](https://git-scm.com/download/gui/linux) têm uma integrada.

5. Certifique-se de que a mesclagem foi bem-sucedida construindo e testando as alterações.

6. Confirme as alterações e envie para origin.

     ```git commit$$

     ```git push origin <branch>```

Se você já tiver um Pull Request pendente, o GitHub deve detectar as mudanças
recentes e indicar que o PR está pronto para ser mesclado.

### Mais informações

Para mais informações, consulte [Collaborating on projects using issues and pull requests](https://help.github.com/categories/collaborating-on-projects-using-issues-and-pull-requests/) no guia de ajuda do GitHub.
