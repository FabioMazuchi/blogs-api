const PostCategories = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define(
		'PostCategories',
		{}, 
		{ timestamps: false }
	);

	PostCategories.associate = (models) => {
		models.BlogPost.belongsToMany(models.Category, {
			as: 'categories',
			through: PostCategories,
			foreignKey: 'postId',
		});

		models.Category.belongsToMany(models.BlogPost, {
			as: 'blogposts',
			through: PostCategories,
			foreignKey: 'categorieId',
			otherKey: 'postId',
		});
	};

	return PostCategories;
};

module.exports = PostCategories;