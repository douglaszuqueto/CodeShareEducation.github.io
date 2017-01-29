---
layout: post
title: "Versionamento com Git Parte 2"
date: 2016-12-30 12:00:00 # COLOQUE DATA E HORA NESSE MESMO FORMATO
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

## Introdução

No post sobre git passado, abordamos muitas operações porém com cenários bem simples. Em nenhum deles tivemos alteração concorrentes por usuários diferentes em um mesmo arquivo. E isso é algo comum de acontecer em um ambiente de trabalho, e quando isso ocorre nem sempre a ferramenta consegue realizar os merges de forma automática, e essa tarefa acaba virando responsabilidade de quem está operando o repositório. Veremos como deixar essas tarefas mais fáceis.

Se você também está cansado de ficar digitando suas senhas toda vez que vai realizar um push, ensinaremos como utilizar as chaves ssh, onde antes de toda operação de push, o git irá procurar por ela e usá-la para sua autenticação no repositório remoto. Nesse material você aprenderá sobre os alias, chega de ficar digitando tantos comandos um atrás de outros para tarefas que você acaba tendo que executar várias vezes.

## Configurando chave SSH

Para configurarmos nossa chave ssh temos que ter uma primeiro:

{% highlight shell %}
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  Generating public/private rsa key pair.
  Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
  Enter passphrase (empty for no passphrase): [Type a passphrase]
  Enter same passphrase again: [Type passphrase again]
{% endhighlight %}

> Use o email que você registrou seu github
Não é obrigatório digitar uma senha, se você não gosta de ficar digitando a senha repetidas vezes, sugiro não colocar e apertar apenas enter.

Você pode verificar por possíveis chaves cadastradas:

{% highlight shell %}
$ ls -al ~/.ssh
{% endhighlight %}

Depois de gerada a chave, visite seu github, e vá para a área de configuração, no menu lateral esquerdo ache o menu `SSH and GPG keys`, aperte o botão `New SSH key`, e cole sua chave que você vai obter através do comando:

![Adicionando chave SSH no GitHub][ssh-configuration]
Adicionando chave SSH no GitHub
[ssh-configuration]: ../assets/img/post-git/personal-settings.png "Adicionando chave SSH no GitHub"

{% highlight shell %}
$ cat ~/.ssh/id_rsa.pub
{% endhighlight %}

> Utilize o comando type **%userprofile%\\.ssh\id_rsa.pub** para SO windows

Pronto com isso você não terá que ficar digitando sua senha do Git toda vez que for realizar um push, a autenticação será baseada na sua chave ssh.
