const express = require("express");
const router = express.Router();
const MovimentacoesController = require("../movimentacoes.controller");

/**
 *  
 * ROTAS DE CONSULTA (GET)
 *  
 */
/**
 * Retorna apenas movimentações que o nivel > 1 pertence.
 * Apenas o admin tem acesso a todas as movimentações.
 * O resto das rotas seguem a mesma logica.
 */
router.get("/", MovimentacoesController.AllMovimentacoes);

// Busca uma movimentação pelo ID.
router.get("/:id", MovimentacoesController.findByIdMovimentacoes);

// Busca movimentações pelo DAP.
router.get("/dap/:dap", MovimentacoesController.findDapMovimentacoes);

// Busca movimentações por produto.
router.get("/produto/:produto", MovimentacoesController.findProdutoMovimentacoes);

// Busca movimentações por data específica.
router.get("/data/:data", MovimentacoesController.findDataMovimentacoes);

// Busca movimentações dentro de um intervalo de datas.
router.get("/data/intervalo/:inicio/:fim", MovimentacoesController.findInicioFimMovimentacoes);

/**
 *  
 * ROTAS DE CRIAÇÃO (POST)
 *  
 */

// Cria uma nova movimentação.
router.post("/new", MovimentacoesController.createMovimentacao);

/**
 *  
 * ROTAS DE ATUALIZAÇÃO (PUT)
 *  
 */

// Atualiza uma movimentação existente.
router.put("/update/:id", MovimentacoesController.updateMovimentacao);

/**
 *  
 * ROTAS DE REMOÇÃO (DELETE)
 *  
 */

// Remove uma movimentação do sistema.
router.delete("/delete/:id", MovimentacoesController.deleteMovimentacao);

module.exports = router;