const { Reader } = require("../models");
const {
  createItem,
  getAll,
  getById,
  updateItem,
  deleteItem,
} = require("./helper");

const CreateReader = (req, res) => {
  createItem(Reader, req.body, res);
};

const GetReaders = (req, res) => {
  getAll(Reader, res);
};

const GetReaderById = (req, res) => {
  getById(Reader, res, req.params.id);
};

const UpdateReader = (req, res) => {
  updateItem(Reader, res, req.params.id, req.body);
};

const DeleteReader = (req, res) => {
  deleteItem(Reader, res, req.params.id);
};

module.exports = {
  CreateReader,
  GetReaders,
  GetReaderById,
  UpdateReader,
  DeleteReader,
};
