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

const create = async (title, content, published, updated) => {
  const newPost = await BlogPost.create({ title, content, published, updated });
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
  getAll,
  getById,
  addCategoriesToPost,
  verifyCategoryExist,
  verifyUser,
};
