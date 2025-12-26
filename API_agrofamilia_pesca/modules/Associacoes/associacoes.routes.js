const express = require("express");
const router = express.Router();
const AssociacoesController = require("./associacoes.controller");

/**
 * ================================
 * ROTAS DE CONSULTA (GET)
 * ================================
 */

 //Rota para listar todas as associações.
router.get("/", AssociacoesController.AllAssociacoes);


//Rota para buscar uma associação específica.
router.get("/:value", AssociacoesController.findAssociacao);


// Rota para buscar associações por categoria.
router.get("/categoria/:categoria", AssociacoesController.findCategoriaAssociacao);

// Rota para buscar associações por secretaria.
router.get("/secretaria/:secretaria", AssociacoesController.findSecretariaAssociacao);

/**
 * ================================
 * ROTAS DE CRIAÇÃO (POST)
 * ================================
 */

// Rota para criar uma nova associação.
router.post("/new", AssociacoesController.createAssociacao);

/**
 * ================================
 * ROTAS DE ATUALIZAÇÃO (PUT)
 * ================================
 */
// Rota para atualizar uma associação existente.
router.put("/update/:id", AssociacoesController.updateAssociacao);

/**
 * ================================
 * ROTAS DE REMOÇÃO (DELETE)
 * ================================
 */

// Rota para excluir uma associação.
router.delete("/delete/:id", AssociacoesController.deleteAssociacao);

module.exports = router;