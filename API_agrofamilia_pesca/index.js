const express = require("express");
const router = require("./routes/routes");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
    console.log("Servidor funcionado");
});