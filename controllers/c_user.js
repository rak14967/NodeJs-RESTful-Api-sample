// require('../model/mongoos');
const {userModel:Model} = require('../model/mongoos')

exports.getUser = async (req, res) => {
    const data = await Model.find({},'name age')
        .select({ _id: 1 })
        .where('_id').equals(req.params.id);

    res.status(200).json(data);
}

exports.getUsers = async (req, res) => {
    var obj = new Object();
    let {lastID,maxAge,minAge,name} = req.body;
    if (lastID) obj._id ={$gt:lastID};
    if(!maxAge) maxAge = 999;
    if(!minAge) minAge = 0;
    obj.age = {$gte:minAge,$lt:maxAge}
    if (name) obj.name = name;

    console.log(obj);

    const data = await Model.find(obj,'name age');
        //   .select({ _id: 1 })
    res.status(200).json(data);
}

exports.addUser = async (req, res) => {
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


