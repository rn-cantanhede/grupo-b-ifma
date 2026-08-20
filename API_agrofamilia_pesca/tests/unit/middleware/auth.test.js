// Mocka o módulo jsonwebtoken.
//
// Isso significa que NÃO vamos utilizar um JWT real durante
// o teste. Nós vamos controlar manualmente o comportamento
// de jwt.verify().

jest.mock("jsonwebtoken");

const jwt = require("jsonwebtoken");
const auth = require("../../../middleware/Auth");

describe("Middleware auth", () => {

    /*
     * Antes de cada teste, limpamos os mocks.
     *
     * Isso é importante porque um teste não deve interferir
     * 
     */
    beforeEach(() => {
        jest.clearAllMocks();
    });


    /*
     * ==========================================================
     * TESTE 1
     * ==========================================================
     *
     * Cenário:
     *
     * O cliente tenta acessar uma rota protegida, mas não
     * envia o header Authorization.
     *
     * Esperamos que:
     *
     * 1. O middleware chame next() com um erro;
     * 2. O erro tenha status 401;
     * 3. O erro tenha a mensagem correta;
     * 4. O evento seja registrado no log.
     */
    test("deve rejeitar requisição sem token", () => {

        /*
         * Criamos manualmente um objeto req.
         *
         * Não precisamos criar uma requisição HTTP real.
         *
         * O middleware só precisa dessas propriedades:
         *
         * req.headers
         * req.log
         */
        const req = {

            // Não existe Authorization.
            headers: {},

            // Mockamos o logger.
            //
            // jest.fn() cria uma função falsa que podemos
            // verificar depois para saber se foi chamada.
            log: {
                warn: jest.fn(),
                info: jest.fn(),
                error: jest.fn()
            }
        };

        // O middleware não utiliza res neste cenário,
        // mas precisamos fornecer o parâmetro.
        const res = {};

        /*
         * Mock do next().
         *
         * O Express normalmente fornece essa função.
         *
         * Como estamos fora do Express, criamos uma função
         * falsa para verificar como o middleware a utiliza.
         */
        const next = jest.fn();


        // Executa o middleware.
        auth(req, res, next);


        /*
         * Verifica se next() foi chamado.
         *
         * Como houve um erro, esperamos:
         *
         * next(error)
         */
        expect(next).toHaveBeenCalled();


        /*
         * mock.calls contém todas as chamadas realizadas
         * na função mockada.
         *
         * Exemplo:
         *
         * next(error)
         *
         * vira:
         *
         * next.mock.calls[0][0]
         *
         * primeiro call -> [0]
         * primeiro argumento -> [0]
         */
        const error = next.mock.calls[0][0];


        // Verifica a mensagem do erro.
        expect(error.message).toBe(
            "Token não informado"
        );

        // Verifica o status HTTP.
        expect(error.statusCode).toBe(401);


        /*
         * Verifica se o logger registrou o evento correto.
         *
         * expect.objectContaining() permite verificar apenas
         * algumas propriedades do objeto.
         */
        expect(req.log.warn).toHaveBeenCalledWith(
            expect.objectContaining({
                event: "AUTH_TOKEN_WARN",
                resource: "authentication",
                action: "login"
            }),
            "Token não informado"
        );
    });


    /*
     * ==========================================================
     * TESTE 2
     * ==========================================================
     *
     * Cenário:
     *
     * O usuário envia um token válido.
     *
     * Como não queremos gerar um JWT real, fazemos o mock
     * de jwt.verify().
     *
     * Quando o middleware chamar:
     *
     * jwt.verify(token, secret)
     *
     * o Jest vai devolver o objeto que definirmos abaixo.
     */
    test("deve aceitar um token válido", () => {

        /*
         * Simula o resultado de um JWT válido.
         *
         * Normalmente isso seria retornado pelo jwt.verify().
         */
        jwt.verify.mockReturnValue({
            id: 10,
            nivel: 4
        });


        // Criamos uma requisição falsa.
        const req = {

            headers: {

                /*
                 * Simula:
                 *
                 * Authorization: Bearer token-falso
                 */
                authorization: "Bearer token-falso"
            },

            // Mock do sistema de logs.
            log: {
                warn: jest.fn(),
                info: jest.fn(),
                error: jest.fn()
            }
        };

        const res = {};

        // Mock do next().
        const next = jest.fn();


        // Executa o middleware.
        auth(req, res, next);


        /*
         * Verifica se jwt.verify() recebeu exatamente
         * o token e o secret esperados.
         */
        expect(jwt.verify).toHaveBeenCalledWith(
            "token-falso",
            process.env.JWT_SECRET
        );


        /*
         * O middleware faz:
         *
         * req.user = decoded;
         *
         * Portanto, depois da execução, req.user deve
         * conter os dados retornados pelo jwt.verify().
         */
        expect(req.user).toEqual({
            id: 10,
            nivel: 4
        });


        /*
         * Como o token é válido, o middleware deve chamar
         * next() sem nenhum erro.
         */
        expect(next).toHaveBeenCalledWith();


        /*
         * Verifica se o login/autenticação bem-sucedida
         * foi registrada no log.
         */
        expect(req.log.info).toHaveBeenCalled();
    });


    /*
     * ==========================================================
     * TESTE 3
     * ==========================================================
     *
     * Cenário:
     *
     * O usuário envia um token inválido ou expirado.
     *
     * Nesse caso jwt.verify() lança uma exceção.
     *
     * O middleware deve capturar essa exceção no catch.
     */
    test("deve rejeitar token inválido", () => {

        /*
         * Faz jwt.verify() lançar um erro.
         *
         * Isso simula o comportamento real do jsonwebtoken
         * quando o token é inválido ou expirado.
         */
        jwt.verify.mockImplementation(() => {
            throw new Error("invalid token");
        });


        // Requisição falsa.
        const req = {

            headers: {
                authorization: "Bearer token-invalido"
            },

            // Logger falso.
            log: {
                warn: jest.fn(),
                info: jest.fn(),
                error: jest.fn()
            }
        };

        const res = {};

        // Mock do next().
        const next = jest.fn();


        // Executa o middleware.
        auth(req, res, next);


        /*
         * O middleware deve capturar a exceção e chamar:
         *
         * next(new Erros(...))
         */
        expect(next).toHaveBeenCalled();


        // Recupera o erro enviado para next().
        const error = next.mock.calls[0][0];


        // Verifica a mensagem.
        expect(error.message).toBe(
            "Token inválido ou expirado"
        );


        // Verifica o status HTTP.
        expect(error.statusCode).toBe(401);


        /*
         * Como o token é inválido, o middleware também
         * deve registrar um erro no logger.
         */
        expect(req.log.error).toHaveBeenCalledWith(
            expect.objectContaining({
                event: "AUTH_TOKEN_ERROR",
                resource: "authentication",
                action: "login"
            }),
            "Token inválido ou expirado"
        );
    });

});