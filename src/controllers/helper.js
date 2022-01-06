const { Book, Reader } = require("../models");

const getModel = (model) => {
  switch (model) {
    case Book:
      return "book";
      break;
    case Reader:
      return "reader";
  }
};

const createItem = (model, input, res) => {
  model
    .create(input)
    .then((item) => {
      return res.status(201).json(item);
    })
    .catch((err) => {
      const message = err.message;
      res.status(500).json({ error: message });
    });
};

const getAll = (model, res) => {
  model
    .findAll()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const getById = (model, res, id) => {
  model
    .findByPk(id)
    .then((item) => {
      if (item) {
        res.status(200).json(item);
      } else {
        const x = getModel(model);
        res.status(404).json({ error: `The ${x} could not be found.` });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateItem = (model, res, id, newData) => {
  model
    .update(newData, { where: { id: id } })
    .then(([item]) => {
      if (item) {
        res.status(200).json(item);
      } else {
        const x = getModel(model);
        res.status(404).json({ error: `The ${x} could not be found.` });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteItem = (model, res, id) => {
  model
    .destroy({ where: { id: id } })
    .then((deletedItem) => {
      if (deletedItem) {
        res.status(204).send("Deleted");
      } else {
        const x = getModel(model);
        res.status(404).json({ error: `The ${x} could not be found.` });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { createItem, getAll, getById, updateItem, deleteItem };
