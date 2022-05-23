const data = {
  dataValid: { status: 400, message: 'Some required fields are missing' },
};

const titleExist = (title) => !title;
const contentExist = (content) => !content;
const categoryIdsExist = (categoryIds) => !categoryIds || categoryIds.length === 0;

const verifyData = (title, content, categoryIds) => {
  if (titleExist(title)) throw data.dataValid;
  if (contentExist(content)) throw data.dataValid;
  if (categoryIdsExist(categoryIds)) throw data.dataValid;
};

const verifyDataUpdated = (title, content) => {
  if (titleExist(title)) throw data.dataValid;
  if (contentExist(content)) throw data.dataValid;
};

const validate = (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    
    verifyData(title, content, categoryIds);
    
    next();
  } catch (e) {
    next(e);
  }
};

const validateUpdated = (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    verifyDataUpdated(title, content);
    
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
    validate,
    validateUpdated,
};