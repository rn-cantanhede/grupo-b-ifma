class HomeController {
    async index(req, res){
        res.json({Msn: "Servidor funcionando"});
    };
};

module.exports = new HomeController();