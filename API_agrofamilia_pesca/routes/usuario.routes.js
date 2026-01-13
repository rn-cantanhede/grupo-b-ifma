const express = require("express");
const router = express.Router();
const Auth = require("../middleware/Auth");
const Authorize = require("../middleware/Authorize");

/**
 * Importação dos módulos de rotas da aplicação,
 * organizados por domínio funcional.
 */
const pessoasRoutes = require("../modules/Pessoas/routes/pessoas.usuario.routes");
const produtosRoutes = require("../modules/Produtos/routes/produtos.usuario.routes");
const programasRoutes = require("../modules/Programas/routes/programas.usuario.routes");
const secretariasRoutes = require("../modules/Secretarias/routes/secretarias.usuario.routes");
const tipoProdutoRoutes = require("../modules/TipoProduto/routes/tipos-produtos.usuario.routes");
const usuariosRoutes = require("../modules/Usuarios/routes/usuarios.usuario.routes");

router.use(Auth);
router.use(Authorize(4));

/**
 * Registro das rotas da API por contexto de domínio.
 */
router.use("/pessoa", pessoasRoutes)
router.use("/produtos", produtosRoutes);
router.use("/programas", programasRoutes);
router.use("/secretaria", secretariasRoutes);
router.use("/tipo-produto", tipoProdutoRoutes);
router.use(usuariosRoutes);

module.exports = router;