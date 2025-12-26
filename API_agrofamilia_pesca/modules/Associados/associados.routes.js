const express = require("express");
const router = express.Router();
const AssociadosController = require("./associados.controller");

/**
 * ================================
 * ROTAS DE CONSULTA (GET)
 * ================================
 */

// Retorna todos os associados cadastrados.
router.get("/", AssociadosController.AllAssociados);

// Busca um associado por um valor genérico.
router.get("/:value", AssociadosController.findAssociado);

// Busca associados pelo número do CAF.
router.get("/caf/:caf", AssociadosController.findCafAssociado);

// Busca associados pelo número do DAP.
router.get("/dap/:dap", AssociadosController.findDapAssociado);

// Busca associados vinculados a uma associação específica.
router.get("/associacao/:associacao", AssociadosController.findAssociacaoAssociado);

// Busca associados cadastrados em uma data específica.
router.get("/data/:data", AssociadosController.findDataAssociado);

// Busca associados dentro de um intervalo de datas.
router.get("/data/intervalo/:inicio/:fim", AssociadosController.findInicioFimAssociado);

/**
 * ================================
 * ROTAS DE CRIAÇÃO (POST)
 * ================================
 */
// Cria um novo associado.
router.post("/new", AssociadosController.createAssociado);

/**
 * ================================
 * ROTAS DE ATUALIZAÇÃO (PUT)
 * ================================
 */

// Atualiza um associado existente.
router.put("/update/:id", AssociadosController.updateAssociado);

/**
 * ================================
 * ROTAS DE REMOÇÃO (DELETE)
 * ================================
 */

// Remove um associado existente.
router.delete("/delete/:id", AssociadosController.deleteAssociado);

module.exports = router;
