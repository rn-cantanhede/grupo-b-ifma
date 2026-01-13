const express = require("express");
const router = express.Router();
const CategoriasController = require("../categorias.controller");

/**
 * 
 * ROTAS DE CONSULTA (GET)
 * 
 */

// Retorna todas as categorias cadastradas.
router.get("/", CategoriasController.AllCategorias);

// Busca uma categoria específica por ID ou Nome.
router.get("/:value", CategoriasController.findCategoria);

module.exports = router;