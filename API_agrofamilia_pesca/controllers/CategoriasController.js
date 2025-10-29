const Categorias = require("../model/Categorias");

class CategoriasController {
    async Categorias(req, res){
        try {
            const categorias = await Categorias.findCategorias();
            res.status(200).json(categorias);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
};

module.exports = new CategoriasController();