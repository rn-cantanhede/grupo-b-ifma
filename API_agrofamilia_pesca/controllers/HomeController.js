class HomeController {
    async index(req, res){
        res.send("Servidor funcionando");
    };
};

module.exports = new HomeController();