const express = require('express');
const path = require('path');

module.exports.SetStatics = (app)=>{
    app.use(express.static(path.join(__dirname,'..','public')))
}


