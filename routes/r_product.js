const express = require('express');
const controllers = require('../controllers/c_product');

const Router = express.Router();

// getProduct
Router.get('/getProduct/:id', (req,res)=>{
    controllers.getProduct(req.params.id,(status,data)=>{
        res.status(status).json(data);
    });
})

// getProducts
Router.get('/getProducts', (req,res)=>{
    controllers.getProducts(req.body,(status,data)=>{
        res.status(status).json(data);
    });
})

// addProduct
Router.post('/addProduct', (req,res)=>{
    controllers.addProduct(req.body,(status,data)=>{
        res.status(status).json(data);
    });
})

module.exports = Router;