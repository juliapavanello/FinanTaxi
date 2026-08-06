# 🚕 FinanTaxi

Aplicação web para taxistas registrarem e acompanharem seus ganhos, gastos e quilometragem rodada, com cálculo automático de saldo por jornada, saldo por km rodado e saldo por hora trabalhada.

## ✨ Funcionalidades

- Cadastro e login de usuários com autenticação via **JWT**
- Registro de jornadas de trabalho (início, fim, horas trabalhadas)
- Registro de ganhos e gastos por jornada
- Cálculo automático de:
  - Saldo (ganho − gasto)
  - Km rodados (km final − km inicial)
  - Saldo por km rodado
  - Saldo por hora trabalhada
- Listagem, edição e exclusão de jornadas registradas
- Rotas da API protegidas — só acessíveis com token válido

## 🛠️ Tecnologias

**Backend**
- Node.js + Express
- Sequelize (ORM) + PostgreSQL
- Passport.js + passport-jwt (autenticação)
- bcrypt (hash de senhas)
- dotenv (variáveis de ambiente)

**Frontend**
- HTML, CSS e JavaScript puro
- Bootstrap 5

## 📁 Estrutura do projeto

```
finan-taxi/
├── index.js          # Servidor Express e rotas de "saldos"
├── auth.js            # Rotas de registro e login
├── user.js             # Model do usuário (Sequelize)
├── saldo.js            # Model das jornadas/saldos (Sequelize)
├── banco.js            # Conexão com o banco de dados
├── middleware.js       # Estratégia JWT (passport)
└── public/              # Frontend (HTML, CSS, JS)
```

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 14 ou superior
- Um banco de dados PostgreSQL (local ou em nuvem)

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/finan-taxi.git
cd finan-taxi

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo .env na raiz do projeto
DATABASE_URL=postgres://usuario:senha@host:porta/banco
JWT_SECRET=uma_chave_secreta_qualquer
PORT=3001

# 4. Iniciar o servidor
npm start
```

O servidor sobe por padrão em `http://localhost:3001`.

## 🔌 Principais rotas da API

| Método | Rota                  | Descrição                          | Autenticação |
|--------|------------------------|-------------------------------------|--------------|
| POST   | `/auth/register`       | Cria um novo usuário                | Não          |
| POST   | `/auth/login`          | Autentica e retorna um token JWT    | Não          |
| GET    | `/saldos`              | Lista todas as jornadas registradas | Sim          |
| GET    | `/saldos/:id`          | Busca uma jornada por ID            | Sim          |
| POST   | `/saldos`              | Cria uma nova jornada               | Sim          |
| PUT    | `/saldos/:id`          | Atualiza uma jornada existente      | Sim          |
| DELETE | `/saldos/:id`          | Remove uma jornada                  | Sim          |

> Rotas autenticadas exigem o header `Authorization: Bearer <token>`.

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
