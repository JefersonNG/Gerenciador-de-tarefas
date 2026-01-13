# 📝 Gerenciador de Tarefas API

API REST para gerenciamento de tarefas com autenticação, times e histórico de status.

## 🚀 Tecnologias

- Node.js (ESM)
- TypeScript
- Express
- Prisma ORM (PostgreSQL)
- Zod (validação)
- JWT (autenticação)
- Jest + Supertest (testes e2e)
- tsup (build)
- Prisma Adapter PG

---

## 📁 Estrutura do projeto

```
src/
 ├─ app.ts
 ├─ main.ts
 ├─ routes/
 ├─ controllers/
 ├─ middlewares/
 ├─ database/
 │   ├─ prisma.ts
 │   └─ generated/
 ├─ schemas/
 └─ test/
```

---

## ⚙️ Pré-requisitos

- Node.js **>= 20**
- PostgreSQL
- npm ou pnpm

---

## 🔑 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=supersecret
PORT=3333
```

> ⚠️ Nunca versione o `.env`

---

## 📦 Instalação

```bash
npm install
```

---

## 🧱 Prisma

### Gerar client

```bash
npm run prisma:generate
```

### Rodar migrations

```bash
npm run prisma:deploy
```

---

## ▶️ Rodar projeto

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Produção

```bash
npm start
```

---

## 🧪 Testes

### Rodar testes e2e

```bash
npm run test
```

> Os testes usam banco real (recomendado usar `.env.test`).

---

## 🔐 Autenticação

A API utiliza **JWT** via header:

```http
Authorization: Bearer <token>
```

---

## 📌 Endpoints principais

### Criar usuário
```http
POST /users
```

### Login
```http
POST /sessions
```

### Criar tarefa (auth)
```http
POST /tasks
```

---

## 🛡️ Boas práticas aplicadas

- Senha nunca retornada na response
- Validação com Zod
- Enums compartilhados com Prisma
- Prisma Client TS (output customizado)
- Testes e2e com Supertest
- Build limpo (testes fora do dist)

---

## 🧑‍💻 Autor

**Jeferson Nascimento**  
Projeto de estudo e prática backend 🚀
