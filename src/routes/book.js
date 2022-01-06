const express = require("express");

const {
  CreateBook,
  GetBooks,
  GetBookById,
  UpdateBook,
  DeleteBook,
} = require("../controllers/book");
const book = require("../models/book");

const bookRouter = express.Router();

bookRouter.post("/books", CreateBook);

bookRouter.get("/books", GetBooks);

bookRouter.get("/books/:id", GetBookById);

bookRouter.patch("/books/:id", UpdateBook);

bookRouter.delete("/books/:id", DeleteBook);

module.exports = bookRouter;
