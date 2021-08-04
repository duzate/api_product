const { Router } = require('express');
const multer = require('multer');

const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const ProductController = require('./app/controllers/ProductController');

const authMiddleware = require('./app/middleware/auth');
const { async } = require('./app/controllers/ProductController');
const Product = require('./app/models/Product');

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', upload.single('avatar'), UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', upload.single('avatar'), UserController.update);

routes.get('/product/:index', async (req, res) => {
  const product = await Product.findByPk(req.params.index);
  return res.json(product);
});

routes.get('/product/category/:category', async (req, res) => {
  const product = await Product.findAll({
    where: { category: req.params.category },
  });
  return res.json(product);
});

routes.get('/product', ProductController.index);

routes.post('/product', upload.single('img'), ProductController.store);

routes.put('/product/:index', upload.single('img'), async (req, res) => {
  const product = await Product.update(req.body, {
    where: { id: req.params.index },
  });
  return res.json(product);
});

routes.delete('/product/:index', async (req, res) => {
  await Product.destroy({
    where: {
      id: req.params.index,
    },
  });
  return res.json('Deleted with success');
});

module.exports = routes;
