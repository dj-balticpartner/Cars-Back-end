const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();



//routes

//Get all car Brands
router.get('/brands', async function (req, res) {
    const cars = await loadCarsConnection();
    res.send(await cars.distinct("brand"));
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