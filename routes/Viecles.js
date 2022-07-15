const Router = require("express").Router();
const { AddViecle, Viecles } = require('../controllers/viecles');
Router.post('/', AddViecle);
Router.get('/', Viecles);

module.exports = Router;