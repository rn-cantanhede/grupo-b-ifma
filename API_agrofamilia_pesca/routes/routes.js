const express = require("express");
const app = express();
const router = express.Router();

const PessoasController = require("../controllers/PessoasController");
const AssociacoesController = require("../controllers/AssociacoesController");
const SecretariasController = require("../controllers/SecretariasController");
const AssociadosController = require("../controllers/AssociadosController");
const LocalizacaoBeneficiadoController = require("../controllers/LocalizacaoBeneficiadoController");
const CategoriasController = require("../controllers/CategoriasController");
const ProdutosController = require("../controllers/ProdutosController");
const MovimentacoesController = require("../controllers/MovimentacoesController");
const AgriculturaFamiliarController = require("../controllers/AgriculturaFamiliarController");
const ProgramasController = require("../controllers/ProgramasController");
const TipoProdutoController = require("../controllers/TipoProdutoController");

router.get("/agricultura-familiar", AgriculturaFamiliarController.AllAgriculturaFamiliar)
router.get("/agricultura-familiar/:value", AgriculturaFamiliarController.findAgriculturaFamiliar);
router.get("/agricultura-familiar/caf/:caf", AgriculturaFamiliarController.findCafAgriculturaFamiliar);

router.get("/associacoes", AssociacoesController.AllAssociacoes);
router.get("/associacao/:value", AssociacoesController.findAssociacao);

router.get("/associados", AssociadosController.AllAssociados);
router.get("/associado/:value", AssociadosController.findAssociado);
router.get("/associado/caf/:caf", AssociadosController.findCafAssociado);

router.get("/categorias", CategoriasController.AllCategorias);
router.get("/categoria/:value", CategoriasController.findAssociacao);

router.get("/localizacoes-dos-beneficiados", LocalizacaoBeneficiadoController.AllLocalizacoes);
router.get("/localizacao-do-beneficiado/:value", LocalizacaoBeneficiadoController.findLocalizacao);

router.get("/pessoas", PessoasController.AllPessoas);
router.get("/pessoa/:value", PessoasController.findPessoa);

router.get("/produtos", ProdutosController.AllProdutos);
router.get("/produto/:value", ProdutosController.findProdutos);

router.get("/movimentacoes", MovimentacoesController.AllMovimentacoes);
router.get("/movimentacao/:id", MovimentacoesController.findByIdMovimentacoes);

router.get("/programas", ProgramasController.AllProgramas);
router.get("/programa/:value", ProgramasController.findProgramas);

router.get("/secretarias", SecretariasController.AllSecretarias);
router.get("/secretaria/:value", SecretariasController.findSecretarias);

router.get("/tipos-produtos", TipoProdutoController.AllTipoProduto);
router.get("/tipo-produto/:value", TipoProdutoController.findTipoProduto);

module.exports = router;