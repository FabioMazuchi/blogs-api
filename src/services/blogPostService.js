const sequelize = require('sequelize');

const { Op } = sequelize;
const { BlogPost, User, Category } = require('../database/models');

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  const erro = { status: 404, message: 'Post does not exist' };

  if (blogPost === null) throw erro;

  return blogPost;
};

const search = async (query) => {
  // https://www.codegrepper.com/code-examples/javascript/sequelize+Op.and+operator
  const blogPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
    where: {
      [Op.or]: [
        { title: { [Op.like]: query } },
        { content: { [Op.like]: query } },
      ],
    },
  });

  return blogPost;
};

const create = async (title, content, userId, published) => {
  const newPost = await BlogPost.create({ title, content, userId, published });
  const getPost = await BlogPost.findByPk(newPost.null);
  
  return getPost;
};

const verifyUser = async (id, email) => {
  const blogPost = await getById(id);
 
  const erro = { status: 401, message: 'Unauthorized user' };

  if (blogPost.user.email !== email) throw erro;
};

const update = async (id, title, content, updated) => {
  await BlogPost.update(
    { title, content, updated },
    { where: { id } },
  );

  const newPostUpdated = await getById(id); 
  
  return newPostUpdated;
};

const excluir = async (id, idToken) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  const erroPostExist = { status: 404, message: 'Post does not exist' };
  const erroUserAuth = { status: 401, message: 'Unauthorized user' };
  
  if (blogPost === null) throw erroPostExist;
  if (blogPost.user.id !== idToken) throw erroUserAuth;

  await BlogPost.destroy({ where: { id } });
};

const verifyCategoryExist = async (categoryIds) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });
  const erro = { status: 400, message: '"categoryIds" not found' };

  if (categories.length !== categoryIds.length) throw erro;
};

const addCategoriesToPost = async (id, categoryIds) => {
  const post = await BlogPost.findByPk(id);
  const categories = await Category.findAll({ where: { id: categoryIds } });

  await post.addCategories(categories);
};

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return blogPosts;
};

module.exports = {
  create,
  update,
  excluir,
  getAll,
  getById,
  addCategoriesToPost,
  verifyCategoryExist,
  verifyUser,
  search,
};
