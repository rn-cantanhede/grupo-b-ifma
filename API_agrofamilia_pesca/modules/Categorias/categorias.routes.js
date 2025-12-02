const express = require("express");
const router = express.Router();
const CategoriasController = require("./categorias.controller");

router.get("/", CategoriasController.AllCategorias);
router.get("/:value", CategoriasController.findCategoria);

router.post("/new", CategoriasController.createCategoria);

module.exports = router;