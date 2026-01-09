const express = require("express");
const router = express.Router();
const TipoProdutoController = require("../tipos-produtos.controller");

/**
 * ================================
 * ROTAS DE CONSULTA (GET)
 * ================================
 */

//Retorna todos os tipos de produto.
router.get("/", TipoProdutoController.findallTipoProduto);

//Busca tipo de produto por ID ou Nome.
router.get("/:value", TipoProdutoController.findTipoProduto);

/**
 * ================================
 * ROTAS DE CRIAÇÃO (POST)
 * ================================
 */

//Cria um novo tipo de produto.
router.post("/new", TipoProdutoController.insertCategoria);

module.exports = router;