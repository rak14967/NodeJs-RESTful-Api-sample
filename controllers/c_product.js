// require('../model/mongoos');
const { productModel: Model } = require('../model/mongoos')
const { isNumeric, checkData,errorMessage } = require('../utils/myFunc')

// getProduct
exports.getProduct = async (id, callback) => {
    try {
        if (!isNumeric(id)) {
            errorMessage(callback,403)
            return;
        }
        const data = await Model.find({ _id: id })
            .select({ _id: 1, __v: 0 })
  
        checkData(callback, data)
    } catch (error) {
        errorMessage(callback,500)
    }
}

// getProducts
exports.getProducts = async (body, callback) => {
    try {
        // data analyze
        var obj = new Object();
        let { lastID, maxPrice, minPrice, search, limit, sort } = body;

        if (!maxPrice) maxPrice = 999999999999999;
        if (!minPrice) minPrice = 0;
        if (!isNumeric(limit)) limit = null;
        if (!isNumeric(sort)) sort = -1;

        if (lastID && isNumeric(lastID) && lastID != 0) {
            if (sort == -1) {
                obj._id = { $lt: parseInt(lastID) };
            } else {
                obj._id = { $gt: parseInt(lastID) };
            }
        }

        obj.price = { $gte: minPrice, $lte: maxPrice }
        if (search) {
            obj.$or = [{ name: { $regex: search } }, { specifications: { $regex: search } }]
        };
        console.log(sort)

        // query
        const data = await Model.find(obj).limit(limit).sort({ _id: sort })
            .select({ _id: 1, __v: 0 })
        if (data[0]) {
            callback(200, data);
        } else {
            errorMessage(callback,404);
        }
    } catch (error) {
        errorMessage(callback,500);
    }
}

// addProduct
exports.addProduct = async (body, callback) => {
    try {
        // data analyze
        var obj = new Object();
        let { name, price, specifications } = body;
        obj.name = name;
        obj.price = price;
        obj.specifications = specifications;

        const count = await Model.findOne().select('_id').sort({ _id: -1 })
        let n = 0;
        if (!count) {
            n = 0;
        } else {
            n = count._id;
        }
        obj._id = (n + 1);
        const data = await Model.create(obj);
        callback(201, data);
    } catch (error) {
        errorMessage(callback,500);
    }
}


