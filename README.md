# API Tarefas – Node.js, Express, MongoDB, JWT

API RESTful para gerenciamento de tarefas com autenticação via JWT, desenvolvida para a disciplina de Backend. Inclui CRUD completo de tarefas, autenticação de usuários, validação de dados, testes automatizados e documentação com Swagger.​

# Tecnologias utilizadas

Node.js + Express

MongoDB (Atlas) com Mongoose

Autenticação JWT (jsonwebtoken)

Validação com Joi

Testes com Jest + Supertest

Documentação com Swagger (OpenAPI 3)​


# Estrutura de pastas
text
api-tarefas/
  app.js

  bin/
    www

  config/
    db.js

  models/
    user.model.js
    tarefa.model.js

  controllers/
    auth.controller.js
    tarefa.controller.js
  
  routes/
    auth.routes.js
    tarefa.routes.js
    index.js

  middlewares/
    auth.middleware.js
    validate.middleware.js
    error.middleware.js
  
  validations/
    auth.validation.js
    tarefa.validation.js
  
  docs/
    openapi.yaml
  
  tests/
    auth.test.js
    tarefa.test.js
  
  package.json
  
  .env
  
  .env.example
  
  README.md

Essa organização segue boas práticas de separar camadas (config, models, controllers, routes, middlewares, validations, docs, tests).​

# Configuração do ambiente

Pré-requisitos

Node.js instalado (recomendado LTS).

Conta no MongoDB Atlas ou instância local do MongoDB.​

Clonar o repositório

git clone https://github.com/0-raphael-0/Trabalho_backend.git

cd Api_Tarefas

npm install

Copie o arquivo de exemplo:

.env.example

Edite o .env com seus dados:

PORT=3000

MONGODB_USER=<seu_usuario_mongo>
MONGODB_PASSWORD=<sua_senha_mongo>
MONGODB_HOST=<seu_cluster>.mongodb.net
MONGODB_DATABASE=tarefa

JWT_SECRET=<sua_chave_jwt_grande_e_segura>
JWT_EXPIRES=60s

NODE_ENV=development

O padrão de usar credenciais do MongoDB Atlas e segredo de JWT via .env é comum em templates de APIs Node.​


# Executando a aplicação

Ambiente de desenvolvimento

npm run dev

A API ficará disponível em:
http://localhost:3000

Ambiente de produção (simples)

npm start

O entry point usa node ./bin/www, conforme o gerador do Express.​

# Documentação da API (Swagger)
A documentação em OpenAPI 3 está em docs/openapi.yaml.​

Com a aplicação rodando, acesse:

http://localhost:3000/api-docs

Na interface do Swagger UI você pode:

Visualizar todos os endpoints (/auth, /tarefas).

Ver exemplos de request/response.

Testar as rotas diretamente pelo navegador.​

# Endpoints principais

Autenticação


POST /api/v1/auth/register

Registrar novo usuário.

Body: name, email, password.

Respostas: 201, 400, 409.

POST /api/v1/auth/login

Autenticar usuário e gerar JWT.

Body: email, password.

Respostas: 200, 400, 401.

Tarefas (requer JWT – header Authorization: Bearer <token>)
GET /api/v1/tarefas


Listar tarefas do usuário autenticado.


Resposta: 200.

POST /api/v1/tarefas

Criar nova tarefa.

Body:

titulo (string, obrigatório)

descricao (string, opcional)

status (pendente, em-andamento, concluida)

prazo (date futura, opcional)

Respostas: 201, 400, 401.

GET /api/v1/tarefas/{id}

Buscar tarefa pelo ID.

Respostas: 200, 401, 404.

PUT /api/v1/tarefas/{id}


Atualizar tarefa existente.


Body com qualquer campo válido (titulo, descricao, status, prazo).

Respostas: 200, 400, 401, 404.

DELETE /api/v1/tarefas/{id}

Excluir tarefa.

Respostas: 204, 401, 404.

Esses padrões de rotas e verbos seguem recomendações gerais de design REST.​

# Validações

Entrada:

auth.validation.js valida name/email/password (registro) e email/password (login).

tarefa.validation.js valida tipos, obrigatoriedade e regra de negócio de prazo futuro.

Negócio:

Usuário não pode criar ou editar tarefas de outro usuário (filtro por userId).

Uso de Joi para validação e regras de negócio é comum em APIs Express.​

# Autenticação JWT

Registro cria usuário com senha criptografada (bcryptjs).

Login gera token com:

subject = ID do usuário.

expiresIn = JWT_EXPIRES do .env (ex.: 60s).

Middleware auth.middleware.js:

Lê Authorization: Bearer <token>.

Verifica com jwt.verify.

Injeta req.user.id para uso nos controllers.

Esse fluxo segue exemplos clássicos de autenticação JWT em Node/Express.​

# Testes automatizados

Framework: Jest.

HTTP testing: Supertest.​

Rodar testes

npm test

auth.test.js:

Testa registro de usuário (/auth/register).

Testa login válido e inválido (/auth/login).

tarefa.test.js:

Cria usuário e gera JWT de teste.

Testa criação de tarefa, listagem, validação de erro e acesso sem token.

Esse padrão de testes de rotas com Jest + Supertest é o recomendado para APIs Express.​

# Como usar (exemplos rápidos)

Registrar usuário

curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@example.com",
    "password": "senha123"
  }'


Login (obter token)

curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "senha123"
  }'


Criar tarefa

curl -X POST http://localhost:3000/api/v1/tarefas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token-jwt>" \
  -d '{
    "titulo": "Estudar Express",
    "descricao": "Rever material da disciplina",
    "status": "pendente"
  }'


# Integrantes do grupo

Nome: Raphael Filipe Costa Rodrigues – Matricula: 2414290214 – Email: raphael.filipe@iesb.edu.br


# Issues e gerenciamento de tarefas

No GitHub, foram criadas Issues para organizar o desenvolvimento, por exemplo:

#1 – Configuração inicial do projeto (Express, nodemon, estrutura de pastas).

#2 – Conexão com MongoDB e criação dos models (User, Tarefa).

#3 – Implementar autenticação JWT (registro, login, middleware).

#4 – CRUD de tarefas (rotas, controllers, validações).

#5 – Testes automatizados com Jest + Supertest.

#6 – Documentação Swagger (OpenAPI) e README.

Esse tipo de uso de Issues e milestones é comum em templates de APIs REST no GitHub.
