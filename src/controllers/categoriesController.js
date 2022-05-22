const categoriesService = require('../services/categoriesService');

const create = async (req, res) => {
  const { name } = req.body;

  const newCategorie = await categoriesService.create(name);

  res.status(201).json(newCategorie);
};

const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();

  res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};