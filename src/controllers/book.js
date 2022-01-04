const { Book } = require("../models");

const CreateBook = (req, res) => {
  Book.create(req.body)
    .then((book) => {
      return res.status(201).json(book);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const GetBooks = (req, res) => {
  Book.findAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

module.exports = { CreateBook, GetBooks };
