const Erros = require("../errors/Errors");

/**
 * Converte a string passada por url em um padrão acesivel 
 * para consulta no database.
 */

function convertString(value) {
    const string = value.split("-");
    const convertedString = string.join(" ");
    return convertedString;
};

/**
 * Faz a verificação de tipo
 */

function NumberOrString(value) {
    if (isNaN(value)) {
        return true;
    } else {
        return false;
    };
};

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
    if (NumberOrString(value)) {
        const stringConverted = convertString(value);
        return find(stringConverted, nameMethod);
    };
    
    return find(value, idMethod);
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

/**
 * Recebe um objeto do service e executa verificação de nivel.
 * Executa conforme o nivel.
 * 
 * PROVISORIO. Precisa sair do findUtils.
 * Tem potencial talvez para ser um middleware
 * 
 */
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

/**
 * Faz a verificação para listar usuarios onde o a secretaria
 * ou a associção seja igual a requirida.
 * 
 * PROVISORIO
 * 
 */
function listUsers(usuarioObj, field, value) {
    if (usuarioObj.length > 1) {
        const usuariosList = [];

        for (const element of usuarioObj) {
            if (element[field] == value) {
                usuariosList.push(element);
            };
        };

        if (usuariosList == "") {
            throw new Erros("Não encontrado", 404);
        };

        return usuariosList;
    };

    console.log(usuarioObj)
    if (usuarioObj.length == 1 || usuarioObj.length == undefined) {
        if (usuarioObj[0][field] == value || usuarioObj[field] == value) {
            return usuarioObj[0];
        };
    } else {
        throw new Erros("Não encontrado", 404);
    };;
};

module.exports = { find, findByIdName, findByInterval, VerifyNivel, listUsers };