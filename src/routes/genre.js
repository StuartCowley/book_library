const express = require("express");
const {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre");

const genreRouter = express.Router();
genreRouter.route("/genres").post(createGenre).get(getGenres);
genreRouter
  .route("/genres/:id")
  .get(getGenreById)
  .patch(updateGenre)
  .delete(deleteGenre);

module.exports = genreRouter;
