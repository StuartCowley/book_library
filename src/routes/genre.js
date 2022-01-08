const express = require("express");
const {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre");

const genreRouter = express.Router();

genreRouter.post("/genres", createGenre);
genreRouter.get("/genres", getGenres);
genreRouter.get("/genres/:id", getGenreById);
genreRouter.patch("/genres/:id", updateGenre);
genreRouter.delete("/genres/:id", deleteGenre);

module.exports = genreRouter;
