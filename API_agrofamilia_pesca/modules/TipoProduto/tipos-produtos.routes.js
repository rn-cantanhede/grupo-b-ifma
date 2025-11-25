const express = require("express");
const router = express.Router();
const TipoProdutoController = require("./tipos-produtos.controller");

router.get("/", TipoProdutoController.AllTipoProduto);
router.get("/:value", TipoProdutoController.findTipoProduto);

module.exports = router;