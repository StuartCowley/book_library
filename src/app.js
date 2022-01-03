const express = require("express");
const {
  CreateReader,
  GetReaders,
  GetReaderById,
  UpdateReader,
  DeleteReader,
} = require("../src/controllers/reader");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/readers", CreateReader);

app.get("/reader", GetReaders);

app.get("/reader/:id", GetReaderById);

app.patch("/reader/:id", UpdateReader);

app.delete("/reader/:id", DeleteReader);

module.exports = app;
