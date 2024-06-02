'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: models.ProductsCategory
      })
      Product.belongsToMany(models.Order, {
        through: models.OrdersProduct
      })
      Product.hasMany(models.Review)

  }
}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el nombre del producto",
        },
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce la descripción",
        },
      },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce la talla",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el precio",
        },
      },
    },
    stock: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el stock",
        },
      },
    },image: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor carga una imagen",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};