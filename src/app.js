const express = require("express");

const bookRouter = require("./routes/book");
const readerRouter = require("./routes/reader");
const authorRouter = require("./routes/author");
const genreRouter = require("./routes/genre");

const app = express();

app.use(express.json());

app.use(bookRouter);
app.use(readerRouter);
app.use(authorRouter);
app.use(genreRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
