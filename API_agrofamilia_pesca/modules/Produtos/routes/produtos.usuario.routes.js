const express = require("express");
const router = express.Router();
const ProdutosController = require("../produtos.controller");

/**
 * 
 * ROTAS DE CONSULTA (GET)
 * 
 */

// Retorna a lista completa de produtos.
router.get("/", ProdutosController.AllProdutos);

//Busca produtos pelo ID ou pelo nome.
router.get("/:value", ProdutosController.findProdutos);

module.exports = router;