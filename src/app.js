const express = require("express");
const { CreateReader } = require("../src/controllers/reader");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/readers", CreateReader);

module.exports = app;
