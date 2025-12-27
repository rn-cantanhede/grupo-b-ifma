const express = require("express");
const router = express.Router();

/**
 * Importação dos módulos de rotas da aplicação,
 * organizados por domínio funcional.
 */

const agricultura_familiarRoutes = require("../modules/AgriculturaFamiliar/agricultura-familiar.routes");
const associacoesRoutes = require("../modules/Associacoes/associacoes.routes");
const associadosRoutes = require("../modules/Associados/associados.routes");
const categoriasRoutes = require("../modules/Categorias/categorias.routes");
const localizacoesRoutes = require("../modules/LocalizacaoBeneficiado/localizacao-beneficiado.routes");
const pessoasRoutes = require("../modules/Pessoas/pessoas.routes");
const produtosRoutes = require("../modules/Produtos/produtos.routes");
const movimentacoesRoutes = require("../modules/Movimentacoes/movimentacoes.routes");
const programasRoutes = require("../modules/Programas/programas.routes");
const secretariasRoutes = require("../modules/Secretarias/secretarias.routes");
const tipos_produtosRoutes = require("../modules/TipoProduto/tipos-produtos.routes");
const usuariosRoutes = require("../modules/Usuarios/usuarios.routes");

/**
 * Registro das rotas da API por contexto de domínio.
 */

router.use("/agricultura-familiar", agricultura_familiarRoutes);
router.use("/associacoes", associacoesRoutes);
router.use("/associados", associadosRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/localizacoes", localizacoesRoutes);
router.use("/pessoas", pessoasRoutes);
router.use("/produtos", produtosRoutes);
router.use("/movimentacoes", movimentacoesRoutes);
router.use("/programas", programasRoutes);
router.use("/secretarias", secretariasRoutes);
router.use("/tipos-produtos", tipos_produtosRoutes);
router.use("/usuarios", usuariosRoutes);

module.exports = router;