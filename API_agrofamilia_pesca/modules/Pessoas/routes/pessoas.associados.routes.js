const express = require("express");
const router = express.Router();
const PessoasController = require("../pessoas.controller");

/**
 * ================================
 * ROTAS DE CONSULTA (GET)
 * ================================
 */
/**
 * Retorna apenas pessoas que o nivel > 1 pertence.
 * Apenas o admin tem acesso a todas as pessoas.
 * O resto das rotas seguem a mesma logica.
 */
router.get("/", PessoasController.AllPessoas);

//Rota responsável por buscar uma pessoa pelo ID ou nome.
router.get("/:value", PessoasController.findPessoa);

//Rota responsável por listar pessoas filtrando pelo gênero.
router.get("/genero/:genero", PessoasController.findGeneroPessoa);

//Rota responsável por listar pessoas filtrando pela data de nascimento.
router.get("/data/:data", PessoasController.findDataPessoa);

//Rota responsável por listar pessoas dentro de um intervalo de datas.
router.get("/data/intervalo/:inicio/:fim", PessoasController.findInicioFimPessoa);

module.exports = router;