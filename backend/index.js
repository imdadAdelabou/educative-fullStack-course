require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/index");
const { connect } = require("./database/database");

const PORT = process.env.PORT || 3000;
const app = express();

connect();
// app.use("/", (req, res, next) => res.send("Hello World !"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);
app.listen(PORT, () => console.log("Sever is launched on PORT ", PORT));