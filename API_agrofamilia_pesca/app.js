const express = require("express");
const cors = require("cors");
const routers = require("./routes/index");
const errorHandle = require("./middleware/errorHandle");

const app = express();

/**
 * Habilita o middleware de CORS para controle de acesso entre origens.
 */

app.use(cors());

/**
 * Middleware responsável por interpretar requisições JSON.
 */

app.use(express.json());

/**
 * Registro das rotas principais da aplicação.
 */

app.use("/", routers);

/**
 * Middleware global para tratamento centralizado de erros.
 * Deve ser registrado após as rotas.
 */

app.use(errorHandle);

module.exports = app;