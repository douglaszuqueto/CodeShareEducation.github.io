---
layout: post
title: "Versionamento com Git"
date: 2016-12-29 12:00:00 # COLOQUE DATA E HORA NESSE MESMO FORMATO
author: mcqueide # CASO NÃO TENHA PERFIL DE AUTOR CADASTRADO DEIXE O VALOR PADRÃO OU COM O NOME DO SEU PERFIL DE AUTOR
image: '/assets/img/' # DEIXE ASSIM COMO PADRÃO
description: 'Aprendendo versionamento com Git' # PEQUENA DESCRIÇÃO SOBRE O POST - DEVE SER O MESMO DO twitter_text POR ISSO DEVE SER CURTO
tags: # DÊ PREFERÊNCIA PARA TAGS QUE JÁ EXISTAM
- controle de versão
- git
categories: # DÊ PREFERÊNCIA PARA CATEGORIAS QUE JÁ EXISTAM E USE APENAS UMA - EXCETO CASOS RAROS
- Controle de Versão
twitter_text: 'Aprendendo versionamento com Git' # MESMO TEXTO DA description
---
## Sumário
  * [Introdução](#introduo)
  * [Dando os primeiros passos com GIT](#dando-os-primeiros-passos-com-git)
  * [Começando trabalhar com repositório remoto](#comeando-trabalhar-com-repositrio-remoto)
  * [Trabalhando com branchs](#trabalhando-com-branchs)
  * [Retornando conteúdo da branch de desenvolvimento para a master](#retornando-contedo-da-branch-de-desenvolvimento-para-a-master)
  * [Conclusão](#concluso)

## Introdução

TODO: Falta pegar o texto que está na empresa

## Dando os primeiros passos com GIT

Depois de ter realizado nosso primeiro commit, vamos realizar uma alteração no nosso arquivo local, adicionamos um título nesta página.

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>Treinamento GIT</title>
</head>
<body>

  <h1>Treinamento GIT</h1>

</body>
</html>
{% endhighlight %}

Com isso vamos realizar mais um commit, dessa vez vamos utilizar o parâmetro -am já adicionando todos os arquivo e passando a mensagem já na operação de commit, mas antes vamos verificar o estado do nosso repositório com o `git status`:

{% highlight shell %}
$ git status

No ramo master
Changes not staged for commit:
  (utilize "git add <arquivo>..." para atualizar o que será submetido)
  (utilize "git checkout -- <arquivo>..." para descartar mudanças no diretório de trabalho)

	modified:   index.html

nenhuma modificação adicionada à submissão (utilize "git add" e/ou "git commit -a")
{% endhighlight %}

Dessa vez percebemos que o estado do nosso arquivo está `modified` já que ele foi modificado. Vamos realizar o commit:

{% highlight shell %}
$ git commit -am "Adicionado título na página"

[master 2d1a2cf] Adicionado título na página
 1 file changed, 2 insertions(+)
{% endhighlight %}

> Perceba que o `git commit -am "mensagem"` é o mesmo que estivéssemos executando `git add --all` e depois o `git commit -m "mensagem"` em seguida.

## Começando trabalhar com repositório remoto

Se executarmos o `git log` veremos todos os commits realizados. Porém tudo as tarefas realizadas ainda estão apenas em nosso computador, como outros usuários irão colaborar com o nosso projeto? O git trabalha de duas forma, com o repositório local, e com o remoto. O local como dá-se a entender, está disponível apenas em sua máquina, o remoto fica disponível para a rede, onde qualquer usuário que tenha permissão de acesso podem obter ou enviar cópias de seus arquivos, deixando disponível para todos.

Existem alguns repositórios livres na internet para que você possa submeter seus arquivos, um bastante famoso é o [Git Hub](http://github.com), ele é um repositório livre e grátis, na forma grátis você tem um limite de espaço e seu repositório fica aberto para todos da comunidade verem, e se tiver interesse, tem opção de adicionar colaboradores para o seu projeto, dando assim permissão que outros contribuam com seu projeto. A versão paga, garante uma privacidade dos seus fontes e um espaço maior de repositório.

![Criando novo repositório no Git Hub][new-repository]
Criando um novo repositório
[new-repository]: ../assets/img/post-git/create-new-repository-github.png "Novo reposiorio git"

Nesse material faremos uso do Git Hub, mas sinta-se livre para utilizar qualquer outro repositório remoto da sua preferência. Primeiro passo, crie uma conta se você ainda não tiver e depois um repositório treinamentoGIT, agora vamos enviar nossas modificações para nosso repositório remoto, para isso vamos adicionar esse repositório remoto no nosso repositório local. Para isso vamos executar primeiramente o comando `git remote`, que mostra os repositórios remotos em nossa máquina. Como ainda não temos nenhum, nada irá aparecer. Então vamos adicionar o primeiro:

![Obtendo URL do repositório GitHub][url-github]
Obtendo URL do repositório GitHub
[url-github]: ../assets/img/post-git/create-new-repository-github.png "Novo reposiorio git"

{% highlight shell %}
$ git remote add origin http://github.com/seu_usuario_no_github/treinamentoGIT.git
{% endhighlight %}

> O `origin` no comando é o nome que estamos dando para esse repositório remoto, a `url` em seguida é o endereço do nosso repositório remoto.

Feito isso se executarmos o comando `git remote` novamente veremos que aparece um repositório `origin` na nossa linha de comando:

{% highlight shell %}
$ git remote

origin
{% endhighlight %}

Agora que adicionamos um repositório remoto, podemos enviar nosso código para esse repositório com o comando git push. Como será nosso primeiro envio devemos informar para qual repositório remoto e qual branch estamos enviando os arquivos. Para isso usamos o comando `git push origin master`. Depois de executar o comando o git perguntará qual seu usuário e senha desse repositório remoto.

> Para ficar bem claro o `origin` é o nome do repositório remoto que adicionamos, o `master` é o nome da branch.

{% highlight shell %}
$ git push origin master

Username for 'http://github.com': digite_seu_usuário
Password for 'http://seu_usuario@github.com’:
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 555 bytes | 0 bytes/s, done.
Total 6 (delta 1), reused 0 (delta 0)
To http://github.com/treinamentoGIT.git
 * [new branch]      master -> master
{% endhighlight %}

Nós fizemos o cenário de quando criamos nosso repositório local e enviamos ele para um repositório remoto, mas e se formos colaborar com um projeto já existente, que já possua um repositório remoto? Então o primeiro passo será obter ele. Para fazermos isso, basta ir para um diretório que achar mais conveniente e executar o comando `git clone`. Com isso o git irá criar um repositório local na sua máquina com todos os arquivos e histórico de modificações (log) desse repositório.

![Como clonar repositório GitHub][url-github-clone]
Como clonar repositório GitHub
[url-github-clone]: ../assets/img/post-git/how-to-clone-git-repository.png "Como clonar repositório GitHub"

{% highlight shell %}
$ git clone http://github.com/treinamentoGIT.git
  Cloning into 'treinamentoGIT'...
  Username for 'http://github.com': seu_usuario
  Password for 'http://seu_usuario@github.com':
  remote: Counting objects: 6, done.
  remote: Compressing objects: 100% (4/4), done.
  remote: Total 6 (delta 1), reused 0 (delta 0)
  Unpacking objects: 100% (6/6), done.
  Checking connectivity... done.
{% endhighlight %}

## Trabalhando com branchs

Quando trabalhando com versionamento de controle, normalmente isolamos nossa linha de desenvolvimento da linha de produção, branch master, que é uma linha onde as funcionalidades já estão implementadas completamente. Por isso é comum criarmos uma branch para que sirva para o desenvolvimento de funcionalidades enquanto as mesmas não estão finalizadas. Para isso vamos criar uma nova branch desenvolvimento, primeiro vamos visualizar as branchs locais em nossa máquina com o comando `git branch`, o git irá responder que temos apenas a branch master. Para criamos uma nova branch execute:

{% highlight shell %}
$ git branch desenvolvimento
{% endhighlight %}

Ao executar novamente `git branch`, agora é retornado as branchs master e desenvolvimento, e o git ainda informa qual branch está em uso no momento destacando ela com um asterisco.

{% highlight shell %}
$ git branch

desenvolvimento
* master
{% endhighlight %}

Para mudarmos para nossa branch de desenvolvimento devemos executar o comando `git checkout desenvolvimento`. Depois disso já estaremos na nossa outra branch.

> Normalmente quando criamos uma branch queremos mudar para ela logo em seguida. podemos fazer isso com o comando `git checkout -b desenvolvimento`

Agora vamos continuar nosso trabalho. Na nossa linha de desenvolvimento, vamos alterar nosso arquivo de index.html, adicionando um novo parágrafo `<p>Começando o desenvolvimento na branch de desenvolvimento</p>`:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>Treinamento GIT</title>
</head>
<body>

  <h1>Treinamento GIT</h1>

  <p>Começando o desenvolvimento na branch de desenvolvimento</p>

</body>
</html>
{% endhighlight %}

Vamos realizar o commit e enviar as alterações para nosso repositório.

{% highlight shell %}
$ git add index.html
$ git commit -m "Criando a branch de desenvolvimento"
  [master 7dd7472] Criando a branch de desenvolvimento
   1 file changed, 4 insertions(+), 2 deletions(-)
$ git push origin desenvolvimento
  Username for 'http://github.com': user_name
  Password for 'http://user_name@github.com':
  Total 0 (delta 0), reused 0 (delta 0)
  remote:
  remote: To create a merge request for desenvolvimento, visit:
  remote:   http://github.com/treinamentoGIT/merge_requests/new?merge_request%5Bsource_branch%5D=desenvolvimento
  remote:
  To http://github.com/treinamentoGIT.git
   * [new branch]      desenvolvimento -> desenvolvimento
{% endhighlight %}

Feito isso, o git cria nossa nova branch, desenvolvimento, no repositório remoto juntamente com o commit realizado. Vamos realizar um `git pull` para atualizar nosso repositório e verificar se o git realmente criou nossa branch remota. Ao realizar o comando o git informa que não sabe a qual branch no repositório remoto se refere a nossa branch de desenvolvimento local.

{% highlight shell %}
$ git pull
  Username :
  Password :
  There is no tracking information for the current branch.
  Please specify which branch you want to merge with.
  See git-pull(1) for details.

    git pull <remote> <branch>

  If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> master
{% endhighlight %}

Para corrigirmos isso podemos vincular nossa branch de desenvolvimento a nossa branch de desenvolvimento no repositório remoto.

{% highlight shell %}
$ git push -u origin desenvolvimento
  Username :
  Password :
  Branch desenvolvimento set up to track remote branch desenvolvimento from origin.
  Everything up-to-date
{% endhighlight %}

Com isso o git informa que nossa branch desenvolvimento local está track com a branch remota desenvolvimento, e agora podemos realizar o comando git pull livremente.

Agora, e se tivermos uma branch no repositório remoto que não temos no nosso local, se executarmos o `git branch nome_da_branch` ou `git branch -b nome_da_branch`, estaremos apenas criando uma branch no nosso repositório local e o git em momento nenhum saberá que ela deveria estar ligada a alguma branch remota.

Para criarmos uma branch local que esteja relacionado com uma branch remota devemos executar o comando `git branch -t nome_da_branch origin/nome_da_branch_remota`.

Para fazermos o teste vamos para um outro diretório qualquer, por exemplo /tmp, e faça o clone do seu projeto, depois execute o comando `git branch` para visualizar quais branchs locais estão nesse repositório, feito isso execute o comando `git branch -r` para verificar as branchs remotas. Então após feito isso, vamos criar nossa branch local apontando para nosso repositório remoto `origin` e para a branch `desenvolvimento`.

{% highlight shell %}
/tmp $ git clone http://github.com/treinamentoGIT.git
$ cd treinamentoGIT
/tmp/treinamentoGIT $ git branch
  * master
/tmp/treinamentoGIT $ git branch -r
    origin/HEAD -> origin/master
    origin/desenvolvimento
    origin/master
/tmp/treinamentoGIT $ git branch -t desenvolvimento origin/desenvolvimento
  Branch desenvolvimento set up to track remote branch desenvolvimento from origin.
/tmp/treinamentoGIT $ git branch
    desenvolvimento
  * master
{% endhighlight %}

## Retornando conteúdo da branch de desenvolvimento para a master

Nós finalizamos, e agora como retornar o conteúdo da branch desenvolvimento para nossa branch master? Para realizarmos isso teremos que primeiro ir para nossa branch master e atualizar ela. Isso é necessário quando estamos desenvolvendo com outras pessoas num mesmo repositório, então nossa master local pode estar desatualizada em relação a master remota, além disso temos que trazer os novos commits  realizados nela para nossa branch desenvolvimento também de forma que ela fique sincronizada com a master antes de realizarmos a operação de merge.

Primeiro vamos mudar para nossa branch master com o `git checkout master`, depois atualizamos ela com o `git pull`. Feito isso, temos que atualizar nossa branch de desenvolvimento como o novo conteúdo da master, para realizar isso temos duas opções, podemos fazer uso do `git merge`, porém com ele poderemos sujar nosso histórico de modificações com uma operação a mais de merge caso haja algum conflito de arquivos, então a forma mais indicada é utilizar o `git rebase`, com ele conseguiremos fazer a atualização da nossa branch de desenvolvimento sem a necessidade de um commit de merge. Depois temos que voltar para nossa branch master para realizar o merge da branch de desenvolvimento, dessa vez não haverá conflitos porque nossa branch de desenvolvimento já está com todos os commits da master, por causa do rebase. Feito o merge, só nos falta realizar o `git push` para enviar as atualização da master local para a remota.

{% highlight shell %}
$ git checkout master
  Switched to branch 'master'
  Seu ramo está à frente de 'origin/master' por 1 submissão.
    (use "git push" to publish your local commits)
$ git pull
  Username for 'http://github.com': seu_usuario
  Password for 'http://seu_usuario@github.com':
  Already up-to-date.
$ git checkout desenvolvimento
  Switched to branch 'desenvolvimento'
  Your branch is up-to-date with 'origin/desenvolvimento'.
$ git rebase master desenvolvimento
  First, rewinding head to replay your work on top of it...
  Fast-forwarded desenvolvimento to master.
$ git checkout master
  Switched to branch 'master'
  Seu ramo está à frente de 'origin/master' por 1 submissão.
    (use "git push" to publish your local commits)
$ git merge desenvolvimento
  Already up-to-date.
$ git push
  Username for 'http://github.com': seu_usuario
  Password for 'http://seu_usuario@github.com':
  Total 0 (delta 0), reused 0 (delta 0)
  To http://github.com/desenvolvimento/treinamentoGIT.git
     2d1a2cf..7dd7472  master -> master
{% endhighlight %}

## Conclusão

Esse material apresentou algumas operações básicas do Git, mostrando como manter um repositório local e remoto. Para não estendê-lo tanto, teremos a continuação dele em um próximo post, onde abordaremos alguns outros cenários, como escrita concorrente em um mesmo arquivo e até mesmo no mesmo trecho do arquivo, realizando assim as famosas e temidas operações de merge.
