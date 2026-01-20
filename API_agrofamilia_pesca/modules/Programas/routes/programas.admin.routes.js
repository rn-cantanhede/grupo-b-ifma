const express = require("express");
const router = express.Router();
const ProgramasController = require("../programas.controller");

/**
 *  
 * ROTAS DE CONSULTA (GET)
 *  
 */

//Rota responsável por listar todos os programas cadastrados.
router.get("/", ProgramasController.AllProgramas);

/*
 * Rota responsável por buscar um programa específico
 * pelo ID ou pelo nome, conforme o valor informado.
 */

router.get("/:value", ProgramasController.findProgramas);

/*
 * Rota responsável por buscar programas vinculados
 * a uma secretaria específica.
 */

router.get("/secretaria/:secretaria", ProgramasController.findSecretariaPrograma);

/*
 * Rota responsável por buscar programas filtrando
 * pelo estado.
 */

router.get("/estado/:estado", ProgramasController.findEstadoPrograma);

/*
 * Rota responsável por buscar programas filtrando
 * pela origem do recurso financeiro.
 */

router.get("/recurso/:recurso", ProgramasController.findOrigemRecursoPrograma);

/*
 * Rota responsável por buscar programas com base
 * na data de início.
 */

router.get("/data-inicio/:data", ProgramasController.findDataInicioPrograma);

/*
 * Rota responsável por buscar programas com base
 * na data de término.
 */

router.get("/data-fim/:data", ProgramasController.findDataFimPrograma);

/**
 *  
 * ROTAS DE CRIAÇÃO (POST)
 *  
 */

/*
 * Rota responsável por criar um novo programa.
 */

router.post("/new", ProgramasController.createPrograma);

/**
 *  
 * ROTAS DE ATUALIZAÇÃO (PUT)
 *  
 */
/*
 * Rota responsável por atualizar um programa existente
 * com base no seu ID.
 */

router.put("/update/:id", ProgramasController.updatePrograma);

/**
 *  
 * ROTAS DE REMOÇÃO (DELETE)
 *  
 */

/*
 * Rota responsável por remover um programa do sistema
 * com base no seu ID.
 */

router.delete("/delete/:id", ProgramasController.deletePrograma);

module.exports = router;