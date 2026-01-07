CREATE OR REPLACE VIEW view_pessoas AS
SELECT p.ID, p.NOME, p.CPF, a.CAF, a.VALIDADE_CAF, ac.NOME AS ASSOCIACAO, af.DAP
FROM pessoa p 
JOIN associado a ON a.ID_PESSOA = p.ID
JOIN associacao ac ON ac.ID = a.ID_ASSOCIACAO
JOIN agricultura_familiar af ON af.ID_ASSOCIADO = a.ID;

CREATE OR REPLACE VIEW view_associacoes AS
SELECT ac.ID, ac.NOME, cat.NOME AS CATEGORIA, sec.NOME AS SECRETARIA
FROM associacao ac
JOIN categoria cat ON cat.ID = ac.ID_CATEGORIA
JOIN secretaria sec ON sec.ID = ac.ID_SECRETARIA;

CREATE OR REPLACE VIEW view_localizacao_beneficiado AS
SELECT loc.ID, ps.NOME, assoc.NOME AS ASSOCIACAO, loc.LATITUDE, loc.LONGITUDE, loc.TITULO, loc.DESCRICAO
FROM localizacao_beneficiada loc
JOIN associado asso ON asso.ID_PESSOA = loc.ID_ASSOCIADO
JOIN pessoa ps ON ps.ID = asso.ID_PESSOA
JOIN associacao assoc ON assoc.ID = asso.ID_ASSOCIACAO;

CREATE OR REPLACE VIEW view_produtos AS
SELECT pro.ID, pro.NOME, tipro.NOME AS TIPO_DO_PRODUTO
FROM produto pro
JOIN tipo_produto tipro ON tipro.ID = pro.ID_TIPO_PRODUTO;

CREATE OR REPLACE VIEW view_produto_movimentacao AS
SELECT movi.ID, agri.DAP, pro.NOME AS PRODUTO, movi.QNT_PRODUZIDA, movi.VLR_UNITARIO, 
movi.DATA_MOVIMENTACAO, loca.LATITUDE, loca.LONGITUDE
FROM produto_movimentacao movi
JOIN agricultura_familiar agri ON agri.ID = movi.ID_AGRICULTURA_FAMILIAR
JOIN produto pro ON pro.ID = movi.ID_PRODUTO
JOIN localizacao_beneficiada loca ON loca.ID = movi.ID_LOCAL;

CREATE OR REPLACE VIEW view_programas AS
SELECT prog.ID, prog.NOME, prog.DESCRICAO, prog.DATA_INICIO, prog.DATA_FIM,
prog.ORIGEM_RECURSO, prog.VLR_REPASSE, sec.NOME AS SECRETARIA, sec.ESTADO
FROM progRama prog
JOIN secretaria sec ON sec.ID = prog.ID_SECRETARIA;

CREATE OR REPLACE VIEW view_agricultura_familiar AS
SELECT agri.ID, pe.NOME, asso.CAF, prog.NOME AS PROGRAMA, agri.DAP
FROM agricultura_familiar agri
JOIN associado asso ON asso.ID = agri.ID_ASSOCIADO
JOIN pessoa pe ON asso.ID_PESSOA = pe.ID
JOIN programa prog ON prog.ID = agri.ID_PROGRAMA;

CREATE OR REPLACE VIEW view_usuarios AS
SELECT user.ID, pe.NOME, user.NIVEL, sec.NOME AS SECRETARIA, asso.NOME AS ASSOCIACAO, user.LOGIN
FROM usuario AS user
JOIN pessoa pe ON pe.ID = user.ID_PESSOA
JOIN secretaria sec ON sec.ID = user.ID_SECRETARIA
JOIN associacao asso ON asso.ID_SECRETARIA = user.ID_SECRETARIA;