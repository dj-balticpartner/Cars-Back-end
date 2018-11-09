const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();



//routes
//Get all cars
router.get('/', async function (req, res) {
    const cars = await loadCarsConnection();
    res.send(await cars.find({}).toArray());
});

//Get a car by ID
router.get('/:carId', function (req, res) {
    res.json({
        message: `return details on ${req.params.carId} car`
    });
});

//Create new car
router.post('/', async function (req, res) {
    const cars = await loadCarsConnection();
    //TODO: CONSIDER ADDING VALIDATION, Before you save!!!
    let newCar = {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        engine: req.body.engine,
        updatedAt: new Date(), // consider creating a UTC date
        createdAt: new Date() // consider creating a UTC date
    }
    
    await cars.insertOne(newCar, function(err, result){
        if(err){
            res.status(200).json({
                status: "error",
                error: err
            });
        }else{
            res.status(201).json({
                status: "ok",
                message: `Car ${newCar.brand} ${newCar.model} was creeated!`
            });
        }        
    });
});

//Delete car
//Delete a car by ID
router.delete('/:carId', async function (req, res) {
    const cars = await loadCarsConnection();
    
    await cars.remove({
        _id: mongodb.ObjectID(req.params.carId)
    }, function(err, result){
        if(err){
            res.status(200).json({
                status: "error",
                error: err
            });
        }else{
            res.status(201).json({
                status: "ok",
                message: `Car ${req.params.carId} was deleted!`
            });
        }        
    });
});

//Update car
router.patch('/:carId', async function (req, res) {
    const cars = await loadCarsConnection();
    //TODO: CONSIDER ADDING VALIDATION, Before you save!!!
    let updatedData = {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        engine: req.body.engine,
        updatedAt: new Date() // consider creating a UTC date
    }
    
    await cars.findOneAndUpdate({
        _id: mongodb.ObjectID(req.params.carId)
    },{$set: updatedData} , function(err, result){
        if(err){
            res.status(200).json({
                status: "error",
                error: err
            });
        }else{
            res.status(201).json({
                status: "ok",
                message: `Car ${updatedData.brand} ${updatedData.model} was Updated!`
            });
        }        
    });
});

//Get all Model by Brand
router.get('/', async function (req, res) {
    const cars = await loadCarsConnection();
    res.send(await cars.find({}).toArray());
});

//connect to DB
async function loadCarsConnection(){
    const client = await mongodb.MongoClient.connect(
        'mongodb://sa:aabbcc1234@ds143293.mlab.com:43293/vue_cars',{
            useNewUrlParser: true
        }
    );
    return client.db('vue_cars').collection('cars');
}
//Export Cars
module.exports = router;