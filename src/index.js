const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)


dotenv.config();

const routesV1 = require("./routes/v1");

const app = express();

// usamos process para recoger las variables de entorno
console.log("MONGO", process.env.MONGO);
console.log("PORT", process.env.PORT);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

routesV1(app);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado a mongoDB");
        app.listen(PORT, (callback) => {
            console.log(`running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log("mongoDB Error", error);
    });