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
router.get("/agricultura-familiar/:id", AgriculturaFamiliarController.findByIdAgriculturaFamiliar);

router.get("/associacoes", AssociacoesController.AllAssociacoes);
router.get("/associacao/:id", AssociacoesController.findByIdAssociacoes);


router.get("/associados", AssociadosController.AllAssociados);
router.get("/associado/:id", AssociadosController.findByIdAssociados);

router.get("/categorias", CategoriasController.AllCategorias);
router.get("/categoria/:id", CategoriasController.findByIdCategorias);

router.get("/localizacoes-dos-beneficiados", LocalizacaoBeneficiadoController.AllLocalizacoes);
router.get("/localizacao-do-beneficiado/:id", LocalizacaoBeneficiadoController.findByIdLocalizacoes);

router.get("/pessoas", PessoasController.AllPessoas);
router.get("/pessoa/:id", PessoasController.findByIdPessoa);

router.get("/produtos", ProdutosController.AllProdutos);
router.get("/produto/:id", ProdutosController.findByIdProdutos);

router.get("/movimentacoes", MovimentacoesController.AllMovimentacoes);
router.get("/movimentacao/:id", MovimentacoesController.findByIdMovimentacoes);

router.get("/programas", ProgramasController.AllProgramas);
router.get("/programa/:id", ProgramasController.findByIdProgramas);

router.get("/secretarias", SecretariasController.AllSecretarias);
router.get("/secretaria/:id", SecretariasController.finByIdecretarias);

router.get("/tipos-produtos", TipoProdutoController.AllTipoProduto);
router.get("/tipo-produto/:id", TipoProdutoController.finByIdTipoProduto);

module.exports = router;