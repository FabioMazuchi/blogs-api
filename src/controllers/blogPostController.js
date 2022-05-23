const blogPostService = require('../services/blogPostService');

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

module.exports = {
  getAll,
  getById,
};