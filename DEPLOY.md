# 🚀 Guia de Deploy na Vercel

Este guia vai te ajudar a fazer o deploy do **Filme List** na Vercel passo a passo.

## 📋 Pré-requisitos

1. Conta no GitHub (ou GitLab/Bitbucket)
2. Conta na Vercel (pode criar com GitHub)
3. Chave de API do TMDB (gratuita)

---

## 📝 Passo 1: Preparar o Repositório Git

### Se você ainda não tem um repositório Git:

1. Crie uma conta no [GitHub](https://github.com) (se não tiver)

2. No terminal, na pasta do projeto, execute:

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Filme List"

# Criar repositório no GitHub (via site) e depois:
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git branch -M main
git push -u origin main
```

**OU** use o GitHub Desktop ou qualquer cliente Git que preferir.

---

## 🔑 Passo 2: Obter Chave da API TMDB

1. Acesse: https://www.themoviedb.org/
2. Crie uma conta (gratuita)
3. Vá em: **Settings** → **API**
4. Clique em **Request an API Key**
5. Preencha o formulário (selecione "Developer")
6. Copie a **API Key** que será gerada

---

## 🌐 Passo 3: Deploy na Vercel

### 3.1 Criar Conta na Vercel

1. Acesse: https://vercel.com
2. Clique em **Sign Up**
3. Escolha **Continue with GitHub** (recomendado)
4. Autorize a Vercel a acessar seu GitHub

### 3.2 Importar Projeto

1. No dashboard da Vercel, clique em **Add New...** → **Project**
2. Você verá seus repositórios do GitHub
3. Clique em **Import** no repositório do Filme List

### 3.3 Configurar Variáveis de Ambiente

Na tela de configuração do projeto:

1. **Framework Preset**: Vercel deve detectar automaticamente como "Vite"
2. **Root Directory**: Deixe como está (./)
3. **Build Command**: Deve aparecer `npm run build`
4. **Output Directory**: Deve aparecer `dist`

5. **Environment Variables**: Clique para adicionar variáveis:
   
   Adicione:
   ```
   Nome: VITE_TMDB_API_KEY
   Valor: [cole sua chave da API do TMDB aqui]
   ```

6. Clique em **Deploy**

---

## 💾 Passo 4: Configurar Vercel KV (Opcional - para compartilhar dados)

Após o primeiro deploy:

1. No dashboard da Vercel, abra seu projeto
2. Vá na aba **Storage** (no menu lateral)
3. Clique em **Create Database**
4. Selecione **KV** (Key-Value Store)
5. Dê um nome (ex: "filme-list-kv")
6. Escolha a região mais próxima
7. Clique em **Create**

**Pronto!** O Vercel KV será configurado automaticamente. As variáveis de ambiente necessárias serão adicionadas automaticamente.

### Se você NÃO configurar o KV:
- O app funcionará normalmente
- Cada navegador terá sua própria lista (localStorage)
- Os dados não serão compartilhados entre usuários

### Se você configurar o KV:
- Todos os usuários verão a mesma lista
- Os dados serão persistidos no banco
- Funciona perfeitamente para você e outra pessoa usar juntos

---

## ✅ Passo 5: Testar

1. Após o deploy, você receberá uma URL (ex: `filme-list.vercel.app`)
2. Acesse a URL no navegador
3. Teste adicionar um filme
4. Teste em outro navegador/dispositivo para ver se os dados são compartilhados (se configurou KV)

---

## 🔄 Atualizações Futuras

Sempre que você fizer push para o repositório Git:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

A Vercel **automaticamente** fará um novo deploy! 🎉

---

## 🐛 Problemas Comuns

### Erro: "VITE_TMDB_API_KEY is not defined"
- **Solução**: Verifique se adicionou a variável de ambiente na Vercel
- Vá em: Settings → Environment Variables

### Os dados não são compartilhados entre usuários
- **Solução**: Você precisa configurar o Vercel KV (Passo 4)
- Sem KV, cada navegador usa localStorage local

### Erro ao fazer build
- **Solução**: Verifique os logs de build na Vercel
- Certifique-se de que todas as dependências estão no `package.json`

### A API não funciona
- **Solução**: Verifique se a chave do TMDB está correta
- Teste a chave localmente primeiro

---

## 📊 Plano Gratuito da Vercel

A Vercel tem um plano gratuito generoso:
- ✅ Deploys ilimitados
- ✅ 100GB de bandwidth por mês
- ✅ SSL automático
- ✅ Vercel KV: 10GB storage, 30M requests/dia

**Perfeito para uso pessoal!**

---

## 🎉 Pronto!

Agora seu Filme List está online e acessível para você e sua pessoa compartilharem a lista de filmes! 🎬

