const express = require('express');
const controllers = require('../controllers/c_order');

const Router = express.Router();

Router.get('/getOrder/:id', (req,res)=>{
    controllers.getOrder(req,res);
})

Router.get('/getUserOrders/:userId', (req,res)=>{
    controllers.getUserOrders(req,res);
})

Router.post('/addOrders', (req,res)=>{
    controllers.addOrders(req,res);
})

module.exports = Router;