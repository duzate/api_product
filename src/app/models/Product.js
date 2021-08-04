const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.NUMBER,
        category: Sequelize.STRING,
        img: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Product;
