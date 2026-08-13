# VVault

Gerenciador de senhas e aliases de e-mail, com criptografia ponta a ponta e arquitetura
zero-knowledge: o servidor nunca tem acesso ao conteúdo do seu cofre.

**Site:** [vvault.com.br](https://www.vvault.com.br) · **App:** [app.vvault.com.br](https://app.vvault.com.br)

> **Status:** em desenvolvimento. O app ainda não está no ar e as extensões e aplicativos
> não foram publicados nas lojas.

---

## Sobre este projeto

VVault é um fork do [AliasVault](https://github.com/aliasvault/aliasvault), criado por
Leendert de Borst ([@lanedirt](https://github.com/lanedirt)), distribuído sob AGPL-3.0.

Todo o trabalho de engenharia por trás da criptografia do cofre, do protocolo de autenticação e
dos clientes é dele e dos contribuidores do AliasVault. As alterações do VVault são de marca:
nome, logotipo, identificadores de aplicativo, domínios e textos de interface.

O inventário completo do que foi alterado — e, mais importante, do que foi deixado intacto e por
quê — está em [docs/REBRAND.md](docs/REBRAND.md).

Se você procura o projeto original, mantido ativamente e com comunidade própria, vá para
[aliasvault.com](https://www.aliasvault.com). Considere apoiá-lo.

## Como funciona a segurança

- A senha mestra nunca sai do seu dispositivo.
- Ela passa por **Argon2id** localmente para derivar a chave, usada para duas coisas:
  autenticação com o servidor via **SRP** (a senha nunca trafega) e criptografia local do cofre
  com **AES-256-GCM**.
- O servidor armazena apenas dados já criptografados. Não há como ele ler seu cofre.
- Os e-mails recebidos nos aliases também são criptografados ponta a ponta.

Detalhes em [ARCHITECTURE.md](ARCHITECTURE.md).

## Componentes

| Componente | Tecnologia |
|---|---|
| API, Admin, TaskRunner | .NET 10 |
| Cliente web | Blazor WebAssembly |
| Núcleo compartilhado | Rust compilado para WASM, iOS e Android |
| Extensão de navegador | React + WXT (Chrome, Firefox, Edge, Safari) |
| Aplicativo móvel | React Native + Expo |
| Servidor SMTP | recepção apenas — não envia e-mail |
| Banco de dados | PostgreSQL |

## Auto-hospedagem

Requisitos: Linux 64 bits, Docker ≥ 20.10 e Docker Compose ≥ 2.0, 2 GB de RAM, 16 GB de disco.
Portas 80 e 443; mais a 25 de entrada se quiser os aliases de e-mail.

```bash
curl -L -o install.sh https://github.com/pgpvieira-code/vvault/releases/latest/download/install.sh
chmod +x install.sh
./install.sh install
```

### Build a partir do código-fonte

O `install.sh install` baixa imagens publicadas. Este fork ainda não publica imagens, então use o
caminho de build local:

```bash
docker compose -f docker-compose.yml -f dockerfiles/docker-compose.build.yml build
docker compose -f docker-compose.yml -f dockerfiles/docker-compose.build.yml up -d
```

**As duas flags `-f` são obrigatórias.** O `docker-compose.yml` referencia as imagens do registry
do projeto original; sem o arquivo de build, o `docker compose up` sobe o AliasVault em vez do seu
fork, silenciosamente. Para conferir o que está rodando de fato:

```bash
docker inspect vvault-client-1 --format '{{.Config.Image}}'
```

As imagens são multi-arquitetura e compilam nativamente em ARM64 e x86-64.

## Licença

[AGPL-3.0](LICENSE.md), herdada do AliasVault e não relicenciável.

A seção 13 da AGPL exige que quem interage com uma versão modificada através da rede tenha acesso
ao código correspondente. É por isso que este repositório é público e que há um link para ele
dentro do aplicativo. Se você fizer um fork e colocá-lo no ar, a mesma obrigação passa a valer
para você.

Veja também [NOTICE](NOTICE) para a atribuição ao projeto original.

## Segurança

Encontrou uma vulnerabilidade? **Não abra issue pública.** Escreva para
security@vvault.com.br. Detalhes em [SECURITY.md](SECURITY.md).

Vulnerabilidades que afetem o AliasVault original devem ser reportadas
[à equipe dele](https://github.com/aliasvault/aliasvault/blob/main/SECURITY.md), não aqui.
