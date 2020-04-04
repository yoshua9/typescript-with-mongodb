import express, {Application} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import routesV1 from './routes/v1';

mongoose.set('useCreateIndex', true)

dotenv.config();

declare global{
    namespace Express{
        export interface Request{
            sessionData:any;
        }        
    }
}

const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

routesV1(app);

const PORT:number | string = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado a mongoDB");
        app.listen(PORT, () => {
            console.log(`running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log("mongoDB Error", error);
    });