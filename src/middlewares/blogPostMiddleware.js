const erro = { status: 400, message: 'Some required fields are missing' };

const titleExist = (title) => !title;
const contentExist = (content) => !content;
const categoryIdsExist = (categoryIds) => !categoryIds || categoryIds.length === 0;

const verifyData = (title, content, categoryIds) => {
  if (titleExist(title)) throw erro;
  if (contentExist(content)) throw erro;
  if (categoryIdsExist(categoryIds)) throw erro;
};

const verifyDataUpdated = (title, content) => {
  if (titleExist(title)) throw erro;
  if (contentExist(content)) throw erro;
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