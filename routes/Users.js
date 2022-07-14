const { Router } = require('express');
const express = require('express');
const Rounter = express.Router;
const { GetUser, UpdateUser, GetUsers } = require('../controllers/User');

Rounter.route('/').get(GetUser).post(UpdateUser);
Router.get('/Users', GetUsers);

module.exports = Rounter;