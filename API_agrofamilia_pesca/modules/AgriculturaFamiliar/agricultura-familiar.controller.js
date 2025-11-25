const AgriculturaFamiliarService = require("./agricultura-familiar.service");

class AgriculturaFamiliarController {
    async AllAgriculturaFamiliar(req, res) {
        try {
            const result = await AgriculturaFamiliarService.findAllAgriculturaFamiliar();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    async findAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.find(req.params.value);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findCafAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyCaf(req.params.caf);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };

    async findDapAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyDap(req.params.dap);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
    
    async findProgramaAgriculturaFamiliar(req, res, next) {
        try {
            const result = await AgriculturaFamiliarService.findbyPrograma(req.params.programa);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return next(error);
        };
    };
};

module.exports = new AgriculturaFamiliarController();