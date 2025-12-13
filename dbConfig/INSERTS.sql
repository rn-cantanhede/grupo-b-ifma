-- Inserindo tipos de produto
INSERT INTO TIPO_PRODUTO (NOME) VALUES
('Peixe'),
('Crustáceo'),
('Fruta'),
('Verdura'),
('Legume');

-- Inserindo produtos
INSERT INTO PRODUTO (NOME, ID_TIPO_PRODUTO) VALUES
('Tilápia', 1),
('Camarão Cinza', 2),
('Manga Rosa', 3),
('Alface Crespa', 4),
('Tomate Italiano', 5);

-- Inserindo pessoas
INSERT INTO PESSOA (NOME, CPF, GENERO, DATA_NASCIMENTO) VALUES
('João da Silva', '111.111.111-11', 'M', '1980-03-15'),
('Maria Oliveira', '222.222.222-22', 'F', '1985-07-10'),
('Carlos Santos', '333.333.333-33', 'M', '1990-12-25'),
('Ana Souza', '444.444.444-44', 'F', '1995-05-05'),
('José Pereira', '555.555.555-55', 'M', '1988-09-22');

-- Inserindo secretarias
INSERT INTO SECRETARIA (NOME, CIDADE, ESTADO, ENDERECO) VALUES
('Secretaria de Agricultura e Pesca', 'São Luís', 'MA', 'Av. dos Holandeses, 1200'),
('Secretaria de Meio Ambiente', 'Imperatriz', 'MA', 'Rua do Sol, 345'),
('Secretaria de Desenvolvimento Rural', 'Caxias', 'MA', 'Rua Central, 98'),
('Secretaria de Pesca Artesanal', 'Tutóia', 'MA', 'Av. Beira-Mar, 500'),
('Secretaria de Produção Sustentável', 'Pinheiro', 'MA', 'Rua da Matriz, 77');

-- Inserindo categorias
INSERT INTO CATEGORIA (NOME) VALUES
('Agricultura Familiar'),
('Pesca Artesanal'),
('Horticultura'),
('Fruticultura'),
('Aquicultura');

-- Inserindo associações
INSERT INTO ASSOCIACAO (NOME, ENDERECO, ID_CATEGORIA, ID_SECRETARIA) VALUES
('Associação dos Pescadores de Tutóia', 'Rua dos Pescadores, 101', 2, 4),
('Cooperativa da Agricultura Familiar de Caxias', 'Rua Verde, 12', 1, 3),
('Associação dos Fruticultores do Maranhão', 'Rua das Mangueiras, 50', 4, 1),
('Associação de Hortaliças Sustentáveis', 'Av. Rural, 40', 3, 5),
('Associação dos Aquicultores do Norte', 'Travessa Azul, 7', 5, 1);

-- Inserindo associados
INSERT INTO ASSOCIADO (ID_PESSOA, ID_ASSOCIACAO, CAF, VALIDADE_CAF) VALUES
(1, 2, 'CAF12345', '2026-01-01'),
(2, 1, 'CAF67890', '2025-12-31'),
(3, 3, 'CAF54321', '2026-03-15'),
(4, 4, 'CAF98765', '2026-05-20'),
(5, 5, 'CAF24680', '2025-10-10');

-- Inserindo localizações beneficiadas
INSERT INTO LOCALIZACAO_BENEFICIADA (ID_ASSOCIADO, LATITUDE, LONGITUDE, TITULO, DESCRICAO) VALUES
(1, -2.5300, -44.3000, 'Sítio Boa Esperança', 'Área de cultivo de mandioca e criação de peixes'),
(2, -2.7500, -42.2700, 'Praia dos Pescadores', 'Local de pesca artesanal'),
(3, -4.8500, -43.3500, 'Sítio das Mangueiras', 'Produção de frutas tropicais'),
(4, -5.0500, -45.2000, 'Horta Verde Vida', 'Plantio de hortaliças orgânicas'),
(5, -3.0500, -44.9500, 'Fazenda Água Doce', 'Criação de peixes em tanques');

-- Inserindo programas
INSERT INTO PROGRAMA (NOME, DESCRICAO, DATA_INICIO, DATA_FIM, ORIGEM_RECURSO, VLR_REPASSE, ID_SECRETARIA) VALUES
('Programa de Apoio à Agricultura Familiar', 'Incentivo à produção local', '2024-01-01', '2026-12-31', 'Governo Estadual', 150000.00, 1),
('Projeto Pescar Mais', 'Apoio à pesca artesanal', '2023-05-01', '2025-05-01', 'Governo Federal', 200000.00, 4),
('Programa Fruta Boa', 'Fomento à fruticultura regional', '2024-06-01', '2027-06-01', 'Parceria Público-Privada', 120000.00, 1),
('Horta Viva', 'Capacitação de horticultores', '2024-03-10', '2026-03-10', 'Prefeitura de Pinheiro', 90000.00, 5),
('Aquicultura Sustentável', 'Desenvolvimento da aquicultura', '2023-11-01', '2026-11-01', 'Banco do Nordeste', 175000.00, 1);

-- Inserindo agricultura familiar (ligação associado x programa)
INSERT INTO AGRICULTURA_FAMILIAR (ID_ASSOCIADO, ID_PROGRAMA, DAP) VALUES
(1, 1, 'DAP001'),
(2, 2, 'DAP002'),
(3, 3, 'DAP003'),
(4, 4, 'DAP004'),
(5, 5, 'DAP005');

-- Inserindo movimentação de produtos
INSERT INTO PRODUTO_MOVIMENTACAO (ID_LOCAL, ID_AGRICULTURA_FAMILIAR, ID_PRODUTO, QNT_PRODUZIDA, VLR_UNITARIO, DATA_MOVIMENTACAO) VALUES
(1, 1, 1, 200, 15.50, '2025-01-10'),
(2, 2, 2, 100, 25.00, '2025-02-12'),
(3, 3, 3, 300, 5.50, '2025-03-08'),
(4, 4, 4, 150, 3.20, '2025-04-15'),
(5, 5, 5, 400, 4.75, '2025-05-05');

-- Inserindo usuários
INSERT INTO USUARIO (ID_PESSOA, NIVEL, ID_SECRETARIA, LOGIN, SENHA) VALUES
(1, 1, 1, 'admin', 'senha_1'),
(2, 2, 4, 'maria_pesca', 'senha_2'),
(3, 2, 3, 'carlos_rural', 'senha_3'),
(4, 3, 5, 'ana_horta', 'senha_4'),
(5, 2, 1, 'jose_aquicultura', 'senha_5');
