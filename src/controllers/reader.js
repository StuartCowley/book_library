const { Reader } = require("../models");
const {
  createItem,
  getAll,
  getById,
  updateItem,
  deleteItem,
} = require("./helper");

const createReader = (req, res) => {
  createItem(Reader, req.body, res);
};

const getReaders = (req, res) => {
  getAll(Reader, res);
};

const getReaderById = (req, res) => {
  getById(Reader, res, req.params.id);
};

const updateReader = (req, res) => {
  updateItem(Reader, res, req.params.id, req.body);
};

const deleteReader = (req, res) => {
  deleteItem(Reader, res, req.params.id);
};

module.exports = {
  createReader,
  getReaders,
  getReaderById,
  updateReader,
  deleteReader,
};
