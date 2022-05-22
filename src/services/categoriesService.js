const { Category } = require('../database/models');

const create = async (name) => {
  const newCategorie = await Category.create({ name });

  const obj = { id: newCategorie.null, name };
  return obj;
};

module.exports = {
    create,
};