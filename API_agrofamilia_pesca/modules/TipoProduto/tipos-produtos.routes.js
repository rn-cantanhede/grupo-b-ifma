const express = require("express");
const router = express.Router();
const TipoProdutoController = require("./tipos-produtos.controller");

router.get("/", TipoProdutoController.findallTipoProduto);
router.get("/:value", TipoProdutoController.findTipoProduto);

router.post("/new", TipoProdutoController.insertCategoria);

router.put("/update/:value", TipoProdutoController.updateCategoria);

module.exports = router;