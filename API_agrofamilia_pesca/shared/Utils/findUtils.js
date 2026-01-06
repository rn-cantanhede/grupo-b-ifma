const Erros = require("../errors/Errors");

/**
 * Executa uma operação de busca usando o método fornecido.
 * Lança erro 404 quando o resultado não é encontrado.
 */

async function find(value, method) {
    const result = await method(value);

    if (!result) {
        throw new Erros("Não encontrado", 404);
    };

    return result;
};

/**
 * Realiza busca dinâmica com base no tipo do valor recebido.
 * Valores numéricos utilizam o método de busca por ID.
 * Demais valores utilizam o método de busca por nome.
 */

async function findByIdName(value, idMethod, nameMethod) {
    if (!isNaN(value)) {
        return find(value, idMethod);
    };

    return find(value, nameMethod);
};

/**
 * Executa busca por intervalo utilizando o método especificado.
 * Lança erro 404 caso nenhum registro seja retornado.
 */

async function findByInterval(inicio, fim, method) {
    const result = await method(inicio, fim);

    if (!result) {
        throw new Erros("Não encontrado", 404);
    };

    return result;
};

async function VerifyNivel({ user, admin, secretario, associacao, usuario }) {
    switch (user.nivel) {
        case 1:
            return admin();

        case 2:
            return secretario();

        case 3:
            return associacao();

        case 4:
            return usuario();

        default:
            throw new Erros("Nível de usuário inválido", 403);
    }
};

// convertString(value) {
//         const string = value.split("-");
//         const convertedString = string.join(" ");
//         return convertedString;
//     };

//     NumberOrString(value) {
//         if (isNaN(value)) {
//             return this.convertString(value);
//         } else {
//             return value;
//         };
//     };

module.exports = { find, findByIdName, findByInterval, VerifyNivel, listUsers };