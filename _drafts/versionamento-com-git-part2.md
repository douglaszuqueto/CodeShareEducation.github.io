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
  * [Começando trabalhar com repositório remoto](#comeando-trabalhar-com-repositrio-remoto)
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
