---
sidebar_position: 200
sidebar_label: "Política de Privacidade"
---

# Política de Privacidade do VVault

**Última atualização:** 13 de agosto de 2026

Esta política descreve quais dados o VVault coleta, o que ele consegue e o que **não** consegue ler.
Ela vale para o serviço em `app.vvault.com.br`, para as extensões de navegador e para os aplicativos
móveis do VVault.

## Resumo

O VVault é um gerenciador de senhas com criptografia ponta a ponta. **O conteúdo do seu cofre é
criptografado no seu dispositivo antes de sair dele.** O servidor armazena um bloco cifrado que não
tem como abrir.

Isso não é uma promessa de política: é uma consequência de como o sistema foi construído, e o código
é público em [github.com/pgpvieira-code/vvault](https://github.com/pgpvieira-code/vvault) para quem
quiser conferir.

## O que não conseguimos ver

- Suas senhas, notas, chaves de acesso e códigos de autenticação
- Os sites e serviços para os quais você guardou credenciais
- O conteúdo dos e-mails recebidos nos seus aliases
- Sua senha mestra

A senha mestra passa por **Argon2id** no seu dispositivo e nunca é enviada. A autenticação usa o
protocolo **SRP**, que prova que você a conhece sem transmiti-la. O cofre é cifrado com
**AES-256-GCM** usando uma chave derivada dela.

**Se você perder a senha mestra, não há recuperação.** Não temos cópia dela nem meio técnico de abrir
seu cofre. Isso é intencional.

## O que armazenamos

**Sua conta:** nome de usuário e o verificador SRP — um valor que permite verificar sua senha sem
conhecê-la.

**Seu cofre:** um arquivo criptografado. Sabemos seu tamanho e quando mudou, não o que contém.

**E-mails dos aliases:** chegam ao servidor, são criptografados com sua chave pública e só então
gravados. A partir daí ficam ilegíveis para nós. O endereço do destinatário fica visível, porque é
por ele que sabemos de quem é a mensagem.

**Registros técnicos:** endereço IP e horário das tentativas de login, para detectar ataques de força
bruta. Os IPs são anonimizados nas estatísticas do painel administrativo.

## O que não coletamos

Não há rastreadores, análise de comportamento, cookies de publicidade nem SDK de terceiros nos nossos
aplicativos. Não vendemos, alugamos nem compartilhamos seus dados. Não há anúncios.

O VVault não envia e-mail automatizado — não existe newsletter, nem mensagem promocional, nem e-mail
transacional. O serviço nunca vai te escrever pedindo sua senha, porque não temos como usá-la. As
únicas mensagens que partem do domínio são respostas humanas aos endereços de contato desta página.

## Retenção e exclusão

Você pode excluir sua conta a qualquer momento pelas configurações. A exclusão remove o cofre, os
aliases e os e-mails associados.

Registros de autenticação têm retenção limitada e são apagados automaticamente conforme a
configuração do servidor.

## Seus direitos

Sob a LGPD (Lei 13.709/2018), você tem direito de acessar, corrigir, portar e excluir seus dados
pessoais, além de revogar consentimento.

Na prática, a arquitetura já entrega parte disso diretamente: os dados do cofre estão sob seu
controle exclusivo, e a exportação está disponível nas configurações a qualquer momento, sem pedir
nada a ninguém.

Para as demais solicitações: **privacidade@vvault.com.br**

## Autohospedagem

O VVault é software livre sob AGPL-3.0. Você pode rodá-lo na sua própria infraestrutura, e nesse caso
nenhum dado passa por nós — esta política não se aplica, e o operador daquele servidor é o
responsável pelos dados.

## Segurança

Encontrou uma vulnerabilidade? **Não abra uma issue pública.** Escreva para
**security@vvault.com.br**.

## Alterações

Mudanças materiais nesta política serão anunciadas na aplicação antes de entrar em vigor. O histórico
completo de alterações fica público no repositório.

## Contato

**privacidade@vvault.com.br**
