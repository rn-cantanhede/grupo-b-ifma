const express = require("express");
const router = express.Router();
const ProdutosController = require("./produtos.controller");

router.get("/", ProdutosController.AllProdutos);
router.get("/:value", ProdutosController.findProdutos);

router.post("/new", ProdutosController.createProduto);

router.put("/update/:id", ProdutosController.updateProduto);

module.exports = router;