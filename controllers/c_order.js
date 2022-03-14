// require('../model/mongoos');
const match = require('nodemon/lib/monitor/match');
const { orderModel: Model } = require('../model/mongoos')
const { isNumeric, checkData, errorMessage } = require('../utils/myFunc')

// getOrder
exports.getOrder = async (id, callback) => {
    try {
        // data analyze
        if (!isNumeric(id)) {
            errorMessage(callback, 403)
            return;
        }

        // query
        const data = await Model.aggregate([
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'product',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            }, { $match: { _id: parseInt(id) } },
            { $project: { _id: 1, __v: 0, 'user.__v': 0, 'product.__v': 0 } }
        ]).exec();
        checkData(callback, data)
    } catch (error) {
        errorMessage(callback, 500)
    }
}

// getUserOrders
exports.getUserOrders = async (userId, status, callback) => {
    try {
        // data analyze
        if (!isNumeric(userId) && !isNumeric(status)) {
            errorMessage(callback, 403)
            return;
        }
        const data = await Model.aggregate([
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }, {
                $lookup: {
                    from: 'product',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            }, { $match: { 'user._id': parseInt(userId), 'status': parseInt(status) } },
            { $project: { _id: 1, __v: 0, 'user.__v': 0, 'product.__v': 0 } }
        ]).exec();
        console.log(userId);
        checkData(callback, data)
    } catch (error) {
        errorMessage(callback, 500)
    }
}

// addOrders
exports.addOrders = async (body,callback) => {
    try {
        // data analyze
        var obj = new Object();
        const { productId, count, userId } = body;
        obj.productId = productId;
        obj.count = count;
        obj.userId = userId;

        // query for Get Number of order
        const number = await Model.findOne().select('_id').sort({ _id: -1 })
        console.log('count', count)
        let n = 0;
        if (!number) {
            n = 0;
        } else {
            n = number._id;
        }
        obj._id = (n + 1);

        // query
        const data = await Model.create(obj);
        callback(201, data);
    } catch (error) {
        errorMessage(callback, 500)
    }
}


