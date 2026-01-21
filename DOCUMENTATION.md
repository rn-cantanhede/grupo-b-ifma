# Documentação do Projeto

## Visão Geral
- Projeto com duas APIs Node.js e um front-end estático: `API_agrofamilia_pesca`, `API_Simplificada` e `consumo`.
- Objetivo: gerir dados de programas sociais, beneficiados, produtos, associações e movimentações.
- A `API_Simplificada` é uma versão básica que realiza apenas operações CRUD e serve como demonstração para o front-end (`consumo`).

## Estrutura do Repositório (resumo)
- `API_agrofamilia_pesca/` - API principal (rotas, módulos, middleware, configuração de DB)
- `API_Simplificada/` - Versão simplificada da API (CRUD básico, usada como demonstração para o front-end)
- `consumo/` - Front-end estático (HTML/JS) para consumir as APIs
- `dbConfig/`, `database/` - Scripts SQL e arquivos de configuração do banco

## Testes
- Utilize ferramentas como o Insomnia ou o cURL para testar os endpoints das APIs.

## Requisitos
- Node.js 14+ (recomendado)
- NPM ou Yarn
- MySQL (ou banco compatível com o Knex.js)

## Instalação (exemplo)
1. Clone o repositório.
2. Entre na pasta da API que deseja usar, por exemplo:

```
cd API_agrofamilia_pesca
npm install
```

3. Configure a conexão com o banco de dados (veja seção Configuração).

## Configuração
- As APIs usam `config/knex.js` e `database/connection.js` para conexão com o banco de dados MySQL.
- Ajuste variáveis de ambiente conforme necessário (host, port, user, password, database).
- Arquivos SQL úteis: `dbConfig/db_agrofamilia_pesca.sql`, `dbConfig/INSERTS.sql`, `dbConfig/VIEWS.sql`.

## Executando
- Iniciar a API principal:

```
cd API_agrofamilia_pesca
npm start
```

- Iniciar a API principal com `nodemon` (para desenvolvimento):

Você pode iniciar a API em modo de desenvolvimento com `nodemon` de várias formas, dependendo de como estiver instalado:

```
cd API_agrofamilia_pesca
# usando npx (não precisa instalar globalmente)
npx nodemon

# se tiver nodemon instalado globalmente
nodemon

# especificando o arquivo de entrada
nodemon server.js
```

- Iniciar a API simplificada:

```
cd API_Simplificada
npm start# usando npx (não precisa instalar globalmente)
npx nodemon

# se tiver nodemon instalado globalmente
nodemon

# especificando o arquivo de entrada
nodemon server.js
```

- Servir o front-end estático (ex.: abrir `consumo/index.html` no navegador ou servir via servidor estático).

## Rotas e Endpoints (visão geral)
- Rotas agrupadas por módulos dentro de `modules/` (ex.: `Associados`, `Produtos`, `Movimentacoes`).
- Arquivos de rotas principais estão em `routes/` (ex.: `index.js`, `login.routes.js`, `usuario.routes.js`).

## Módulos Principais
- Cada módulo segue padrão: `*.controller.js`, `*.service.js`, `*.repository.js`.
- Responsabilidade:
  - Controller: valida requests e responde.
  - Service: lógica de negócio.
  - Repository: operações diretas com o DB (Knex).

## Banco de Dados
- Scripts iniciais e views em `dbConfig/`.
- Conexões em `database/connection.js`.
- Antes de iniciar a API, assegure que as migrations/inserts foram aplicados (ou execute os SQL em `dbConfig`).

## Middleware e Segurança
- Middlewares estão em `middleware/` (ex.: `Auth.js`, `Authorize.js`, `errorHandle.js`).
- Autenticação e autorização devem ser configuradas conforme variáveis de ambiente e políticas internas.

# Manual de Referência Técnica - Agrofamília Pesca

## 1. Introdução e Propósito
O **Agrofamília Pesca** é um projeto desenvolvido para a Secretaria de Agricultura e Pesca de uma cidade, com o objetivo de gerenciar dados relacionados à agricultura familiar e pesca artesanal. Este sistema foi criado como parte de um curso de back-end com Node.js, visando aplicar conceitos práticos de desenvolvimento de APIs seguras e modulares.

Seu propósito central é prover uma solução prática para o gerenciamento de associações, secretarias, programas e beneficiários, enquanto serve como uma plataforma de aprendizado para implementação de boas práticas em desenvolvimento de software.

---

## 2. Visão Computacional e Arquitetura

O sistema adota uma arquitetura monolítica modular, desenhada para alta coesão e baixo acoplamento, facilitando a testabilidade e o escalonamento horizontal futuro.

### 2.1 Padrões de Projeto
O backend transcende o padrão MVC tradicional, adotando uma estrutura em 4 camadas (Layered Architecture):

1.  **Camada de Entrada (Router & Controller)**
    - **Responsabilidade**: Desserialização da requisição HTTP, validação básica de esquema e formatação da resposta.
    - **Princípio**: *Controllers*. Os controladores não conhecem regras de negócio.
    - **Path**: `modules/*/controllers/*.controller.js`

2.  **Camada de Serviço (Service Layer)**
    - **Responsabilidade**: Coração da lógica de negócio. Aplica regras de validação, cálculos, orquestração de chamadas e controle de transações.
    - **Segurança**: Implementa validações de acesso contextual através de *Policies*.
    - **Path**: `modules/*/services/*.service.js`

3.  **Camada de Persistência (Repository Layer)**
    - **Responsabilidade**: Abstração do acesso a dados. Contém queries SQL puras ou construtores de queries (Knex.js). Garante que o Service não conheça detalhes do SQL.
    - **Path**: `modules/*/repositories/*.repository.js`

4.  **Camada Transversal (Shared)**
    - **Responsabilidade**: Utilitários globais como loggers, tratadores de erro (`Errors`), validadores (`validationsUtils`) e classes base (`BaseService`).

### 2.2 Fluxo de Dados
A comunicação segue estritamente o fluxo *downstream*:
`Request -> Middleware (Auth) -> Controller -> Service -> Repository -> Database`

### 2.3 Camada de Policy
A camada de `Policy` é responsável por gerenciar as regras de autorização e controle de acesso no sistema. Ela atua como um intermediário entre a camada de Serviço e o Middleware de autenticação, garantindo que as permissões sejam verificadas antes da execução de qualquer lógica de negócio.

- **Localização**: `modules/*/policies/`
- **Responsabilidade**:
  - Validar permissões de acordo com o nível de acesso do usuário.
  - Aplicar regras específicas de escopo (ex.: restringir dados por Secretaria ou Associação).

A camada de `Policy` é integrada diretamente aos serviços e utilizada em conjunto com o sistema de escopo para garantir segurança e consistência nas operações.

### 2.4 Camada de Policy
A camada de `Policy` está localizada entre o `Service` e o `Repository`. Sua função é aplicar regras de autorização e validação de escopo antes que as operações de persistência sejam realizadas.

- **Localização**: `modules/*/policies/`
- **Responsabilidade**:
  - Garantir que as regras de negócio sejam respeitadas antes de acessar o banco de dados.
  - Validar permissões específicas para operações CRUD.
- **Exemplo**:
  - `LevelPolicy`: Define permissões baseadas no nível de acesso do usuário logado.

---

## 3. Segurança e Controle de Acesso (RBAC)

A segurança é implementada em profundidade (*Defense in Depth*).

### 3.1 Autenticação (Authentication)
O sistema utiliza **JWT (JSON Web Tokens)** stateless.
- **Ciclo de Vida**: Tokens emitidos no login com validade de 7 dias.
- **Payload**: O token carrega metadados críticos (`id`, `nivel`, `secretaria`, `associacao`), evitando round-trips ao banco para verificar permissões básicas.
- **Hashing**: Senhas são hashadas utilizando `bcryptjs` (Salt Rounds: 10).

### 3.2 Autorização (Authorization)
O controle de acesso é baseado em Níveis e Contexto.

#### Níveis Hierárquicos
1.  **Nível 1 (Admin)**: Visibilidade global. Gerencia Secretarias, Associações e Usuários mestre.
2.  **Nível 2 (Secretaria)**: Visibilidade restrita à sua Secretaria. Gerencia Associações e programas vinculados.
3.  **Nível 3 (Associação)**: Visibilidade restrita aos dados e associados da sua própria Associação.
4.  **Nível 4 (Usuário)**: Acesso restrito à inserção de dados e consultas operacionais básicas.

#### Policies e Escopo
O sistema utiliza o padrão **Scope** (`BaseService.applyScope`). Um usuário da Secretaria de Agricultura jamais verá dados da Secretaria de Pesca, pois o `Service` injeta cláusulas `WHERE` automáticas em todas as queries baseadas no contexto do usuário logado.

---

## 4. Glossário de Negócio e Entidades

Para o correto entendimento do sistema, define-se:

- **CAF (Cadastro Nacional da Agricultura Familiar)**: Documento que identifica o produtor e permite acesso a políticas públicas. Campo mandatório para `Associados`.
- **DAP (Declaração de Aptidão ao Pronaf)**: Identificação usada para acesso a crédito rural. Vinculada à tabela `Agricultura_Familiar`.
- **Associado**: O indivíduo produtor. Uma `Pessoa` física que possui vínculo com uma `Associação`.
- **Movimentação**: O ato de registrar uma produção. Ex: "O Associado X produziu 50kg de Tilápia na data Y". É a base para relatórios de produtividade.

---

## 5. Especificação Técnica da API (Integração)

A API segue os princípios REST. Todas as requisições devem conter o header:
`Content-Type: application/json`

### 5.1 Endpoints de Domínio

#### **Módulo: Secretarias**
`POST /secretarias`
Gestão dos órgãos governamentais.
**Regras**:
- Apenas usuários Nível 1 (Admin) podem criar.
- **Payload**:
```json
{
  "NOME": "Secretaria de Pesca de Tutóia",
  "CIDADE": "Tutóia",
  "ESTADO": "MA",
  "ENDERECO": "Av. Beira Mar, 100"
}
```

#### **Módulo: Associações**
`POST /associacoes`
Entidades que agrupam os produtores.
**Regras**:
- Deve estar vinculada a uma Categoria e a uma Secretaria.
- **Payload**:
```json
{
  "NOME": "Colônia de Pescadores Z-15",
  "ENDERECO": "Rua do Porto, SN",
  "ID_CATEGORIA": 2,
  "ID_SECRETARIA": 1
}
```

#### **Módulo: Associados**
`POST /associados`
Vínculo de uma Pessoa a uma Associação.
**Regras**:
- Exige `ID_PESSOA` pré-existente.
- CAF (Cadastro Nacional) deve ser único.
- **Payload**:
```json
{
  "ID_PESSOA": 105,
  "ID_ASSOCIACAO": 5,
  "CAF": "123.456.789",
  "VALIDADE_CAF": "2027-12-31"
}
```

#### **Módulo: Agricultura Familiar**
`POST /agricultura-familiar`
Registro de beneficiários em programas.
**Regras**:
- Vincula um Associado a um Programa.
- Exige DAP (Declaração de Aptidão).
- **Payload**:
```json
{
  "ID_ASSOCIADO": 10,
  "ID_PROGRAMA": 3,
  "DAP": "DAP.999.888"
}
```

---

## Boas Práticas e Contribuição
- Ao adicionar novos módulos, siga o padrão controller/service/repository.
- Escreva testes para lógica crítica e endpoints importantes.
- Abra issues e PRs bem descritos, com passos para reproduzir e testes.

## Contato
- Mantenha o README principal atualizado com instruções específicas do deploy e responsáveis pelo projeto.

---

## Informações do Desenvolvedor
- Desenvolvedor: Renã Cantanhede
- LinkedIn: https://www.linkedin.com/in/rn-cantanhede
- GitHub: https://github.com/rn-cantanhede
- Instagram: [https://www.linkedin.com/in/rn-cantanhede](https://www.instagram.com/rn.cantanhede/)
- Propósito: Projeto desenvolvido como parte de um curso de back-end com Node.js.

---

## Informações do Projeto
- **Nome**: api_agrofamilia_pesca
- **Repositório**: [GitHub - rn-cantanhede/grupo-b-ifma](https://github.com/rn-cantanhede/grupo-b-ifma)

Última revisão: 21/01/2026
