const mongoose = require('mongoose');
const {SchemaTypes} = mongoose;
// connect to mongodb
const mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Schema
const Schema = mongoose.Schema;

// user
const user = new Schema({
    _id: {type: SchemaTypes.Number, required: true},
    name : {type: SchemaTypes.String, required: true},
    age : {type: SchemaTypes.Number, default : 1}
}, { collection: 'user' });
const userModel = mongoose.model('user', user );

// order
const order = new Schema({
    _id: {type: SchemaTypes.Number, required: true},
    productId : {type: SchemaTypes.Number, required: true},
    count : {type: SchemaTypes.Number, required: true},
    userId : {type: SchemaTypes.Number, required: true},
    status : {type: SchemaTypes.Number, default : 1} // 1 = pending , 2 = sending , 3 = delivered 
}, { collection: 'order' });
const orderModel = mongoose.model('order', order );

// product
const product = new Schema({
    _id: {type: SchemaTypes.Number, required: true},
    name : {type: SchemaTypes.String, required: true},
    price : {type: SchemaTypes.Number, default : 0 },
    specifications : {type: SchemaTypes.String, default : '[]' },
    status : {type: SchemaTypes.Number, default : 1} // 1 = pending , 2 = Accepted , 3 = Not approved 
}, { collection: 'product' });
const productModel = mongoose.model('product', product );


module.exports = {userModel,orderModel,productModel};