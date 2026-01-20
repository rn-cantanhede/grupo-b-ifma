const express = require("express");
const cors = require("cors");
const routers = require("./routes/index");
const errorHandle = require("./middleware/errorHandle");
const session = require("express-session");

const app = express();

/**
 * Habilita o middleware de CORS para controle de acesso entre origens.
 */

app.use(cors());

/**
 * Middleware para interpretar dados enviados
 *via application/x-www-form-urlencoded.
 */
app.use(express.urlencoded({ extended: false }));

/**
 * Middleware para interpretar dados enviados
 * no formato JSON no corpo da requisição.
 */
app.use(express.json());

/**
 * Configura o gerenciamento de sessão da aplicação. 
 */
app.use(session({
    name: "__Host-auth",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

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