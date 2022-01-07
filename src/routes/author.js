const express = require("express");
const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author");

const authorRouter = express.Router();

authorRouter.post("/authors", createAuthor);
authorRouter.get("/authors", getAuthors);
authorRouter.get("/authors/:id", getAuthorById);
authorRouter.patch("/authors/:id", updateAuthor);
authorRouter.delete("/authors/:id", deleteAuthor);

module.exports = authorRouter;
