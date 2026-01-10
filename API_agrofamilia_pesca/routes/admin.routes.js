const express = require("express");
const router = express.Router();
const Auth = require("../middleware/Auth");
const Authorize = require("../middleware/Authorize");


/**
 * Importação dos módulos de rotas da aplicação,
 * organizados por domínio funcional.
 */
const programasRoutes = require("../modules/Programas/routes/programas.admin.routes");
const secretariaRoutes = require("../modules/Secretarias/routes/secretarias.admin.routes");
const tipoProdutoRoutes = require("../modules/TipoProduto/routes/tipos-produtos.admin.routes");
const usuariosRoutes = require("../modules/Usuarios/routes/usuarios.admin.routes");

router.use(Auth);
router.use(Authorize(1));

/**
 * Registro das rotas da API por contexto de domínio.
 */
router.use("/programas", programasRoutes);
router.use("/secretarias", secretariaRoutes);
router.use("/tipo-produto", tipoProdutoRoutes);
router.use("/usuarios", usuariosRoutes);

module.exports = router;