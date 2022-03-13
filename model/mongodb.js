const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const findOne = (collection,query,callback) => {
  MongoClient.connect(url,(err, db)=> {
    if (err) throw err;
    const dbo = db.db("test");
    dbo.collection(collection).findOne(query,(err, res)=> {
      if (err) throw err;
      callback(res);
      db.close();
    });
  });
}

const findAll = (collection,query,callback) => {
  MongoClient.connect(url,(err, db)=> {
    if (err) throw err;
    const dbo = db.db("test");
    dbo.collection(collection).find(query).toArray((err, res)=> {
      if (err) throw err;
      callback(res);
      db.close();
    });
  });
}

const findSome = (collection,query,Some,callback) => {
  MongoClient.connect(url,(err, db)=> {
    if (err) throw err;
    const dbo = db.db("test");
    dbo.collection(collection).find(query,`{ projection: ${Some} }`).toArray((err, res)=> {
      if (err) throw err;
      callback(res);
      db.close();
    });
  });
}

const insertOne = (collection,query,callback) => {
  MongoClient.connect(url,(err, db)=> {
    if (err) throw err;
    const dbo = db.db("test");
    dbo.collection(collection).insertOne(query, function(err, res) {
      if (err) throw err;
      callback(res);
      db.close();
    });
  });
}

const insertMany = (collection,query,callback) => {
  MongoClient.connect(url,(err, db)=> {
    if (err) throw err;
    const dbo = db.db("test");
    dbo.collection(collection).insertMany(query, function(err, res) {
      if (err) throw err;
      callback(res);
      db.close();
    });
  });
}




module.exports ={findOne,findAll,insertOne} ;