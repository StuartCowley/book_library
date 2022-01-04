const express = require("express");

const { CreateBook, GetBooks } = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/book", CreateBook);

bookRouter.get("/books", GetBooks);

module.exports = bookRouter;
