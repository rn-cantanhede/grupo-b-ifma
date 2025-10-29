const express = require("express");
const router = require("./routes/routes");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
    console.log("Servidor funcionado");0
});