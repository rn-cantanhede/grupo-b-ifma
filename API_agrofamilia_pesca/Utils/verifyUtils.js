class Verify {
    notFound(res, value) {
        if (!value) {
            return res.status(404).json({ Error: "Este id não existe" });
        };
    };
    Exists(res, value) {
        if (value) {
            return res.status(403).json({ Error: "Este id já existe" });
        };
    };
};

module.exports = new Verify();
