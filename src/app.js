const express = require("express");
const {
  CreateReader,
  GetReaders,
  GetReaderById,
  UpdateReader,
  DeleteReader,
} = require("../src/controllers/reader");

const bookRouter = require("./routes/book");

const app = express();

app.use(express.json());

app.use(bookRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/reader", CreateReader);

app.get("/reader", GetReaders);

app.get("/reader/:id", GetReaderById);

app.patch("/reader/:id", UpdateReader);

app.delete("/reader/:id", DeleteReader);

module.exports = app;
