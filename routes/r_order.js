const express = require('express');
const controllers = require('../controllers/c_order');

const Router = express.Router();

Router.get('/getOrder/:id', (req,res)=>{
    const { id } = req.params;
    controllers.getOrder(id,(status,data)=>{
        res.status(status).json(data);
    });
})

Router.get('/getUserOrders/:userId', (req,res)=>{
    const { userId } = req.params;
    const { status } = req.body;
    controllers.getUserOrders(userId,status,(status,data)=>{
        res.status(status).json(data);
    });
})

Router.post('/addOrders', (req,res)=>{
    controllers.addOrders(req.body,(status,data)=>{
        res.status(status).json(data);
    });
})

module.exports = Router;