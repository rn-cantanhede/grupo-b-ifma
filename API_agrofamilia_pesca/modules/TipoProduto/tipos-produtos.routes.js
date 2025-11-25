const express = require("express");
const router = express.Router();
const TipoProdutoController = require("./TipoProdutoController");

router.get("/", TipoProdutoController.AllTipoProduto);
router.get("/:value", TipoProdutoController.findTipoProduto);

module.exports = router;