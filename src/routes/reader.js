const express = require("express");
const {
  CreateReader,
  GetReaders,
  GetReaderById,
  UpdateReader,
  DeleteReader,
} = require("../controllers/reader");

const readerRouter = express.Router();

readerRouter.post("/readers", CreateReader);
readerRouter.get("/readers", GetReaders);
readerRouter.get("/readers/:id", GetReaderById);
readerRouter.patch("/readers/:id", UpdateReader);
readerRouter.delete("/readers/:id", DeleteReader);

module.exports = readerRouter;
