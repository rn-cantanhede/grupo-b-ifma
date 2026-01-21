# Agrofamília Pesca (Grupo B)

Bem-vindo ao repositório do **Agrofamília Pesca**, um projeto desenvolvido para auxiliar a **Secretaria de Agricultura e Pesca** e associações locais no gerenciamento de dados de produtores e pescadores.

Este projeto nasceu como parte de um **curso de especialização em Back-end com Node.js**, desenvolvido pela equipe do **Grupo B**, sendo pioneiro em sua proposta para a região.

## 🎯 Objetivo e Contexto

O sistema visa modernizar e facilitar o controle administrativo da Secretaria e Associações, sendo uma ferramenta para:
- Gerenciar o cadastro e acesso de produtores rurais e pescadores.
- Controlar informações vitais para o apoio à agricultura familiar e pesca artesanal.
- Servir de base experimental para futuras implementações tecnológicas no setor público municipal.

Atualmente, o foco do sistema é o **Gerenciamento de Acesso e Controle de Entidades (CRUD)**, garantindo que as informações base estejam seguras e organizadas.

## 🚀 Estrutura do Repositório

O projeto está modularizado para facilitar o estudo e manutenção:

- **`API_agrofamilia_pesca`**: Backend principal (Node.js + Express). Contém as regras de negócio, autenticação e acesso a dados.
- **`API_Simplificada`**: Versão alternativa da API para fins didáticos.
- **`consumo`**: Interface web simples para interação e testes dos endpoints da API(`API_Simplificada`).

## 🛠️ Tecnologias e Funcionalidades

### Backend (Node.js)
O sistema utiliza uma stack robusta baseada em JavaScript:
- **Runtime**: Node.js
- **Framework Web**: Express.js
- **Banco de Dados**: MySQL (com Knex.js para queries flexíveis)
- **Segurança**:
  - Implementação de JWT (JSON Web Tokens) para sessões seguras.
  - Hashing de senhas com `bcryptjs`.
  - Controle de CORS.
- **Outros**: `dotenv` para refatoração de configurações e `nodemon` para DX.

### Funcionalidades Atuais
- ✅ **Gerenciamento de Acesso**: Sistema de login e autenticação.
- ✅ **CRUD Completo**: Criação, leitura, atualização e exclusão de registros.
- ✅ **Segurança**: Proteção de rotas e dados sensíveis.

## ⚙️ Como Executar

### Pré-requisitos
- Node.js (LTS recomendado)
- Servidor MySQL rodando

### 1. Configurando a API (`API_agrofamilia_pesca`)

1. Acesse a pasta do backend:
   ```bash
   cd API_agrofamilia_pesca
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados:
   - Crie um arquivo `.env` na raiz da pasta `API_agrofamilia_pesca` com as credenciais do seu banco MySQL.
4. Configure o Banco de Dados:
   
   O projeto possui scripts sql para criar e popular o banco.
   Isso criará o banco `db_agrofamilia_pesca`, as tabelas, inserirá dados de teste e criar as views necessárias.
   
6. Execute o servidor:
   ```bash
   npm start
   # ou
   nodemon server.js
   ```

## 🤝 Créditos

Desenvolvido por **Grupo B** como projeto de curso.
Mantenedor: **Renã Cantanhede**
