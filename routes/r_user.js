const express = require('express');
const controllers = require('../controllers/c_user');

const Router = express.Router();

Router.get('/getUser/:id', (req,res)=>{
    controllers.getUser(req,res);
})

Router.get('/getUsers', (req,res)=>{
    controllers.getUsers(req,res);
})


Router.post('/addUser', (req,res)=>{
    controllers.addUser(req,res);
})

module.exports = Router;