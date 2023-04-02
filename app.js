const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

port = process.env.PORT;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static

app.use(express.urlencoded({ extended: false }))    // Parse application/x-www-form-urlencoded
app.use(express.json())                             // Parse application/json

//Rutas
app.use('/api/users', require('./routers/routerUsers'));

//404
app.use((err, req, res) => {    
    console.error('Error 404: ', err.stack);
    res.status(404).send({
        tituloURL: '404 - Página no encontrada',
        error: err.stack,
        msg: 'Página no encontrada.'
    })
})

app.listen(port, () => console.log(`Server listenning on port ${port}...`));