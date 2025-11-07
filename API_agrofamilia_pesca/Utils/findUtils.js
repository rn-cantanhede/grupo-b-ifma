const Verify = require("./verifyUtils");

class Find {
    async findAndVerify(res, value, method) {
        try {
            const result = await method(value);

            Verify.notFound(res, result);

            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };
    
    async findAndVerifyInterval(res, inicio, fim, method) {
        try {
            const result = await method(inicio, fim);

            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ Error: "Erro interno no servidor" });
        };
    };

    convertString(value) {
        const string = value.split("-");
        const convertedString = string.join(" ");
        return convertedString;
    };

    NumberOrString(value) {
        if (isNaN(value)) {
            return this.convertString(value);
        } else {
            return value;
        };
    };
};

module.exports = new Find();