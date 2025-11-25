const express = require("express");
const router = express.Router();

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

module.exports = router;