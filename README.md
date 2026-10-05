# **Agro Família Pesca (Grupo B)**

Sistema de Gerenciamento da **Agricultura Familiar e Pesca Artesanal**, desenvolvido para apoiar Secretarias Municipais e Associações no controle de produtores, programas governamentais e movimentações produtivas.

Projeto acadêmico desenvolvido no **IFMA** como parte do curso de **Especialização em Back-end com Node.js**.

## **Objetivo do Projeto**

O **Agro Família Pesca** tem como objetivo centralizar e organizar dados relacionados à agricultura familiar e pesca artesanal, oferecendo:

* Controle de acesso por nível de usuário
* Controle de escopo dos dados
* Autenticação e gerenciamento de sessões
* Segurança institucional
* Paginação das consultas
* Respostas padronizadas com HATEOAS
* Organização modular
* Base sólida para futuras expansões tecnológicas no setor público

## **Estrutura do Repositório**

`grupo-b-ifma/`

`├── API_agrofamilia_pesca/   # API principal (completa)`

`├── API_Simplificada/        # API reduzida (didática)`

`├── consumo/                 # Front-end estático para testes`

`└── docs/                    # Documentação acadêmica e técnica`

### **Foco do Sistema**

Este repositório possui múltiplos projetos, porém o **núcleo funcional e completo** está na pasta: **`API_agrofamilia_pesca`**

## **Tecnologias Utilizadas**

### **Backend**

* **Node.js**
* **Express.js**
* **MySQL**
* **Knex.js**
* **JWT (JSON Web Token)**
* **express-session**
* **connect-redis**
* **redis**
* **bcryptjs**
* **Pino**
* **Pino HTTP**
* **express-rate-limit**
* **dotenv**
* **nodemon**

### **Testes e Qualidade**

* **Jest**
* **Supertest**
* **@types/jest**
* **GitHub Actions / CI**

### **Ferramentas de Teste da API**

* Insomnia
* Postman

## **Requisitos do Sistema**

* Node.js
* MySQL
* NPM ou Yarn
* Insomnia ou Postman (para testes)

### **Redis — Opcional**

O Redis pode ser utilizado como armazenamento externo para as sessões da aplicação.

A utilização do Redis **não é obrigatória** para executar o projeto. Quando habilitado, é necessário possuir um servidor Redis em execução e configurar a variável `REDIS_URL`.

O pacote `redis` utilizado pelo Node.js é apenas o cliente de comunicação com o servidor Redis; ele não instala ou executa o servidor Redis.

## **Instalação e Execução**

### **Clonar o repositório**

`git clone https://github.com/rn-cantanhede/grupo-b-ifma`

`cd API_agrofamilia_pesca`

### **Instalar dependências**

`npm install`

## **Configuração do Banco de Dados**

### **Criar arquivo `.env`**

Na raiz de `API_agrofamilia_pesca`:

`PORT=3000`

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASSWORD=senha`

`DB_NAME=db_agrofamilia_pesca`

`SESSION_SECRET=chave_secreta`

`REDIS_URL=redis://localhost:6379`

> `REDIS_URL` é necessária apenas quando a persistência de sessões através do Redis estiver habilitada.

### **Configuração do Banco de Dados**

A aplicação realiza automaticamente a configuração da estrutura do banco de dados durante a inicialização.

O versionamento da estrutura utiliza Knex Migrations, enquanto os dados iniciais são gerenciados através de Knex Seeds.

Não é necessário executar scripts SQL manualmente para preparar o banco de dados.

## **Executando a API**

`npm start`

Ou em modo desenvolvimento:

`nodemon server.js`

Servidor iniciado em:

`http://localhost:3000`

## **Autenticação e Gerenciamento de Sessões**

A API utiliza **JWT (JSON Web Token)** em conjunto com gerenciamento persistente de sessões.

O sistema possui:

* Access token;
* Refresh token;
* Registro das sessões no banco de dados;
* Controle de sessões revogadas, expiradas ou inexistentes;
* Validação de inconsistências entre os dados da sessão e do token;
* Renovação/reutilização do refresh token enquanto válido;
* Gerenciamento de cookies de autenticação;
* Possibilidade de persistência das sessões através do Redis.

### Login

`POST /login`

#### Payload

```json
{
  "LOGIN": "admin",
  "SENHA": "senha_1"
}
```

Após a autenticação, o sistema gera os tokens necessários e registra/controla a sessão correspondente.

As informações de autenticação são utilizadas pelo middleware de autenticação para validar a sessão e autorizar as requisições protegidas.

## **Estrutura da API Principal**

`API_agrofamilia_pesca/`

`├── modules/`

`│   ├── usuarios/`

`│   ├── secretarias/`

`│   ├── associacoes/`

`│   ├── produtos/`

`│   ├── movimentacoes/`

`│   └── programas/`

`├── shared/`

`├── database/`

`├── config/`

`├── middleware/`

`└── routes/`

### **Padrão Arquitetural**

A API segue uma **Arquitetura Monolítica Modular**, baseada em camadas bem definidas:

- **Controller**
  - Entrada e resposta das requisições
  - Não contém regras de negócio

- **Service**
  - Regras de negócio
  - Validações
  - Orquestração das operações

- **Repository**
  - Acesso ao banco
  - Consultas através de tabelas e views
  - Fallback para consultas alternativas quando uma view não puder ser utilizada

- **BaseScope**
  - Aplicação dos filtros de escopo diretamente nas consultas
  - Restrição dos dados de acordo com o contexto de acesso do usuário

- **Policy**
  - Autorização por nível de acesso

- **Shared**
  - Recursos reutilizáveis

## **Paginação**

As consultas da API possuem suporte a paginação, incluindo validação dos parâmetros e padronização dos resultados paginados.

A paginação foi aplicada aos principais módulos de consulta, reduzindo a quantidade de registros carregados e processados em uma única requisição.

Entre os recursos relacionados estão:

* Middleware de validação de paginação;
* Paginação nas consultas compartilhadas;
* Integração da paginação com consultas com escopo;
* Compatibilidade com consultas existentes durante a transição;
* Padronização do retorno das consultas paginadas.

## **HATEOAS**

A API utiliza **HATEOAS (Hypermedia as the Engine of Application State)** para adicionar links de navegação às respostas dos recursos.

A implementação busca padronizar os links retornados pelos endpoints e facilitar a navegação entre recursos relacionados.

A geração dos links foi integrada aos controllers e utiliza funções auxiliares para conversão e construção dos parâmetros necessários.

## **Controle de Escopo de Dados**

A API utiliza o `BaseScope` para aplicar restrições de acesso diretamente nas consultas ao banco de dados.

Diferentemente da abordagem anterior, na qual os dados eram consultados e filtrados posteriormente pela aplicação, o `BaseScope` incorpora as condições de escopo à própria consulta.

Isso proporciona:

- Redução da quantidade de dados retornados pelo banco;
- Menor processamento desnecessário na aplicação;
- Melhor desempenho das consultas;
- Maior isolamento dos dados;
- Redução do risco de exposição de registros fora do escopo autorizado.

Os endpoints que realizam consultas respeitam o escopo de acesso do usuário, incluindo o escopo **`own`**, que limita a consulta aos dados pertencentes ao próprio usuário quando aplicável.

A combinação entre `BaseScope` e paginação permite limitar tanto **quais registros podem ser acessados** quanto **quantos registros são retornados por consulta**.

## **Controle de Acesso**

A API utiliza dois mecanismos complementares:

### RBAC — Role-Based Access Control

Define quais operações cada nível de usuário pode executar.

| Nível | Perfil |
|---|---|
| 1 | Administrador |
| 2 | Secretaria |
| 3 | Associação |
| 4 | Usuário |

### Data Scoping

Além da autorização por nível, as consultas aos dados são restringidas pelo **BaseScope**, garantindo que o usuário acesse somente registros pertencentes ao seu escopo de acesso.

O escopo `own`, por exemplo, limita a consulta aos registros pertencentes ao próprio usuário quando aplicável.

## **Segurança**

A API utiliza múltiplas camadas de proteção, incluindo:

- Autenticação baseada em `JWT`;
- Gerenciamento e validação de sessões;
- Access token e refresh token;
- Senhas protegidas com `bcryptjs`;
- Controle de acesso baseado em RBAC;
- Escopo de dados aplicado diretamente nas consultas;
- Rate limiting na rota de login;
- Validação de IDs antes de operações destrutivas;
- Logs estruturados para auditoria e diagnóstico;
- Política de segurança documentada em `SECURITY.md`.

A aplicação segue o princípio de **Defense in Depth**, combinando diferentes mecanismos de proteção em suas camadas.

## **Testes Automatizados**

O projeto utiliza **Jest** e **Supertest** para automatização dos testes.

Os testes abrangem, entre outros:

* Middleware de autenticação;
* Autorização;
* Paginação;
* Tratamento de erros;
* Rate limiting do login;
* Consultas com e sem escopo;
* Operações de inserção, atualização e exclusão;
* Login e validações relacionadas à sessão;
* Operações compartilhadas do `DBUtils`.

Os testes também são utilizados como parte do fluxo de integração contínua.

## **Integração Contínua**

O projeto possui um workflow de **CI** configurado através do GitHub Actions.

O processo automatizado permite executar os testes do projeto e identificar regressões durante o desenvolvimento.

## **Fallback nos Repositories**

Os repositories que utilizam views possuem mecanismos de **fallback** para determinadas consultas.

Quando uma view não puder ser utilizada, o repository pode executar uma consulta alternativa, aumentando a resiliência da camada de persistência.

Essa abordagem mantém a separação entre a lógica de negócio e os detalhes de acesso ao banco.

## **Boas Práticas Adotadas**

* Controllers sem regra de negócio
* Services concentram validações e lógica
* Repositories não acessam `req` ou `res`
* Uso de **views SQL para leitura**
* Fallback para consultas quando necessário
* Escrita apenas em tabelas base
* Validação de IDs antes de operações destrutivas
* Segurança em profundidade (*Defense in Depth*)
* Logs estruturados com `Pino`
* Logging HTTP com `Pino HTTP`
* Rate limiting para autenticação
* Aplicação de escopo diretamente nas consultas
* Paginação das consultas
* Separação entre autorização e regras de negócio
* Testes automatizados com Jest e Supertest
* Integração contínua com GitHub Actions
* Padronização das respostas através de HATEOAS

## **Documentação**

* **Documento Acadêmico Completo**: disponível em `docs/Documentação-Agro-família-Pesca.md`
* **Manual Técnico Detalhado**: `docs/Manual-Tecnico.md`
* Este README: visão geral e quick start

## **Créditos**

Projeto desenvolvido pelo **Grupo B – IFMA**

**Autor / Mantenedor:**  
 **Renã Cantanhede**

* GitHub: https://github.com/rn-cantanhede
* LinkedIn: https://www.linkedin.com/in/rn-cantanhede

## **Observação Final**

Este projeto foi desenvolvido com **finalidade acadêmica**, mas segue padrões profissionais de mercado, podendo servir como base para sistemas institucionais e governamentais reais.

A versão atual representa uma evolução significativa da API, especialmente em **paginação, testes automatizados, gerenciamento de sessões, controle de escopo, HATEOAS, resiliência da camada de persistência e integração contínua**, mantendo a arquitetura modular como base para futuras evoluções.
