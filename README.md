# 🎬 Filme List - Lista de Filmes e Séries

Um aplicativo moderno e simples para gerenciar sua lista pessoal de filmes e séries. Perfeito para você e outra pessoa acompanharem o que querem assistir e o que já viram.

## ✨ Funcionalidades

- 🔍 Buscar filmes e séries usando a API do TMDB
- ➕ Adicionar filmes e séries à sua lista
- 👁️ Marcar conteúdo como "Para Ver" ou "Já Visto"
- ⭐ Sistema de favoritos e avaliações pessoais
- 📊 Dashboard com estatísticas
- 🔎 Filtros e ordenação avançados
- 🎨 Design moderno em tema preto
- 💾 Armazenamento compartilhado (Vercel KV) ou local (localStorage)

## 🚀 Como Começar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Chave de API do TMDB (gratuita)
- Conta na Vercel (para usar Vercel KV - opcional)

### Instalação

1. Clone o repositório ou baixe os arquivos

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua chave do TMDB:

```env
# Obrigatório: Chave da API TMDB
VITE_TMDB_API_KEY=sua-chave-aqui
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra seu navegador em `http://localhost:5173`

**Nota**: Localmente, os dados serão salvos no localStorage. Para compartilhar dados entre usuários, faça o deploy na Vercel e configure o Vercel KV.

## 📦 Deploy na Vercel

1. Faça push do código para um repositório Git (GitHub, GitLab, etc.)

2. Acesse [Vercel](https://vercel.com) e faça login

3. Clique em "New Project" e importe seu repositório

4. Adicione a variável de ambiente:
   - `VITE_TMDB_API_KEY` - Sua chave da API do TMDB

5. **Configure Vercel KV (Opcional - para compartilhar dados)**:
   
   a. No dashboard do projeto na Vercel, vá em "Storage"
   
   b. Clique em "Create Database" e escolha "KV"
   
   c. Isso criará automaticamente as variáveis de ambiente necessárias
   
   d. O KV será ativado automaticamente nas API routes

6. Clique em "Deploy"

7. Pronto! Seu site estará online 🎉

**Importante**: 
- **Com Vercel KV**: Todos os usuários compartilham a mesma lista de filmes
- **Sem Vercel KV**: Cada navegador tem sua própria lista (localStorage como fallback)
- Vercel KV tem plano gratuito generoso (10GB storage, 30M requests/dia)

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Vercel KV** - Armazenamento Redis (opcional, integrado à Vercel)
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **TMDB API** - API de filmes e séries

## 📝 Notas

- **Com Vercel KV**: Todos os usuários compartilham a mesma lista de filmes (dados persistidos)
- **Sem Vercel KV**: Cada navegador tem sua própria lista (localStorage como fallback)
- A chave de API do TMDB é gratuita e limitada, mas suficiente para uso pessoal
- Vercel KV é gratuito até 10GB de storage e 30 milhões de requests por dia
- Não precisa criar conta externa - Vercel KV é integrado à plataforma Vercel

## 🔮 Funcionalidades Implementadas

- ✅ Busca de filmes e séries
- ✅ Adicionar/remover filmes
- ✅ Marcar como visto/não visto
- ✅ Sistema de favoritos
- ✅ Avaliações pessoais (1-5 estrelas)
- ✅ Filtros e ordenação
- ✅ Dashboard com estatísticas
- ✅ Armazenamento compartilhado (Vercel KV)
- ✅ Fallback para localStorage

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.
