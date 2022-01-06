const { Book } = require("../models");

const CreateBook = (req, res) => {
  Book.create(req.body)
    .then((book) => {
      return res.status(201).json(book);
    })
    .catch((err) => {
      const message = err.message;
      res.status(500).json({ error: message });
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

const GetBookById = (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "The book could not be found." });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const UpdateBook = (req, res) => {
  Book.update(req.body, { where: { id: req.params.id } })
    .then(([book]) => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "The book could not be found." });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const DeleteBook = (req, res) => {
  Book.destroy({ where: { id: req.params.id } })
    .then((book) => {
      if (book) {
        res.status(204).send("Deleted");
      } else {
        res.status(404).json({ error: "The book could not be found." });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { CreateBook, GetBooks, GetBookById, UpdateBook, DeleteBook };
