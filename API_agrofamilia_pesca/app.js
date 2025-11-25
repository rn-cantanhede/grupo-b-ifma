const express = require("express");
const cors = require("cors");
const routers = require("./routes/index");
const errorHandle = require("./middleware/errorHandle");

const app = express();

app.use(cors());
app.use("/", routers);
app.use(errorHandle);
module.exports = app;