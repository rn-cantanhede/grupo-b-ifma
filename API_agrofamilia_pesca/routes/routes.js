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
router.get("/agricultura-familiar/dap/:dap", AgriculturaFamiliarController.findDapAgriculturaFamiliar);
router.get("/agricultura-familiar/programa/:programa", AgriculturaFamiliarController.findProgramaAgriculturaFamiliar);

router.get("/associacoes", AssociacoesController.AllAssociacoes);
router.get("/associacao/:value", AssociacoesController.findAssociacao);
router.get("/associacao/categoria/:categoria", AssociacoesController.findCategoriaAssociacao);
router.get("/associacao/secretaria/:secretaria", AssociacoesController.findCSecretariaAssociacao);

router.get("/associados", AssociadosController.AllAssociados);
router.get("/associado/:value", AssociadosController.findAssociado);
router.get("/associado/caf/:caf", AssociadosController.findCafAssociado);
router.get("/associado/dap/:dap", AssociadosController.findDapAssociado);
router.get("/associado/associacao/:associacao", AssociadosController.findAssociacaoAssociado);
router.get("/associado/data/:data", AssociadosController.findDataAssociado);
router.get("/associado/data/intervalo/:inicio/:fim", AssociadosController.findInicioFimAssociado);

router.get("/categorias", CategoriasController.AllCategorias);
router.get("/categoria/:value", CategoriasController.findAssociacao);

router.get("/localizacoes-dos-beneficiados", LocalizacaoBeneficiadoController.AllLocalizacoes);
router.get("/localizacao-do-beneficiado/:value", LocalizacaoBeneficiadoController.findLocalizacao);
router.get("/localizacao-do-beneficiado/associacao/:associacao", LocalizacaoBeneficiadoController.findAssociacaoLocalizacao);

router.get("/pessoas", PessoasController.AllPessoas);
router.get("/pessoa/:value", PessoasController.findPessoa);
router.get("/pessoa/genero/:genero", PessoasController.findGeneroPessoa);
router.get("/pessoa/data/:data", PessoasController.findDataPessoa);
router.get("/pessoa/data/intervalo/:inicio/:fim", PessoasController.findInicioFimPessoa);

router.get("/produtos", ProdutosController.AllProdutos);
router.get("/produto/:value", ProdutosController.findProdutos);
router.get("/produto/tipo/:tipo", ProdutosController.findByTipoProduto);

router.get("/movimentacoes", MovimentacoesController.AllMovimentacoes);
router.get("/movimentacao/:id", MovimentacoesController.findByIdMovimentacoes);
router.get("/movimentacao/dap/:dap", MovimentacoesController.findDapMovimentacoes);
router.get("/movimentacao/produto/:produto", MovimentacoesController.findProdutoMovimentacoes);
router.get("/movimentacao/data/:data", MovimentacoesController.findDataMovimentacoes);
router.get("/movimentacao/data/intervalo/:inicio/:fim", MovimentacoesController.findInicioFimMovimentacoes);

router.get("/programas", ProgramasController.AllProgramas);
router.get("/programa/:value", ProgramasController.findProgramas);
router.get("/programa/secretaria/:secretaria", ProgramasController.findSecretariaPrograma);
router.get("/programa/estado/:estado", ProgramasController.findEstadoPrograma);
router.get("/programa/recurso/:recurso", ProgramasController.findOrigemRecursoPrograma);
router.get("/programa/data-inicio/:data", ProgramasController.findDataInicioPrograma);
router.get("/programa/data-fim/:data", ProgramasController.findDataFimPrograma);

router.get("/secretarias", SecretariasController.AllSecretarias);
router.get("/secretaria/:value", SecretariasController.findSecretarias);
router.get("/secretaria/estado/:estado", SecretariasController.findEstadoSecretarias);
router.get("/secretaria/cidade/:cidade", SecretariasController.findCidadeSecretarias);

router.get("/tipos-produtos", TipoProdutoController.AllTipoProduto);
router.get("/tipo-produto/:value", TipoProdutoController.findTipoProduto);

module.exports = router;