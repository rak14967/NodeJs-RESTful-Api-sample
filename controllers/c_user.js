// require('../model/mongoos');
const { userModel: Model } = require('../model/mongoos')
const { isNumeric, checkData, errorMessage } = require('../utils/myFunc')

exports.getUser = async (id, callback) => {
    try {
        // data analyze
        if (!isNumeric(id)) {
            errorMessage(callback, 403)
            return;
        }

        // query
        const data = await Model.find({}, 'name age')
            .select({ _id: 1 })
            .where('_id').equals(id);
        checkData(callback, data)
    } catch (error) {
        errorMessage(callback, 500)
    }
}

exports.getUsers = async (body, callback) => {
    try {
        var obj = new Object();
        let { lastID, maxAge, minAge, name } = body;
        if (lastID && isNumeric(lastID)) obj._id = { $gt: lastID };
        if (!maxAge) maxAge = 999;
        if (!minAge) minAge = 0;
        obj.age = { $gte: minAge, $lt: maxAge }
        if (name) obj.name = name;
        const data = await Model.find(obj, 'name age');
        checkData(callback, data)
    } catch (error) {
        errorMessage(callback, 500)
    }
}

exports.addUser = async (body, callback) => {
    try {
        var obj = new Object();
        const { name, age } = body;
        obj.name = name;
        obj.age = age;

        const count = await Model.findOne().select('_id').sort({ _id: -1 })
        console.log('count', count)
        let n = 0;
        if (!count) {
            n = 0;
        } else {
            n = count._id;
        }
        obj._id = (n + 1);
        const data = await Model.create(obj);
        callback(201, data)
    } catch (error) {
        errorMessage(callback, 500)
    }
}


