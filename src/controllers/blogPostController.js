const blogPostService = require('../services/blogPostService');

const getAll = async (req, res) => {
  const blogpPsts = await blogPostService.getAll();
  res.status(200).json(blogpPsts);
};

module.exports = {
  getAll,
};