const express = require("express");
const router = express.Router();
const CategoriasController = require("./categorias.controller");

/**
 * ================================
 * ROTAS DE CONSULTA (GET)
 * ================================
 */

// Retorna todas as categorias cadastradas.
router.get("/", CategoriasController.AllCategorias);

// Busca uma categoria específica por ID ou Nome.
router.get("/:value", CategoriasController.findCategoria);

/**
 * ================================
 * ROTAS DE CRIAÇÃO (POST)
 * ================================
 */

// Cria uma nova categoria.
router.post("/new", CategoriasController.createCategoria);

/**
 * ================================
 * ROTAS DE ATUALIZAÇÃO (PUT)
 * ================================
 */

// Atualiza uma categoria existente.
router.put("/update/:id", CategoriasController.updateCategoria);

/**
 * ================================
 * ROTAS DE REMOÇÃO (DELETE)
 * ================================
 */

// Remove uma categoria existente.
router.delete("/delete/:id", CategoriasController.deleteCategoria);

module.exports = router;