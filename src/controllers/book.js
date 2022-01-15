const { Book } = require("../models");
const {
  createItem,
  getAll,
  getById,
  updateItem,
  deleteItem,
} = require("./helper");

const createBook = (req, res) => {
  createItem(Book, req.body, res);
};

const getBooks = (req, res) => {
  getAll(Book, res);
};

const getBookById = (req, res) => {
  getById(Book, res, req.params.id);
};

const updateBook = (req, res) => {
  updateItem(Book, res, req.params.id, req.body);
};

const deleteBook = (req, res) => {
  deleteItem(Book, res, req.params.id);
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
