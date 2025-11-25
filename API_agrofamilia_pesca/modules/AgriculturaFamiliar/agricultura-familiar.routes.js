const express = require("express");
const router = express.Router();
const AgriculturaFamiliarController = require("./agricultura-familiar.controller");

router.get("/", AgriculturaFamiliarController.AllAgriculturaFamiliar);
router.get("/:value", AgriculturaFamiliarController.findAgriculturaFamiliar);
router.get("/caf/:caf", AgriculturaFamiliarController.findCafAgriculturaFamiliar);
router.get("/dap/:dap", AgriculturaFamiliarController.findDapAgriculturaFamiliar);
router.get("/programa/:programa", AgriculturaFamiliarController.findProgramaAgriculturaFamiliar);

module.exports = router;