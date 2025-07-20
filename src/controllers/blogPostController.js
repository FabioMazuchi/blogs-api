const blogPostService = require('../services/blogPostService');
const date = require('../utils/date');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const published = date();  
  const { id: userId } = req.user.data;

  await blogPostService.verifyCategoryExist(categoryIds);

  const newPost = await blogPostService.create(title, content, userId, published);

  await blogPostService.addCategoriesToPost(newPost.id, categoryIds);
  
  res.status(201).json(newPost);
};

const getAll = async (req, res) => {
  const blogpPsts = await blogPostService.getAll();
  
  res.status(200).json(blogpPsts);
};

const search = async (req, res) => {
  const query = `%${req.query.q}%`;
  console.log(query);
  const blogpPsts = await blogPostService.search(query);
  
  res.status(200).json(blogpPsts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  
  const blogPost = await blogPostService.getById(id);
  
  res.status(200).json(blogPost);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updated = date();
  const { data: { email } } = req.user;
  
  await blogPostService.verifyUser(id, email);

  const blogPostUpdated = await blogPostService.update(id, title, content, updated);
  
  res.status(200).json(blogPostUpdated);
};

const excluir = async (req, res) => {
  const { id } = req.params;

  // const { data: { id: idToken } } = req.user;
  
  await blogPostService.excluir(id);
  
  res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  excluir,
  search,
};