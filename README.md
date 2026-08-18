# **Agro Família Pesca (Grupo B)**

Sistema de Gerenciamento da **Agricultura Familiar e Pesca Artesanal**, desenvolvido para apoiar Secretarias Municipais e Associações no controle de produtores, programas governamentais e movimentações produtivas.

Projeto acadêmico desenvolvido no **IFMA** como parte do curso de **Especialização em Back-end com Node.js**.

## **Objetivo do Projeto**

O **Agro Família Pesca** tem como objetivo centralizar e organizar dados relacionados à agricultura familiar e pesca artesanal, oferecendo:

* Controle de acesso por nível de usuário

* Segurança institucional

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
  
* **bcryptjs**
  
* **Pino**
  
* **Pino HTTP**
  
* **express-rate-limit**
  
* **dotenv**
  
* **nodemon**

### **Ferramentas de Teste**

* Insomnia

* Postman

## **Requisitos do Sistema**

* Node.js

* MySQL

* NPM ou Yarn

* Insomnia ou Postman (para testes)

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

### Configuração do Banco de Dados

A aplicação realiza automaticamente a configuração da estrutura do banco de dados durante a inicialização.

O versionamento da estrutura utiliza Knex Migrations, enquanto os dados iniciais são gerenciados através de Knex Seeds.

Não é necessário executar scripts SQL manualmente para preparar o banco de dados.

## **Executando a API**

`npm start`

Ou em modo desenvolvimento:

`nodemon server.js`

Servidor iniciado em:

`http://localhost:3000`

## **Autenticação**

A autenticação utiliza **JWT (JSON Web Token)**.

### Login

`POST /login`

#### Payload

```json
{
  "LOGIN": "admin",
  "SENHA": "senha_1"
}
```

Retorno:

* JWT válido por **7 dias**

* Token deve ser enviado no header `Authorization: Bearer <token>`

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

- **BaseScope**
  - Aplicação dos filtros de escopo diretamente nas consultas
  - Restrição dos dados de acordo com o contexto de acesso do usuário

- **Policy**
  - Autorização por nível de acesso

- **Shared**
  - Recursos reutilizáveis

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
- Senhas protegidas com `bcryptjs`;
- Controle de acesso baseado em RBAC;
- Escopo de dados aplicado diretamente nas consultas;
- Rate limiting na rota de login;
- Validação de IDs antes de operações destrutivas;
- Logs estruturados para auditoria e diagnóstico;
- Política de segurança documentada em `SECURITY.md`.

A aplicação segue o princípio de **Defense in Depth**, combinando diferentes mecanismos de proteção em suas camadas.

## **Boas Práticas Adotadas**

* Controllers sem regra de negócio

* Services concentram validações e lógica

* Repositories não acessam `req` ou `res`

* Uso de **views SQL para leitura**

* Escrita apenas em tabelas base

* Validação de IDs antes de operações destrutivas

* Segurança em profundidade (*Defense in Depth*)
  
* Logs estruturados com `Pino`
  
* Logging HTTP com `Pino HTTP`
  
* Rate limiting para autenticação
  
* Aplicação de escopo diretamente nas consultas
  
* Separação entre autorização e regras de negócio


## **Documentação**

* **Documento Acadêmico Completo**: disponível em `docs/Documentação-Agro-família-Pesca.md`

* **Manual Técnico Detalhado**: `docs/Manual-Tecnico.md`

* Este README: visão geral e quick start


## **Créditos**

Projeto desenvolvido pelo **Grupo B – IFMA**

**Autor / Mantenedor:**  
 **Renã Cantanhede**

* GitHub: [https://github.com/rn-cantanhede](https://github.com/rn-cantanhede)

* LinkedIn: [https://www.linkedin.com/in/rn-cantanhede](https://www.linkedin.com/in/rn-cantanhede)


## **Observação Final**

Este projeto foi desenvolvido com **finalidade acadêmica**, mas segue padrões profissionais de mercado, podendo servir como base para sistemas institucionais e governamentais reais.

