const Erros = require("../errors/Errors");

class BaseService {

    /**
     * Filtra um ou vários registros por campo.
     * Retorna apenas os registros permitidos.
     */
    static async filterByUserLevel({
        user,
        data,
        associacoesRepository
    }) {
        const levelMap = {
            1: function () { // ADMIN
                return data;
            },

            2: function () {
                return BaseService.filterByField(
                    data,
                    "ID_SECRETARIA",
                    user.secretaria
                );
            },

            3: async function () {
                const associacao = await associacoesRepository.findbyIdSecretaria(
                    user.secretaria
                );

                return BaseService.filterByField(
                    data,
                    "ID_ASSOCIACAO",
                    associacao.ID
                );
            },

            4: function () {
                return BaseService.filterByField(
                    data,
                    "ID_PESSOA",
                    user.id
                );
            }
        };

        const handler = levelMap[user.nivel];

        if (!handler) {
            throw new Error("Nível de usuário inválido", 403);
        }

        return handler();
    }

    static filterByField(data, field, value) {
        if (!data) {
            throw new Erros("Nenhum dado encontrado", 404);
        }

        if (Array.isArray(data)) {
            const filtered = data.filter(function (item) {
                return item[field] == value;
            });

            if (!filtered.length) {
                throw new Erros("Nenhum registro encontrado", 404);
            }

            return filtered;
        }

        if (data[field] == value) {
            return data
        };

        throw new Erros("Nenhum registro encontrado", 404);
    }
}

module.exports = BaseService;