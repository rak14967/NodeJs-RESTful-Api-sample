const express = require('express');
const controllers = require('../controllers/c_user');

const Router = express.Router();

Router.get('/getUser/:id', (req,res)=>{
    const {id} = req.params;
    controllers.getUser(id,(status,data)=>{
        res.status(status).json(data);
    });
})

Router.get('/getUsers', (req,res)=>{
    controllers.getUsers(req.body,(status,data)=>{
        res.status(status).json(data);
    });
})

Router.post('/addUser', (req,res)=>{
    controllers.addUser(req.body,(status,data)=>{
        res.status(status).json(data);
    });
})

module.exports = Router;