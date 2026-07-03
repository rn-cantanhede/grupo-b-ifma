const environment = process.env.NODE_ENV || "development";
const mysql = require("mysql2/promise");

async function viewaDB() {

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    // Seleção do banco de dados para utilização
    await connection.changeUser({
        database: process.env.DB_NAME
    });

    // Criação da view view_pessoas
    await connection.query(`
        CREATE OR REPLACE VIEW view_pessoas AS
        SELECT p.ID, p.NOME, p.CPF, a.CAF, a.VALIDADE_CAF, ac.NOME AS ASSOCIACAO, af.DAP
        FROM pessoa p 
        JOIN associado a ON a.ID_PESSOA = p.ID
        JOIN associacao ac ON ac.ID = a.ID_ASSOCIACAO
        JOIN agricultura_familiar af ON af.ID_ASSOCIADO = a.ID;
    `);

    // Criação da view view_associacoes
    await connection.query(`
        CREATE OR REPLACE VIEW view_associacoes AS
        SELECT ac.ID, ac.NOME, cat.NOME AS CATEGORIA, sec.NOME AS SECRETARIA
        FROM associacao ac
        JOIN categoria cat ON cat.ID = ac.ID_CATEGORIA
        JOIN secretaria sec ON sec.ID = ac.ID_SECRETARIA;
    `);

    // Criação da view view_localizacao_beneficiado
    await connection.query(`
        CREATE OR REPLACE VIEW view_localizacao_beneficiado AS
        SELECT loc.ID, ps.NOME, assoc.NOME AS ASSOCIACAO, loc.LATITUDE, loc.LONGITUDE, loc.TITULO, loc.DESCRICAO
        FROM localizacao_beneficiada loc
        JOIN associado asso ON asso.ID_PESSOA = loc.ID_ASSOCIADO
        JOIN pessoa ps ON ps.ID = asso.ID_PESSOA
        JOIN associacao assoc ON assoc.ID = asso.ID_ASSOCIACAO;
    `);

    // Criação da view view_produtos
    await connection.query(`
        CREATE OR REPLACE VIEW view_produtos AS
        SELECT pro.ID, pro.NOME, tipro.NOME AS TIPO_DO_PRODUTO
        FROM produto pro
        JOIN tipo_produto tipro ON tipro.ID = pro.ID_TIPO_PRODUTO;
    `);

    // Criação da view_produto_movimentacao
    await connection.query(`
        CREATE OR REPLACE VIEW view_produto_movimentacao AS
        SELECT movi.ID, agri.DAP, pro.NOME AS PRODUTO, movi.QNT_PRODUZIDA, movi.VLR_UNITARIO, 
               movi.DATA_MOVIMENTACAO, loca.LATITUDE, loca.LONGITUDE
        FROM produto_movimentacao movi
        JOIN agricultura_familiar agri ON agri.ID = movi.ID_AGRICULTURA_FAMILIAR
        JOIN produto pro ON pro.ID = movi.ID_PRODUTO
        JOIN localizacao_beneficiada loca ON loca.ID = movi.ID_LOCAL;
    `);
    
    // Criação da view_programas
    await connection.query(`
        CREATE OR REPLACE VIEW view_programas AS
        SELECT prog.ID, prog.NOME, prog.DESCRICAO, prog.DATA_INICIO, prog.DATA_FIM,
               prog.ORIGEM_RECURSO, prog.VLR_REPASSE, sec.NOME AS SECRETARIA, sec.ESTADO
        FROM progRama prog
        JOIN secretaria sec ON sec.ID = prog.ID_SECRETARIA;
    `);
    
    // Criação da view_agricultura_familiar
    await connection.query(`
        CREATE OR REPLACE VIEW view_agricultura_familiar AS
        SELECT agri.ID, pe.NOME, asso.CAF, prog.NOME AS PROGRAMA, agri.DAP
        FROM agricultura_familiar agri
        JOIN associado asso ON asso.ID = agri.ID_ASSOCIADO
        JOIN pessoa pe ON asso.ID_PESSOA = pe.ID
        JOIN programa prog ON prog.ID = agri.ID_PROGRAMA;
    `);

    await connection.end();
}

module.exports = viewaDB;