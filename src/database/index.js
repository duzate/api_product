const Sequelize = require('sequelize');

const User = require('../app/models/User');
const Product = require('../app/models/Product');

const databaseConfig = require('../config/database');

const models = [User, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();
