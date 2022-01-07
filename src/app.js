const express = require("express");
const {
  CreateReader,
  GetReaders,
  GetReaderById,
  UpdateReader,
  DeleteReader,
} = require("../src/controllers/reader");

const bookRouter = require("./routes/book");
const readerRouter = require("./routes/reader");
const authorRouter = require("./routes/author");

const app = express();

app.use(express.json());

app.use(bookRouter);

app.use(readerRouter);
app.use(authorRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
