const { Genre } = require("../models");
const {
  createItem,
  getAll,
  getById,
  updateItem,
  deleteItem,
} = require("./helper");

const createGenre = (req, res) => {
  createItem(Genre, req.body, res);
};

const getGenres = (req, res) => {
  getAll(Genre, res);
};

const getGenreById = (req, res) => {
  getById(Genre, res, req.params.id);
};

const updateGenre = (req, res) => {
  updateItem(Genre, res, req.params.id, req.body);
};

const deleteGenre = (req, res) => {
  deleteItem(Genre, res, req.params.id);
};

module.exports = {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};
