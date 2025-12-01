const express = require("express");
const router = express.Router();
const PessoasController = require("./pessoas.controller");

router.get("/", PessoasController.AllPessoas);
router.get("/:value", PessoasController.findPessoa);
router.get("/genero/:genero", PessoasController.findGeneroPessoa);
router.get("/data/:data", PessoasController.findDataPessoa);
router.get("/data/intervalo/:inicio/:fim", PessoasController.findInicioFimPessoa);

router.post("/new", PessoasController.createPessoa);

module.exports = router;