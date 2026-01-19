-- Criação do banco de dados "db_agrofamilia_pesca"
CREATE DATABASE db_agrofamilia_pesca;

-- Seleção do banco de dados para utilização
USE db_agrofamilia_pesca;

-- Tabela que armazena os tipos de produtos (ex: peixe, fruta, etc.)
CREATE TABLE TIPO_PRODUTO (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada tipo de produto
  NOME VARCHAR(100) NOT NULL -- Nome do tipo de produto (ex: peixe, crustáceo, etc.)
);

-- Tabela que armazena os produtos em si, que estão relacionados com um tipo de produto
CREATE TABLE PRODUTO (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada produto
  NOME VARCHAR(150) NOT NULL, -- Nome do produto (ex: Tilápia, Camarão, etc.)
  ID_TIPO_PRODUTO INT, -- Chave estrangeira que faz referência ao tipo de produto
  FOREIGN KEY (ID_TIPO_PRODUTO) REFERENCES TIPO_PRODUTO(ID) -- Relacionamento com a tabela TIPO_PRODUTO
);

-- Tabela que armazena as informações das pessoas (produtores ou participantes)
CREATE TABLE PESSOA (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada pessoa
  NOME VARCHAR(150) NOT NULL, -- Nome da pessoa
  CPF VARCHAR(14) UNIQUE NOT NULL, -- CPF da pessoa (único)
  GENERO CHAR(1) NOT NULL, -- Gênero da pessoa: 'M' para Masculino, 'F' para Feminino
  DATA_NASCIMENTO DATE NOT NULL -- Data de nascimento da pessoa
);

-- Tabela que armazena as secretarias responsáveis (ex: Secretaria da Agricultura)
CREATE TABLE SECRETARIA (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada secretaria
  NOME VARCHAR(150) NOT NULL, -- Nome da secretaria
  CIDADE VARCHAR(150), -- Cidade onde a secretaria está localizada
  ESTADO CHAR(2), -- Sigla do estado (ex: SP, RJ, MG)
  ENDERECO VARCHAR(255) -- Endereço completo da secretaria
);

-- Tabela que armazena as categorias (ex: Agricultura Familiar, Pesca Artesanal)
CREATE TABLE CATEGORIA (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada categoria
  NOME VARCHAR(100) NOT NULL -- Nome da categoria (ex: Agricultura Familiar, etc.)
);

-- Tabela que armazena as associações (grupos, cooperativas) dos produtores
CREATE TABLE ASSOCIACAO (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada associação
  NOME VARCHAR(150) NOT NULL, -- Nome da associação
  ENDERECO VARCHAR(255), -- Endereço da associação
  ID_CATEGORIA INT, -- Chave estrangeira que referencia a categoria da associação
  ID_SECRETARIA INT, -- Chave estrangeira que referencia a secretaria associada
  FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA(ID), -- Relacionamento com a tabela CATEGORIA
  FOREIGN KEY (ID_SECRETARIA) REFERENCES SECRETARIA(ID) -- Relacionamento com a tabela SECRETARIA
);

-- Tabela que armazena os associados (pessoas que pertencem a uma associação)
CREATE TABLE ASSOCIADO (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada associado
  ID_PESSOA INT NOT NULL, -- Chave estrangeira que referencia a pessoa associada
  ID_ASSOCIACAO INT NOT NULL, -- Chave estrangeira que referencia a associação
  CAF VARCHAR(50), -- Código do Cadastro de Agricultura Familiar (CAF)
  VALIDADE_CAF DATE, -- Data de validade do CAF
  FOREIGN KEY (ID_PESSOA) REFERENCES PESSOA(ID), -- Relacionamento com a tabela PESSOA
  FOREIGN KEY (ID_ASSOCIACAO) REFERENCES ASSOCIACAO(ID) -- Relacionamento com a tabela ASSOCIACAO
);

-- Tabela que armazena a localização beneficiada para cada associado (geolocalização)
CREATE TABLE LOCALIZACAO_BENEFICIADA (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada localização
  ID_ASSOCIADO INT NOT NULL, -- Chave estrangeira que referencia o associado
  LATITUDE DOUBLE, -- Latitude da localização beneficiada
  LONGITUDE DOUBLE, -- Longitude da localização beneficiada
  TITULO VARCHAR(100), -- Título (nome ou descrição) da localização
  DESCRICAO VARCHAR(255), -- Descrição adicional sobre a localização
  FOREIGN KEY (ID_ASSOCIADO) REFERENCES ASSOCIADO(ID) -- Relacionamento com a tabela ASSOCIADO
);

-- Tabela que armazena informações sobre programas (subvenções, apoio a iniciativas, etc.)
CREATE TABLE PROGRAMA (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada programa
  NOME VARCHAR(150) NOT NULL, -- Nome do programa
  DESCRICAO VARCHAR(255), -- Descrição do programa
  DATA_INICIO DATE, -- Data de início do programa
  DATA_FIM DATE, -- Data de fim do programa
  ORIGEM_RECURSO VARCHAR(255), -- Origem do recurso (ex: governo, ONG, etc.)
  VLR_REPASSE DECIMAL(15,2), -- Valor de repasse financeiro do programa
  ID_SECRETARIA INT, -- Chave estrangeira que referencia a secretaria responsável pelo programa
  FOREIGN KEY (ID_SECRETARIA) REFERENCES SECRETARIA(ID) -- Relacionamento com a tabela SECRETARIA
);

-- Tabela que armazena a relação entre associados e programas
CREATE TABLE AGRICULTURA_FAMILIAR (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada registro
  ID_ASSOCIADO INT NOT NULL, -- Chave estrangeira que referencia o associado
  ID_PROGRAMA INT, -- Chave estrangeira que referencia o programa
  DAP VARCHAR(50), -- Número do Documento de Aptidão ao Pronaf (DAP)
  FOREIGN KEY (ID_ASSOCIADO) REFERENCES ASSOCIADO(ID), -- Relacionamento com a tabela ASSOCIADO
  FOREIGN KEY (ID_PROGRAMA) REFERENCES PROGRAMA(ID) -- Relacionamento com a tabela PROGRAMA
);

-- Tabela que registra a movimentação de produtos da agricultura familiar
CREATE TABLE PRODUTO_MOVIMENTACAO (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada movimentação
  ID_LOCAL INT, -- Chave estrangeira que referencia a localização beneficiada
  ID_AGRICULTURA_FAMILIAR INT, -- Chave estrangeira que referencia o agricultor familiar
  ID_PRODUTO INT, -- Chave estrangeira que referencia o produto
  QNT_PRODUZIDA INT, -- Quantidade de produto produzida
  VLR_UNITARIO DECIMAL(15,2), -- Valor unitário do produto
  DATA_MOVIMENTACAO DATE, -- Data da movimentação
  FOREIGN KEY (ID_LOCAL) REFERENCES LOCALIZACAO_BENEFICIADA(ID), -- Relacionamento com a tabela LOCALIZACAO_BENEFICIADA
  FOREIGN KEY (ID_AGRICULTURA_FAMILIAR) REFERENCES AGRICULTURA_FAMILIAR(ID), -- Relacionamento com a tabela AGRICULTURA_FAMILIAR
  FOREIGN KEY (ID_PRODUTO) REFERENCES PRODUTO(ID) -- Relacionamento com a tabela PRODUTO
);

-- Tabela de usuários (administradores, secretarias, etc.)
CREATE TABLE USUARIO (
  ID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada usuário
  ID_PESSOA INT NOT NULL, -- Chave estrangeira que referencia a pessoa do usuário
  ID_SECRETARIA INT, -- Chave estrangeira que referencia a secretaria associada ao usuário
  ID_ASSOCIACAO INT, -- Chave estrangeira que referencia a associacao associada ao usuário
  NIVEL INT, -- Nível de acesso do usuário (ex: 1 = admin, 2 = secretaria, etc.)
  LOGIN VARCHAR(50) UNIQUE NOT NULL, -- Nome de login único para o usuário
  SENHA VARCHAR(255) NOT NULL, -- Senha criptografada do usuário
  FOREIGN KEY (ID_PESSOA) REFERENCES PESSOA(ID), -- Relacionamento com a tabela PESSOA
  FOREIGN KEY (ID_ASSOCIACAO) REFERENCES ASSOCIACAO(ID), -- Relacionamento com a tabela ASSOCIACAO
  FOREIGN KEY (ID_SECRETARIA) REFERENCES SECRETARIA(ID) -- Relacionamento com a tabela SECRETARIA
);