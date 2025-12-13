const express = require("express");
const router = express.Router();
const ProgramasController = require("./programas.controller");

router.get("/", ProgramasController.AllProgramas);
router.get("/:value", ProgramasController.findProgramas);
router.get("/secretaria/:secretaria", ProgramasController.findSecretariaPrograma);
router.get("/estado/:estado", ProgramasController.findEstadoPrograma);
router.get("/recurso/:recurso", ProgramasController.findOrigemRecursoPrograma);
router.get("/data-inicio/:data", ProgramasController.findDataInicioPrograma);
router.get("/data-fim/:data", ProgramasController.findDataFimPrograma);

router.post("/new", ProgramasController.createPrograma);

router.put("/update/:id", ProgramasController.updatePrograma);

router.delete("/delete/:id", ProgramasController.deletePrograma);

module.exports = router;