# VVault — mapa de rebrand

Fork do [AliasVault](https://github.com/aliasvault/aliasvault) (AGPL-3.0), branch `velix`,
publicado em [pgpvieira-code/vvault](https://github.com/pgpvieira-code/vvault),
a partir de `c11e0657` (2026-08-10).

Este documento classifica **1865 arquivos** que contêm a string `aliasvault`. Serve para dois fins:
guiar o rebrand e resolver conflitos em cada `git merge upstream/main`.

Princípio: **trocar só a camada visível**. Namespaces, identificadores e nomes de projeto ficam como estão,
para que o fork continue absorvendo as releases quinzenais do upstream.

## Distribuição

| Escopo | Arquivos |
|---|---|
| Total (fora de `.git`/`node_modules`) | 1865 |
| `apps/server` | 1268 — 541 `.resx`, 471 `.cs`, 154 `.razor`, 41 `.json` |
| `apps/mobile-app` | 310 |
| `apps/browser-extension` | 107 |
| `docs/docs` | 52 |
| `fastlane/metadata` | 18 |
| `dockerfiles/all-in-one` | 15 |
| `core/*` | 27 |

---

## Balde 1 — MUDA: texto de UI

### Web client (Blazor WASM) — `apps/server/AliasVault.Client/Resources/`

`.resx` no padrão `[Nome].[cultura].resx`, 27 culturas, 1972 arquivos no total.
Contêm `AliasVault`: 541 arquivos, **1349 ocorrências**. Nem todas devem mudar:

| Categoria | Qtd | Ação |
|---|---|---|
| `<value>` fora de `ImportExport/` | **997** | trocar |
| Qualquer coisa em `Resources/**/ImportExport/` | 350 | **manter** |
| `<data name="...">` (chaves) | 135 | **manter** |

Receita segura:

```bash
cd apps/server/AliasVault.Client/Resources
grep -rl "AliasVault" --include='*.resx' . | grep -v ImportExport | \
  xargs sed -i '' '/<value>/s/AliasVault/VVault/g'
```

Conferência pós-lote — os dois comandos devem sair vazios:

```bash
git diff --name-only | grep ImportExport
grep -rho 'data name="[^"]*VVault[^"]*"' .
```

### Código C# / Razor — o nome do produto vem de uma constante

`.razor` e `.cs` quase não têm o nome hardcoded. A fonte real é:

`apps/server/Shared/AliasVault.Shared.Core/AppInfo.cs` → `public const string ApplicationName`

É essa constante que alimenta o rodapé e o cabeçalho. Trocar ali resolve a maior parte da UI de uma vez.

Além dela, apenas:

| Arquivo | O quê | Ação |
|---|---|---|
| `AliasVault.Client/Auth/Components/Logo.razor` | `alt="AliasVault"` | trocar |
| `AliasVault.Client/Auth/Pages/Start.razor` | `alt="AliasVault"` | trocar |
| `AliasVault.Admin/Auth/Components/Logo.razor` | `alt="AliasVault"` | trocar |
| `AliasVault.Client/Main/Components/TotpCodes/TotpCodes.razor` | issuer TOTP padrão | trocar — aparece no app autenticador do usuário |
| `AliasVault.Api/Controllers/Security/TwoFactorAuthController.cs` | issuer na URI `otpauth://` | trocar — idem |
| `Tests/AliasVault.E2ETests/.../CredentialTests.cs` | asserção de título | trocar, senão o teste E2E quebra |

**Armadilha de grep**: o wordmark da tela inicial fica em
`AliasVault.Client/Auth/Components/Logo.razor` como **texto solto no markup**, sem aspas:

```html
<span class="relative inline-flex flex-wrap items-center">
    AliasVault
```

Procurar por `"AliasVault"` (com aspas) não encontra isso, e o resultado é o nome antigo continuar
estampado em letra garrafal na primeira tela que o usuário vê. Sempre buscar sem aspas:
`grep -rn "AliasVault" --include='*.razor'`.

**Duas exceções que devem permanecer `"AliasVault"` no código:**

1. `AliasVault.Api/Program.cs` linhas 113 e 117 — nome do *token provider* do ASP.NET Identity.
   Ele é gravado junto dos tokens de reset de senha e confirmação de e-mail já emitidos. Renomear
   **invalida todos os tokens em aberto** dos usuários. É identificador interno, não marca.
2. `AliasVault.Client/Main/Pages/Settings/ImportExport/Components/ImportServiceAliasVault.razor` —
   `ServiceName="AliasVault"`, nome do serviço externo de onde se importa.

### Admin — armadilha do filtro por caminho

Uma verificação anterior concluiu que o painel admin não tinha branding nenhum. Estava errada.
O comando era:

```bash
grep -rn "AliasVault" AliasVault.Admin | grep -vE "...|AliasVault\.[A-Z]|..."
```

A intenção do `AliasVault\.[A-Z]` era descartar namespaces. Só que **o caminho do arquivo faz parte
de cada linha de resultado** — `AliasVault.Admin/Auth/Pages/Login.razor:8:...` — e o diretório do
projeto se chama `AliasVault.Admin`. O filtro descartava toda linha, sempre, e o resultado zero
parecia confirmação de limpeza.

Estavam intactos: tela de login, menu superior, título da aba de todas as páginas e o **issuer do
2FA**, que aparece no aplicativo autenticador do administrador.

Ao filtrar resultados de `grep -rn`, remova o prefixo antes:

```bash
grep -rn "AliasVault" . | sed 's|^[^:]*:[0-9]*:||' | grep -vE "<padroes>"
```

### Admin — tradução para português

O projeto admin **não tem infraestrutura de localização**: nenhum `.resx`, nenhum `IStringLocalizer`,
nada registrado no `Program.cs`. As strings ficam direto no markup.

A tradução foi feita no próprio markup, não adicionando a stack de localização — o painel tem um
operador só, e a infra completa tocaria todos os arquivos e conflitaria em cada merge com o upstream.

314 substituições em 48 arquivos, em duas passadas. A primeira só casava `>texto<` **na mesma linha**
e perdeu o menu de navegação, marcado assim:

```html
<a href="...">
    General logs
</a>
```

A segunda passada casa a **linha inteira, literalmente** contra o mapa de tradução. Literal e nunca
heurística: blocos `@code` são cheios de linhas que um regex lê como prosa
(`private void Cancel()`, `else if (result.Succeeded)`).

Comentários XML de documentação são pulados — `<summary>The query to filter.</summary>` é
indistinguível de texto de interface para um regex, mas ninguém o vê.

### Extensão — `apps/browser-extension/src/i18n`
### Mobile — `apps/mobile-app/i18n`
### Admin — `apps/server/AliasVault.Admin`

---

## Balde 2 — MUDA: assets

- `apps/server/AliasVault.Client/wwwroot/` — logo, favicon, ícones PWA, `index.html` (`<title>`, meta, manifest)
- `apps/browser-extension/public/` — ícones da extensão
- `apps/mobile-app/assets/images/` — `icon.png`, `adaptive-icon.png` (também usado no splash)
- `fastlane/metadata/` — screenshots e textos das lojas

---

## Balde 3 — MUDA: identidade de aplicativo

### Extensão — `apps/browser-extension/wxt.config.ts`

| Linha | Valor atual | Novo |
|---|---|---|
| 56 | `name: "AliasVault"` | `"VVault"` |
| 57 | `description: "AliasVault Browser AutoFill Extension..."` | reescrever |
| 66 | `host_permissions` | apontar pro domínio do VVault |
| 90 | `id: "{a06e3383-fc5f-431d-8405-1c54c2f85971}"` | **gerar UUID novo** — é o ID Firefox; reutilizar colide com a extensão original |

Linha 17 (`name: 'aliasvault:ascii-only-js'`) é o nome de um plugin de build interno — **não muda**.

**`default_title` não vem do `wxt.config.ts`.** O WXT deriva `action.default_title` do `<title>` do
entrypoint do popup e sobrescreve o valor do config. Editar só o config deixa o manifest gerado com
o nome antigo, sem aviso. Também trocar:

- `src/entrypoints/popup/index.html` → `<title>`
- `public/offscreen.html` → `<title>`
- `package.json` → `name` e `description` (definem o nome do arquivo `.zip` publicado)

Conferir sempre no artefato gerado, não no fonte:

```bash
python3 -c "import json;m=json.load(open('dist/chrome-mv3/manifest.json'));print(m['name'],m['action']['default_title'])"
```

**Pré-requisito de build**: `npm run zip:chrome` **não** compila o core Rust — só `npm run build:chrome`
encadeia `build:rust`. Sem o core compilado o build falha com
`Cannot find module '@/utils/dist/core/rust/aliasvault_core.js'`. Sem toolchain Rust no host, dá para
compilar em container sem sujar a máquina:

```bash
docker run --rm -v "$PWD":/work -w /work/core/rust \
  -v velix-cargo-registry:/usr/local/cargo/registry \
  -v velix-cargo-target:/work/core/rust/target \
  rust:1-bookworm bash -c "./build.sh --browser"
```

Leva ~130s na primeira vez; os volumes deixam as reexecuções rápidas.

### iOS — compilar exige Rust nativo, e o cache incremental engana

O Xcode roda `core/rust/build.sh --ios --incremental` numa fase de build, e espera o `cargo` em
**`~/.cargo/bin`**. Aqui o core do browser era compilado em container para não instalar Rust na
máquina — mas para iOS isso não funciona: compilar Rust para iPhone precisa dos SDKs da Apple, que
só existem no macOS. Rust nativo é obrigatório.

```bash
brew install rustup && rustup toolchain install stable --profile minimal
rustup target add aarch64-apple-ios aarch64-apple-ios-sim
```

O rustup do Homebrew **não cria `~/.cargo/bin`**, que é o caminho fixo no script do Xcode. Sem isso o
build falha mesmo com o Rust instalado e funcionando no terminal:

```bash
mkdir -p ~/.cargo/bin
for b in /opt/homebrew/opt/rustup/bin/*; do ln -sf "$b" ~/.cargo/bin/$(basename "$b"); done
```

**A armadilha do `--incremental`**: o marcador de "está atualizado" é compartilhado entre
plataformas. Depois de compilar para browser, um `./build.sh --ios --incremental` imprime
`Rust Core is up to date, skipping build` e **pula o iOS inteiro**, sem gerar os bindings Swift. O
Xcode então falha com uma mensagem que não sugere a causa:

```
error: Build input file cannot be found:
  .../RustCoreFramework/RustCore/Generated/aliasvault_core.swift
```

Solução: rodar `./build.sh --ios` sem `--incremental` uma vez. Leva ~13s.

### Mobile — `apps/mobile-app/app.json` + nativos

`app.json`: `name`, `slug`, `scheme` (`aliasvault` → `vvault`), `ios.bundleIdentifier`, `android.package`.

**O `app.json` sozinho não basta** — os diretórios nativos estão versionados. iOS tem **9 bundle identifiers**:

```
net.aliasvault.app                        (app principal)
net.aliasvault.app.autofill               (extensão de autofill)
net.aliasvault.app.VaultModels
net.aliasvault.app.VaultStoreKit
net.aliasvault.app.VaultUI
net.aliasvault.app.VaultUtils
net.aliasvault.RustCoreFramework
net.aliasvault.app.AliasVaultUITests
net.aliasvault.app.VaultStoreKitTests
```

E um **App Group**: `group.net.aliasvault.autofill` — canal por onde o app principal e a extensão de autofill
compartilham o cofre. Se o App Group e os bundle ids saírem de sincronia, **o autofill para de enxergar o cofre
sem erro visível**. É o ponto mais frágil do rebrand inteiro.

Android — `apps/mobile-app/android/app/build.gradle`: `namespace` e `applicationId`, ambos `net.aliasvault.app`.

### Infra
Nomes de imagem em `dockerfiles/docker-compose.build.yml` (`aliasvault-api`, `aliasvault-client`, …).

---

## Balde 4 — NÃO MUDA

| O quê | Por quê |
|---|---|
| Namespaces C#, `.csproj`, `.sln`, nomes de classe | Invisível ao usuário; renomear garante conflito em todo merge |
| Nomes de tabela e schema | Migrations do EF Core quebram |
| `core/` inteiro — `rust`, `models`, `vault` | `core/models` gera código pra C#/Swift/Kotlin; renomear quebra as 3 plataformas de uma vez |
| `Resources/**/ImportExport/` (350 ocorrências) | Descrevem importar dados **do AliasVault real** (CSV/AVUX/AVEX). Trocar produziria texto factualmente errado — o VVault deve continuar importando do AliasVault |
| 5 chaves de recurso × 27 culturas (135) | `AliasVaultDescription`, `AliasVaultInstructionsPart1`, `AliasVaultSupportedFormatsInfo`, `HowAliasVaultWorksStepTitle`, `PrivateEmailAliasVaultServer` — referenciadas nos `.razor`; renomear só no `.resx` quebra o build |
| `LICENSE.md` e cabeçalhos de copyright | Exigência da AGPL-3.0 |
| Atribuição no `NOTICE` | Idem |

---

## Pendências que dependem de valores reais

Estas ocorrências usam `aliasvault` em **minúsculo**, então a substituição case-sensitive
`AliasVault` → `VVault` passou por cima delas de propósito: são URLs, domínios e e-mails que
precisam de valores reais, não de tradução de marca.

| Onde | Qtd | Valor necessário | Situação |
|---|---|---|---|
| `docs/**` — URL do repositório | ~21 | repo público | ✅ `github.com/pgpvieira-code/vvault` |
| `wwwroot/index.template.html:14` | 1 | link AGPL do banner | ✅ resolvido |
| `docs/**` — `suporte@vvault.com.br` | 13 | e-mail de suporte | **pendente** |
| `docs/**` — `vvault.com.br` | 14 | domínio do produto | **pendente** |
| `docs/**` — `vvault.com.br` | 13 | domínio de e-mail privado | **pendente** |
| `wwwroot/appsettings.json` | 1 | `PrivateEmailDomains` de exemplo | **pendente** |

**Cuidado ao rodar um `sed` sobre `docs/`**: este próprio arquivo mora em `docs/` e menciona o
upstream legitimamente. Uma substituição ampla transforma "Fork do AliasVault (link para o upstream)"
em um link para o seu próprio repositório — ou seja, apaga a atribuição justamente no documento que
existe para registrá-la. Conferir o diff de `docs/REBRAND.md` depois de qualquer troca em massa.

**Exceção legítima**: os links para
`github.com/aliasvault/aliasvault/blob/main/core/rust/src/password_generator/wordlists/ATTRIBUTION.md`
e o `en.diceware` devem **continuar** apontando para o upstream — são atribuição de terceiros das
listas de palavras, não branding.

### Servidor padrão dos clientes — resolvido, mas provisório

`DEFAULT_API_URL` e `DEFAULT_CLIENT_URL` apontavam para `https://app.vvault.com.br` na extensão
(`src/utils/AppInfo.ts`) e no mobile (`utils/AppInfo.ts`). Distribuir assim faria todo usuário do
VVault sincronizar o cofre **no servidor do AliasVault**. Ambos foram apontados para
`http://localhost` como medida provisória de desenvolvimento.

**Bloqueante para distribuição**: trocar para o domínio real antes de publicar extensão ou app.

## Assets — como foram gerados

A arte de origem era um render 3D opaco, com o padrão xadrez de transparência **achatado nos pixels**
(`color type 2`, sem canal alfa). O SVG que veio junto era um autotrace monocromático — um único
`fill="#000000"` em 65 paths, sem nenhuma das cores.

O fundo foi removido por floodfill a partir dos quatro cantos, com 8% de tolerância:

```bash
magick origem.png -alpha set -fuzz 8% \
  -fill none -draw "alpha 0,0 floodfill" -draw "alpha 1253,0 floodfill" \
  -draw "alpha 0,1253 floodfill" -draw "alpha 1253,1253 floodfill" cube-keyed.png
```

Floodfill a partir das bordas, e não `-transparent`, porque só remove fundo **conectado** — pixels
claros dentro da arte (o néon, o display) permanecem intactos.

Regras por plataforma que não são intercambiáveis:

| Alvo | Exigência |
|---|---|
| Ícone iOS (`assets/images/icon.png`) | **Opaco.** A App Store rejeita canal alfa. Composto sobre `#0A0E0D`. |
| Adaptive icon Android | **Transparente**, arte em ~60% do quadro para caber na zona segura do recorte |
| Favicon, PWA, extensão | Transparente |

`logo.svg` é um wrapper SVG com PNG embutido em base64, não vetor. Quantizado para 200 cores sem
dithering: 456 KB → 127 KB, RMSE de 0,89% contra o original. Dithering **aumenta** o arquivo (267 KB),
porque o ruído comprime mal.

**Service worker mascara troca de asset.** O cliente Blazor registra `service-worker.published.js`,
que serve os assets do cache próprio. Depois de trocar um ícone e reconstruir, a página continua
mostrando o antigo — e `cmd+shift+R` não resolve, porque o SW intercepta antes. Para verificar de
verdade, abrir por outra origem (`127.0.0.1` em vez de `localhost`), que não tem o SW registrado.
Conferir o que o servidor entrega, não o que o browser mostra:

```bash
curl -s http://localhost/img/logo.svg | head -c 120
```

## Produção — o proxy trava em 503 depois de recriar um container

O nginx do `reverse-proxy` resolve o IP dos serviços **uma vez, na inicialização**. Recriar o
`client` ou o `api` dá a eles um IP novo na rede do Docker, e o proxy segue mandando tráfego para o
endereço antigo. O sintoma é `503` com todos os containers `Up` e saudáveis — nada nos logs do
serviço, só no do proxy:

```
connect() failed (111: Connection refused) while connecting to upstream,
upstream: "http://172.18.0.3:3000/"
```

Compare com o IP real:

```bash
docker inspect vvault-client-1 --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```

Se divergir, `docker compose restart reverse-proxy` resolve. **Reinicie o proxy sempre que recriar
client ou api**, senão o site fica fora do ar sem sinal óbvio de causa.

## Operação local — armadilha das duas compose files

`docker-compose.yml` referencia as imagens publicadas (`ghcr.io/aliasvault/*`).
Os nomes locais (`aliasvault-client`, `aliasvault-api`, …) só existem em
`dockerfiles/docker-compose.build.yml`.

Consequência: **`docker compose up -d` sozinho ignora tudo que você buildou** e sobe as imagens do
upstream — o rebrand simplesmente não aparece, sem nenhum erro. Sempre passar as duas:

```bash
docker compose -f docker-compose.yml -f dockerfiles/docker-compose.build.yml build
docker compose -f docker-compose.yml -f dockerfiles/docker-compose.build.yml up -d
```

Para conferir qual imagem um container está realmente rodando:

```bash
docker inspect vvault-client-1 --format '{{.Config.Image}}'
```

Se responder `ghcr.io/...`, você está olhando para o AliasVault original, não para o seu fork.

## Regressão

```bash
grep -ri "aliasvault" --exclude-dir=.git --exclude-dir=node_modules . | wc -l
```

**O número não vai a zero, e não deve ir.** Todo hit restante precisa cair no Balde 4. Um resultado zero
significaria que namespaces, `core/` ou as strings de import foram alterados por engano.

## Link de código-fonte na UI — como foi implementado

A URL vive em uma constante única, não espalhada pelo markup:

`apps/server/Shared/AliasVault.Shared.Core/AppInfo.cs` → `AppInfo.SourceCodeUrl`

Renderizada em `Main/Layout/Footer.razor` (sessão autenticada) e `Main/Layout/FooterLogin.razor`
(telas de login) via `@Localizer["SourceCodeLink"]`.

**Não existe `Footer.resx` neutro** neste projeto — só arquivos por cultura. Uma chave ausente em
alguma cultura é renderizada como o próprio nome da chave (`SourceCodeLink`) na tela. Por isso a
chave foi adicionada nas **27 culturas**, com tradução revisada onde havia confiança e texto em
inglês como fallback em `fa`, `ga`, `he`, `my`, `ur`.

Ao adicionar qualquer chave nova de resource, validar o XML dos 27 arquivos:

```bash
for f in Resources/Layout/Footer.*.resx; do python3 -c "import xml.etree.ElementTree as E;E.parse('$f')"; done
```

O mesmo padrão foi replicado nos outros dois clientes, ambos no rodapé de versão da tela de ajustes:

| Cliente | Constante | Onde aparece | Chave i18n |
|---|---|---|---|
| Web | `AppInfo.SourceCodeUrl` | `Main/Layout/Footer.razor`, `FooterLogin.razor` | `SourceCodeLink` (27 `.resx`) |
| Extensão | `AppInfo.SOURCE_CODE_URL` | `popup/pages/settings/Settings.tsx` | `settings.sourceCode` (27 JSON) |
| Mobile | `AppInfo.SOURCE_CODE_URL` | `app/(tabs)/settings/index.tsx` | `settings.sourceCode` (27 JSON) |

Nos clientes distribuídos como binário (extensão e app), o que a AGPL exige é a oferta do código
correspondente junto da distribuição; o link nos ajustes cumpre isso e é o que as lojas esperam ver.

**A URL precisa continuar apontando para um repositório público e sincronizado com o que está no
ar.** Um link para repositório privado ou desatualizado não cumpre a licença.

## Conformidade AGPL-3.0

O fork herda a AGPL-3.0 e não pode ser relicenciado. Operar o VVault como serviço em rede aciona a
seção 13: o código-fonte modificado precisa estar disponível aos usuários do serviço.

Obrigatório antes de expor a instância publicamente:

- repositório VVault público sob AGPL-3.0;
- link "Código-fonte" visível na UI web, na extensão e no app;
- `LICENSE.md` e cabeçalhos de copyright originais preservados;
- `NOTICE` atribuindo o AliasVault e seus autores.
