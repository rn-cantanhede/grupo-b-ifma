const express = require("express");
const router = express.Router();
const CategoriasController = require("./categorias.controller");

router.get("/", CategoriasController.AllCategorias);
router.get("/:value", CategoriasController.findCategoria);

router.post("/new", CategoriasController.createCategoria);

router.put("/update/:id", CategoriasController.updateCategoria);

router.delete("/delete/:id", CategoriasController.deleteCategoria);

module.exports = router;