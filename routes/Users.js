const Router = require('express').Router();
const { GetUser, UpdateUser, GetUsers } = require('../controllers/User');

Router.get('/', GetUser);
Router.post('/', UpdateUser);
Router.get('/Users', GetUsers);

module.exports = Router;