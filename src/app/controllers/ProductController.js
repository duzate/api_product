const Product = require('../models/Product');

class ProductController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const products = await Product.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(products);
  }

  async store(req, res) {
    const {
      id,
      name,
      price,
      category,
      filename: img,
    } = await Product.create(req.body, req.file);

    return res.json({
      id,
      name,
      price,
      category,
      img,
    });
  }
}

module.exports = new ProductController();
