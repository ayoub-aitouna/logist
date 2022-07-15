const { Router } = require('express');
const { GetUser, UpdateUser, GetUsers } = require('../controllers/User');

Router.route('/').get(GetUser).post(UpdateUser);
Router.get('/Users', GetUsers);

module.exports = Rounter;