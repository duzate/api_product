const { Router } = require('express');
const multer = require('multer');

const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middleware/auth');

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', upload.single('avatar'), UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', upload.single('avatar'), UserController.update);

module.exports = routes;
