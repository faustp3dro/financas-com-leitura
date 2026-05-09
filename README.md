# Finanças com Leitura

Site editorial de análises exaustivas de livros sobre dinheiro, hábitos e decisão.

## Estrutura

- `index.html` — Homepage
- `habitos-atomicos.html` — Análise completa do livro Hábitos Atómicos
- `sobre.html` — Página sobre o projeto
- `styles.css` — Folha de estilos partilhada
- `script.js` — Interatividade (checklist com persistência em localStorage)

## Deploy via Cloudflare Pages + GitHub

### 1. Criar repositório no GitHub

Vai a github.com → **New repository**:
- Nome: `financas-com-leitura`
- Visibilidade: Public (gratuito) ou Private (também gratuito)
- **Não** marques "Initialize with README"

### 2. Carregar os ficheiros

Opção A — via web (mais fácil):
1. No repositório vazio, clica em "uploading an existing file"
2. Arrasta os 5 ficheiros (index.html, habitos-atomicos.html, sobre.html, styles.css, script.js) para o browser
3. Clica em "Commit changes"

Opção B — via Git terminal (se preferires):
```
git init
git add .
git commit -m "primeira versão"
git remote add origin https://github.com/TEU_USERNAME/financas-com-leitura.git
git branch -M main
git push -u origin main
```

### 3. Ligar Cloudflare Pages

1. dash.cloudflare.com → **Workers & Pages** → **Pages**
2. **Create application** → **Connect to Git**
3. Autoriza GitHub e seleciona o repositório `financas-com-leitura`
4. Configurações de build (deixa todas em branco/default):
   - Framework preset: **None**
   - Build command: (vazio)
   - Build output directory: `/`
5. **Save and Deploy**
6. Em ~60 segundos: URL pública `financas-com-leitura.pages.dev`

### 4. Atualizações futuras

Para corrigir algo ou adicionar um novo livro:
1. Edita os ficheiros no GitHub (clica no lápis na interface web)
2. Commit
3. Cloudflare Pages faz redeploy automático em ~30 segundos

URL mantém-se igual.

## Adicionar um novo livro no futuro

1. Duplica `habitos-atomicos.html` e renomeia (ex: `psicologia-dinheiro.html`)
2. Substitui o conteúdo (mantendo a estrutura e classes CSS)
3. Atualiza a homepage:
   - Card "Em destaque" passa para o novo livro
   - O livro anterior vai para "Próximas leituras" (ou cria uma secção "Análises anteriores")

## Notas técnicas

- Site 100% estático (HTML+CSS+JS) — sem backend, sem build step
- Fontes Fraunces e Inter carregadas do Google Fonts
- Checklist interactiva guarda estado em localStorage do browser do utilizador
- Responsivo até 380px de largura
