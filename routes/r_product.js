const express = require('express');
const controllers = require('../controllers/c_product');

const Router = express.Router();

// getProduct
Router.get('/getProduct/:id', (req,res)=>{
    controllers.getProduct(req,res);
})

// getProducts
Router.get('/getProducts', (req,res)=>{
    controllers.getProducts(req,res);
})

// addProduct
Router.post('/addProduct', (req,res)=>{
    controllers.addProduct(req,res);
})

module.exports = Router;