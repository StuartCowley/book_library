const { Reader } = require("../models");

const CreateReader = (req, res) => {
  Reader.create(req.body)
    .then((reader) => {
      return res.status(201).json(reader);
    })
    .catch((err) => {
      const message = err.message;
      res.status(500).json({ error: message });
    });
};

const GetReaders = (req, res) => {
  Reader.findAll()
    .then((readers) => {
      return res.status(200).json(readers);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const GetReaderById = (req, res) => {
  Reader.findByPk(req.params.id)
    .then((reader) => {
      if (reader) {
        res.status(200).json(reader);
      } else {
        res.status(404).json({ error: "The reader could not be found." });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const UpdateReader = (req, res) => {
  Reader.update(req.body, { where: { id: req.params.id } })
    .then(([reader]) => {
      if (reader) {
        res.status(200).json(reader);
      } else {
        res.status(404).json({ error: "The reader could not be found." });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const DeleteReader = (req, res) => {
  Reader.destroy({ where: { id: req.params.id } })
    .then((reader) => {
      if (reader) {
        res.status(204).send("deleted");
      } else {
        res.status(404).json({ error: "The reader could not be found." });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  CreateReader,
  GetReaders,
  GetReaderById,
  UpdateReader,
  DeleteReader,
};
