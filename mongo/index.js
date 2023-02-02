
const express = require('express');
const dbConnect = require('./dbConnect');
const app = express();


let dotenv = require('dotenv');
dotenv.config();
let PORT = process.env.PORT || 2500;

app.use(express.json());

app.get('/', async (req, res) => {
    // res.send("Restaurant Data");
    res.send(`The server is running at ${PORT}`)
    console.log(`The server is running at ${PORT}`)
});


// Find all location
app.get('/location', async (req, res) => {
    let data = await dbConnect();
    let collection = await data.collection('location').find().toArray();
    console.log(collection);
    res.send(collection)
  
})
app.get('/city', async (req, res) => {
    let data = await dbConnect();
    let collection = await data.collection('city').find().toArray();
    console.log(collection);
    res.send(collection)
  
})

app.get('/restaurant', async (req, res) => {
    let data = await dbConnect();
    let collection = await data.collection('restaurantData').find({state_id:2}, {"state_id":1, "cost":1}).toArray();
    console.log(collection);
    res.send(collection);
})


app.get('/restaurant/:id', async (req, res) => {
    let data = await dbConnect();
    // console.log(req.params.id)
    let state_id = Number(req.query.id);
    let collection = await data.collection('restaurantData').find({state_id:state_id}, {restaurant_name:1,state_id:1}).toArray();
    console.log(collection);
    res.send(collection)
})


app.get('/meal', async (req, res) => {
    let data = await dbConnect();
    let collection = await data.collection('mealType').find().toArray();
    console.log(collection);
    res.send(collection)
})

app.get('/details/:restId', async (req, res) => {
    let restaurantId = Number(req.query.restId);
    let data = await dbConnect();
    let collection = await data.collection('restaurantData').find({restaurant_id:restaurantId}).toArray();
    console.log(collection);
    res.send(collection)
})

// MENU WRT rest

app.get('/menu/:restId', async (req, res) => {
    let restId = Number(req.query.restId);
    let data = await dbConnect();
    let collection = await data.collection('menu').find({restaurant_id:restId},{menu_price:1}).toArray();
    console.log(collection);
    res.send(collection)
})




//  SEARCH BY STATE ID || MEAL TYPE

app.get('/rest', async (req, res) => {
    let query = {}
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);

    if (stateId){
        query = {state_id:stateId};
        console.log(query);
    }
    else if (mealId){
        query = {"mealTypes.mealtype_id":mealId};
    }
    else{
        query = {}
    }
    let data = await dbConnect();
    let collection = await data.collection('restaurantData').find(query).toArray();
    console.log(collection);
    res.send(collection)
})

//  LISTING PAGE

app.get('/filter/:mealId', (req, res) => {
    let mealId = Number(req.params.mealId);
})


app.listen(PORT)