const PostCategories = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define(
		'PostCategories',
		{}, 
		{ timestamps: false }
	);

	PostCategories.associate = (models) => {
		models.BlogPost.belongsToMany(models.Categorie, {
			as: 'categories',
			through: PostCategories,
			foreignKey: 'postId',
		});

		models.Categorie.belongsToMany(models.BlogPost, {
			as: 'blogposts',
			through: PostCategories,
			foreignKey: 'categorieId',
			otherKey: 'postId',
		});
	};

	return PostCategories;
};

module.exports = PostCategories;