const categoriesService = require('../services/categoriesService');

const create = async (req, res) => {
  const { name } = req.body;

  const newCategorie = await categoriesService.create(name);

  res.status(201).json(newCategorie);
};

module.exports = {
    create,
};