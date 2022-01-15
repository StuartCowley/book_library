const express = require("express");
const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author");

const authorRouter = express.Router();

authorRouter.route("/authors").post(createAuthor).get(getAuthors);

authorRouter
  .route("/authors/:id")
  .get(getAuthorById)
  .patch(updateAuthor)
  .delete(deleteAuthor);

module.exports = authorRouter;
