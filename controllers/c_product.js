// require('../model/mongoos');
const {productModel:Model} = require('../model/mongoos')

// getProduct
exports.getProduct = async (req, res) => {
    const data = await Model.find({})
    .select({ _id: 1,__v : 0 })
        .where('_id').equals(req.params.id);

    res.status(200).json(data);
}

// getProducts
exports.getProducts = async (req, res) => {
    var obj = new Object();
    let {lastID,maxPrice,minPrice,search} = req.body;
    if (lastID) obj._id ={$gt:lastID};
    if(!maxPrice) maxPrice = 999999999999999;
    if(!minPrice) minPrice = 0;
    obj.price = {$gte:minPrice,$lte:maxPrice}
    if (search) {
        obj.$or = [{ name: { $regex: search } }, { specifications: { $regex: search }}]
    };

    console.log(obj);

    const data = await Model.find(obj)
           .select({ _id: 1,__v : 0 })
    res.status(200).json(data);
}

// addProduct
exports.addProduct = async (req, res) => {
    const count = await Model.findOne().select('_id').sort({_id:-1})
    console.log('count',count)
    let n = 0;
    if(!count){
        n = 0;
    }else{
        n = count._id;
    }
    req.body._id = (n+1);
    const data = await Model.create(req.body);

    res.status(200).json(data);
}


