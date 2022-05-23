const blogPostService = require('../services/blogPostService');
const date = require('../utils/date');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const published = date();
    const updated = date();

    await blogPostService.verifyCategoryExist(categoryIds);
  
    const newPost = await blogPostService.create(title, content, published, updated);

    await blogPostService.addCategoriesToPost(newPost.id, categoryIds);
    
    res.status(201).json(newPost);
  } catch (e) {
    console.log('Blog create: ', e.message);
    next(e);
  }
};

const getAll = async (req, res) => {
  const blogpPsts = await blogPostService.getAll();
  
  res.status(200).json(blogpPsts);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const blogPost = await blogPostService.getById(id);
    
    res.status(200).json(blogPost);
  } catch (e) {
    console.log('Get by id blogPost: ', e.message);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
  
    const updated = date();
    const { data: { email } } = req.user;
    
    await blogPostService.verifyUser(id, email);

    const blogPostUpdated = await blogPostService.update(id, title, content, updated);
    
    res.status(200).json(blogPostUpdated);
  } catch (e) {
    console.log('Get by id blogPost: ', e.message);
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};