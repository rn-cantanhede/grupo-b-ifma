const express = require("express");
const request = require("supertest");
const loginLimiter = require("../../../middleware/loginLimiter");

describe("loginLimiter", () => {
    let app;

    beforeEach(() => {
        app = express();

        app.use(loginLimiter);

        app.post("/login", (req, res) => {
            res.status(200).json({
                success: true
            });
        });
    });

    /*
     * ==========================================================
     * TRUE
     * ==========================================================
     *
     */
    test("deve permitir até 5 requisições", async () => {
        for (let i = 1; i <= 5; i++) {
            const result = await request(app)
                .post("/login");

            expect(result.status).toBe(200);
        };
    });

    /*
     * ==========================================================
     * BLOCK
     * ==========================================================
     *
     */
    test("deve bloquear a 6ª requisição", async () => {
        for (let i = 1; i <= 5; i++) {
            await request(app)
                .post("/login");
        };

        const result = await request(app)
            .post("/login");

        expect(result.status).toBe(429);

        expect(result.body).toEqual({
            error: "Muitas tentativas de login. Tente novamente mais tarde"
        });
    });

    /*
     * ==========================================================
     * HEADERS
     * ==========================================================
     *
     */
    test("deve enviar os headers de rate limit", async () => {
        const result = await request(app)
            .post("/login");

        expect(result.headers).toHaveProperty("ratelimit");
        expect(result.headers).not.toHaveProperty("x-ratelimit-limit");
        expect(result.headers).not.toHaveProperty("x-ratelimit-remaining");
    });
});