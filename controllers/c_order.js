// require('../model/mongoos');
const match = require('nodemon/lib/monitor/match');
const { orderModel: Model } = require('../model/mongoos')

// getOrder
exports.getOrder = async (req, res) => {
    const { id } = req.params;
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

    res.status(200).json(data);
}

// getUserOrders
exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
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
    res.status(200).json(data);
}

// addOrders
exports.addOrders = async (req, res) => {
    const count = await Model.findOne().select('_id').sort({ _id: -1 })
    console.log('count', count)
    let n = 0;
    if (!count) {
        n = 0;
    } else {
        n = count._id;
    }
    req.body._id = (n + 1);
    const data = await Model.create(req.body);

    res.status(200).json(data);
}


