const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const api = require("./routes/api");

const app = express();

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

module.exports = app;
