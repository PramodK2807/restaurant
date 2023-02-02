

// Mongo DB CONNECTION

const {MongoClient} = require("mongodb");
const url = 'mongodb+srv://test:test123@cluster0.rqzfmzk.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function getData (){
    let result = await client.connect();
    let db = result.db("restaurant");
    return db;
    // let collection = await db.collection('city').find({}).toArray();
    // console.log(collection);
}

// getData();
module.exports = getData;