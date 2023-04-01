const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

port = process.env.PORT || 3000;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static


app.use(express.urlencoded({ extended: false }))    // Parse application/x-www-form-urlencoded
app.use(express.json())                             // Parse application/json

//Rutas


//404


app.listen(port, () => {
    console.log(`Server listenning on port ${port}...`);
});