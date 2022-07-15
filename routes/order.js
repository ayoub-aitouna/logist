const { Router } = require('express');
const { Order, AcceptOrder, CancelOrder, CompleteOrder, UpdateLocation } = require('../controllers/Order');

Router.post('/', Order);
Router.post('/AcceptOrder', AcceptOrder);
Router.post('/CancelOrder', CancelOrder);
Router.post('/CompleteOrder', CompleteOrder);
Router.post('/UpdateLocation', UpdateLocation);

module.exports = Router;