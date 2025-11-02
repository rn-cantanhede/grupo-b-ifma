const Verify = require("./verifyUtils");

class Find {
    async findAndVerify(res, value, method) {
        const result = await method(value);

        Verify.notFound(res, result);

        return res.status(200).json(result);
    };
};

module.exports = new Find();