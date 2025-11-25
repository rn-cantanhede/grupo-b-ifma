const express = require("express");
const router = express.Router();
const MovimentacoesController = require("./movimentacoes.controller");

router.get("/", MovimentacoesController.AllMovimentacoes);
router.get("/:id", MovimentacoesController.findByIdMovimentacoes);
router.get("/dap/:dap", MovimentacoesController.findDapMovimentacoes);
router.get("/produto/:produto", MovimentacoesController.findProdutoMovimentacoes);
router.get("/data/:data", MovimentacoesController.findDataMovimentacoes);
router.get("/data/intervalo/:inicio/:fim", MovimentacoesController.findInicioFimMovimentacoes);

module.exports = router;