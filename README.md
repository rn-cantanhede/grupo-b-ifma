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

`├── dbConfig/                # Scripts SQL do banco de dados`

`└── docs/                    # Documentação acadêmica e técnica`

### 

### 

### 

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

* **dotenv**

* **nodemon**

### **Ferramentas de Teste**

* Insomnia

* Postman

## **Requisitos do Sistema**

* Node.js **14+**

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

### **Executar scripts SQL**

Os scripts estão em `dbConfig/`:

* `db_agrofamilia_pesca.sql` → Criação do banco e tabelas

* `INSERTS.sql` → Dados iniciais

* `VIEWS.sql` → Views de leitura

## **Executando a API**

`npm start`

Ou em modo desenvolvimento:

`nodemon server.js`

Servidor iniciado em:

`http://localhost:3000`

## **Autenticação**

### **Login**

`POST /login`

#### **Payload:**

`{`

  `"LOGIN": "admin",`

  `"SENHA": "123456"`

`}`

Retorno:

* JWT válido por **7 dias**

* Token deve ser enviado no header `Authorization`

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

## **Padrão Arquitetural**

A API segue uma **Arquitetura Monolítica Modular**, baseada em **camadas bem definidas**:

* **Controller**

  * Entrada da requisição

  * Não contém regra de negócio

* **Service**

  * Regras de negócio

  * Validações

  * Controle de escopo

* **Repository**

  * Acesso ao banco

  * Queries SQL / Knex

* **Policy**

  * Autorização por nível de acesso

* **Shared**

  * Recursos reutilizáveis

    

## **Controle de Acesso (RBAC)**

| Nível | Perfil |
| :---: | :---: |
| 1 | Administrador |
| 2 | Secretaria |
| 3 | Associação |
| 4 | Usuário |

O sistema aplica **escopo automático de dados**, garantindo que cada usuário visualize apenas informações compatíveis com seu nível institucional.

## **Boas Práticas Adotadas**

* Controllers sem regra de negócio

* Services concentram validações e lógica

* Repositories não acessam `req` ou `res`

* Uso de **views SQL para leitura**

* Escrita apenas em tabelas base

* Validação de IDs antes de operações destrutivas

* Segurança em profundidade (*Defense in Depth*)


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

