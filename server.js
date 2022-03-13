const express = require('express');
const bodyParser = require('body-parser');

const {SetStatics} = require('./utils/statics');
const route_user = require('./routes/r_user');
const route_order = require('./routes/r_order');
const route_product = require('./routes/r_product');

const app = express();

// middleWares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({extended:false}))

// static
SetStatics(app);

// Routes
app.use(route_user);
app.use(route_order);
app.use(route_product);


app.listen(3000,console.log('server is running in port 3000'));


