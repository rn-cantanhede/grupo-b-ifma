const Verify = require("./verifyUtils");

class Find {
    async findAndVerify(res, value, method) {
        const result = await method(value);

        Verify.notFound(res, result);

        return res.status(200).json(result);
    };

    convertString(value){
        const string = value.split("-");
        const convertedString = string.join(" ");
        return convertedString;
    };
};

module.exports = new Find();