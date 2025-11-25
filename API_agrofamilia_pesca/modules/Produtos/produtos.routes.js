const express = require("express");
const router = express.Router();
const ProdutosController = require("./produtos.controller");

router.get("/", ProdutosController.AllProdutos);
router.get("/:value", ProdutosController.findProdutos);

module.exports = router;