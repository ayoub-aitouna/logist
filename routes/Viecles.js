const { Router } = require("express");
const { AddViecle, Viecles } = require('../controllers/viecles');
Router.path('/').post(AddViecle).get(Viecles);

module.exports = Router;