const express = require("express");
const router = express.Router();
const Auth = require("../middleware/Auth");
const Authorize = require("../middleware/Authorize");

/**
 * Importação dos módulos de rotas da aplicação,
 * organizados por domínio funcional.
 */
const secretariasRoutes = require("../modules/Secretarias/routes/secretarias.associacao.routes");
const tipoProdutoRoutes = require("../modules/TipoProduto/routes/tipos-produtos.associacao.routes")
const usuariosRoutes = require("../modules/Usuarios/routes/usuarios.associacao.routes");

router.use(Auth);
router.use(Authorize(3));

/**
 * Registro das rotas da API por contexto de domínio.
 */
router.use("/secretaria", secretariasRoutes);
router.use("/tipo-produto", tipoProdutoRoutes);
router.use("/usuarios", usuariosRoutes);

module.exports = router;