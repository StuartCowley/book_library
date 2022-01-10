const express = require("express");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book");

const bookRouter = express.Router();
bookRouter.route("/books").post(createBook).get(getBooks);
bookRouter
  .route("/books/:id")
  .get(getBookById)
  .patch(updateBook)
  .delete(deleteBook);

module.exports = bookRouter;
