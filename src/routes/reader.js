const express = require("express");
const {
  createReader,
  getReaders,
  getReaderById,
  updateReader,
  deleteReader,
} = require("../controllers/reader");

const readerRouter = express.Router();
readerRouter.route("/readers").post(createReader).get(getReaders);
readerRouter
  .route("/readers/:id")
  .get(getReaderById)
  .patch(updateReader)
  .delete(deleteReader);

module.exports = readerRouter;
