---
layout: post
title: "Versionamento com Git Parte 2"
date: 2017-02-12 13:40:21
author: mcqueide
image:
description: 'Aprendendo a versionar projetos com Git'
tags: # DÊ PREFERÊNCIA PARA TAGS QUE JÁ EXISTAM
- git
- versionamento
categories:
- Controle de versão
twitter_text: 'Aprendendo a versionar projetos com Git'
---

## Sumário
  * [Introdução](#introduo)
  * [Configurando chave SSH](#configurando-chave-ssh)
  * [Apresentando merge automático do Git](#Apresentando-merge-automtico-do-git)
  * [Trabalhando com branches](#trabalhando-com-branches)
  * [Retornando conteúdo da branch de desenvolvimento para a master](#retornando-contedo-da-branch-de-desenvolvimento-para-a-master)
  * [Conclusão](#concluso)

## Introdução

No post sobre git passado, abordamos muitas operações porém com cenários bem simples. Em nenhum deles tivemos alteração concorrentes por usuários diferentes em um mesmo arquivo. E isso é algo comum de acontecer em um ambiente de trabalho. Quando isso ocorre nem sempre a ferramenta consegue realizar os merges de forma automática, e essa tarefa acaba virando responsabilidade de quem está operando o repositório. Veremos como deixar essas tarefas mais fáceis.

Se você também está cansado de ficar digitando suas senhas toda vez que vai realizar um push, ensinaremos como utilizar as chaves ssh, onde antes de toda operação de push, o git irá procurar por ela e usá-la para sua autenticação no repositório remoto. Nesse material você aprenderá sobre os alias, chega de ficar digitando tantos comandos um atrás de outros para tarefas que você acaba tendo que executar várias vezes.

## Configurando chave SSH

Antes de configurarmos nossa chave ssh temos que criá-la primeiro, para isso execute o comando abaixo.

{% highlight shell %}
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  Generating public/private rsa key pair.
  Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
  Enter passphrase (empty for no passphrase): [Type a passphrase]
  Enter same passphrase again: [Type passphrase again]
{% endhighlight %}

E você pode verificar por possíveis chaves cadastradas com esse comando.

{% highlight shell %}
$ ls -al ~/.ssh
{% endhighlight %}

Depois de gerada a chave, visite seu github, e vá para a área de configuração, no menu lateral esquerdo ache o menu **SSH and GPG keys**, aperte o botão **New SSH key**, e cole sua chave que você vai obter através do comando:

{% highlight shell %}
$ cat ~/.ssh/id_rsa.pub
{% endhighlight %}

Pronto com isso você não terá que ficar digitando sua senha do Git toda vez que for realizar um push, a autenticação será baseada na sua chave ssh.

![Adicionando chave SSH](../assets/img/post-git/personal-settings.png "Adicionando chave SSH")

## Apresentando merge automático do Git

É muito comum termos várias pessoas trabalhando em um mesmo projeto, com isso ocorrerão vezes onde duas ou mais pessoas irão modificar um mesmo arquivo, quando isso ocorre o Git faz um processo de merge dessas modificações, pegando tanto as alterações do usuário A e do usuário B e juntado elas no mesmo arquivo.

Para demonstrar esse comportamento teremos dois usuários, mcqueide e macaulay trabalhando no mesmo repositórios, tanto usuário mcqueide quanto o macaulay irão realizar uma modificação no nosso arquivo index.html, e a ferramenta tratará esse merge de uma forma automática e inteligente.

Segue o arquivo atual no nosso repositório:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Treinamento GIT</title>
  </head>
  <body>
    <h1>Treinamento GIT</h1>
  </body>
</html>
{% endhighlight %}

O usuário mcqueide alterou o título da página para:

{% highlight html %}
...
<title>Treinamento Git</title>
...
{% endhighlight %}

Já o usuário macaulay alterou a tag h1 no corpo da página:

{% highlight html %}
...
<h1>Treinamento Git</h1>
...
{% endhighlight %}

Agora ambos irão enviar essas modificações para o servidor remoto. O primeiro a enviar é o usuário mcqueide, ele realiza o `git commit` e depois faz um `git push` no repositório. Para ele foi tudo ok, não houve nenhum problema. Depois o usuário macaulay decide enviar suas alterações também, ele realiza seu **commit** até aí tudo bem, porém quando ele tenta realizar o **push** acontece o seguinte:

{% highlight shell %}
$ git push origin master
  Username for 'https://github.com': macaulay1001
  Password for 'https://macaulay1001@github.com':
  To https://github.com/mcqueide/treinamentoGIT.git
   ! [rejected]        master -> master (fetch first)
  error: failed to push some refs to 'https://github.com/mcqueide/treinamentoGIT.git'
  dica: Updates were rejected because the remote contains work that you do
  dica: not have locally. This is usually caused by another repository pushing
  dica: to the same ref. You may want to first integrate the remote changes
  dica: (e.g., 'git pull ...') before pushing again.
  dica: See the 'Note about fast-forwards' in 'git push --help' for details.
{% endhighlight %}

O git informa que o push do macaulay foi rejeitado, isso porque sua cópia local está desatualizada em relação ao repositório remoto, pois tem um novo commit do usuário mcqueide, o próprio git já dá uma dica, solicitando que ele atualize seu repositório para que fique atualizado em relação ao repositório remoto, depois disso o macaulay realiza o pull e o git direciona ele para um arquivo de texto, apresentando uma tela em seu terminal para ele digitar uma mensagem de merge:

{% highlight shell %}
Merge branch 'master' of https://github.com/mcqueide/treinamentoGIT
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# No ramo master
#
# Submissão inicial.
#
# Mudanças a serem submetidas:
#       new file:   index.html
#
{% endhighlight %}

> Não é necessário apagar as linhas que estão comentadas com #, porque elas não irão para sua mensagem de commit.

Feito isso o git já informa que foi realizado um merge automático e ele realiza novamente o comando `git push` e agora seu push é aceito.

{% highlight shell %}
$ git pull
  remote: Counting objects: 3, done.
  remote: Compressing objects: 100% (1/1), done.
  remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
  Unpacking objects: 100% (3/3), done.
  From https://github.com/mcqueide/treinamentoGIT
     23b5a50..27ee314  master     -> origin/master
  Mesclagem automática de index.html
  Merge made by the 'recursive' strategy.
   index.html | 2 +-
   1 file changed, 1 insertion(+), 1 deletion(-)

$ git push origin master
  Username for 'https://github.com': macaulay1001
  Password for 'https://macaulay1001@github.com':
  Counting objects: 6, done.
  Delta compression using up to 4 threads.
  Compressing objects: 100% (4/4), done.
  Writing objects: 100% (6/6), 589 bytes | 0 bytes/s, done.
  Total 6 (delta 2), reused 0 (delta 0)
  remote: Resolving deltas: 100% (2/2), completed with 1 local objects.
  To https://github.com/mcqueide/treinamentoGIT.git
     27ee314..62b3e3e  master -> master
{% endhighlight %}

Agora o arquivo está com as alterações dos dois usuários:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Treinamento Git</title>
  </head>
  <body>
    <h1>Treinamento Git</h1>
  </body>
</html>
{% endhighlight %}

E se olharmos o log do repositório irá aparecer o commit do primeiro usuário, o do segundo e o commit de merge.

{% highlight shell %}
$ git log
  commit 62b3e3e5bd3b27726d4192e57a6d2c03c870bde2
  Merge: 22fc69d 27ee314
  Author: macaulay1001 <macaulay1001@gmail.com>
  Date:   Mon Jan 30 19:02:48 2017 -0200

      Merge branch 'master' of https://github.com/mcqueide/treinamentoGIT

  commit 27ee3147e749611875f4ef23720cfc8fb01be482
  Author: mcqueide <mcqueide@gmail.com>
  Date:   Mon Jan 30 19:00:20 2017 -0200

      Atualizando title

  commit 22fc69db0da891cc3380f6d8db6bd3c04b11159b
  Author: macaulay1001 <macaulay1001@gmail.com>
  Date:   Mon Jan 30 18:59:57 2017 -0200

      Alterando h1
{% endhighlight %}

Infelizmente ainda ficou o commit de merge no nosso log, isso poderia ter sido evitado se o usuário macaulay estivesse em uma branch diferente, e depois tivesse realizado o envio dessas informações para branch master. Mas veremos isso em breve.
