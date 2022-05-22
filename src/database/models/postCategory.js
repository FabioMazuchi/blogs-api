const PostCategories = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define("PostCategory", {
		postId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
		categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
	},
    { timestamps: false }
  );

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: "categories",
      through: PostCategories,
      foreignKey: "postId",
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: "blogposts",
      through: PostCategories,
      foreignKey: "categoryId",
      otherKey: "postId",
    });
  };

  return PostCategories;
};

module.exports = PostCategories;
