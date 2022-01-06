const { get } = require("express/lib/response");
const { Book } = require("../models");
const {
  createItem,
  getAll,
  getById,
  updateItem,
  deleteItem,
} = require("./helper");

const CreateBook = (req, res) => {
  createItem(Book, req.body, res);
};

const GetBooks = (req, res) => {
  getAll(Book, res);
};

const GetBookById = (req, res) => {
  getById(Book, res, req.params.id);
};

const UpdateBook = (req, res) => {
  updateItem(Book, res, req.params.id, req.body);
};

const DeleteBook = (req, res) => {
  deleteItem(Book, res, req.params.id);
};

module.exports = { CreateBook, GetBooks, GetBookById, UpdateBook, DeleteBook };
