const { Category } = require('../database/models');

const create = async (name) => {
  const newCategorie = await Category.create({ name });

  const obj = { id: newCategorie.null, name };
  return obj;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  create,
  getAll,
};