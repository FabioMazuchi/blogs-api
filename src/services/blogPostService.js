const { BlogPost, User, Category } = require('../database/models');

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return blogPosts;
};

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

module.exports = {
  getAll,
  getById,
};
