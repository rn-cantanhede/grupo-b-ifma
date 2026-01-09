const express = require("express");
const router = express.Router();
const Auth = require("../middleware/Auth");
const Authorize = require("../middleware/Authorize");

/**
 * Importação dos módulos de rotas da aplicação,
 * organizados por domínio funcional.
 */

const usuariosRoutes = require("../modules/Usuarios/routes/usuarios.secretaria.routes");

router.use(Auth);
router.use(Authorize(2));

/**
 * Registro das rotas da API por contexto de domínio.
 */

router.use("/usuarios", usuariosRoutes);

module.exports = router;