const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

//routes
router.get('/', function (req, res) {
    res.json({
        message: "Cars Express veikia!"
    });
});

//connect to DB

//Export Cars
module.exports = router;