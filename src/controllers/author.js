const { Author } = require("../models");
const {
  createItem,
  getAll,
  getById,
  updateItem,
  deleteItem,
} = require("./helper");

const createAuthor = (req, res) => {
  createItem(Author, req.body, res);
};

const getAuthors = (req, res) => {
  getAll(Author, res);
};

const getAuthorById = (req, res) => {
  getById(Author, res, req.params.id);
};

const updateAuthor = (req, res) => {
  updateItem(Author, res, req.params.id, req.body);
};

const deleteAuthor = (req, res) => {
  deleteItem(Author, res, req.params.id);
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
