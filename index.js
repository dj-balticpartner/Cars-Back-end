const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//App
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes


app.get('/', function (req, res) {
    res.json({
        message: "Express vaikia!"
    });
});


//Start server
const port = process.env.port || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));