import express, { application, Router } from "express"
import cors from 'cors';
import bodyParser from "body-parser"
import { connectDatabase } from "./pool.js"

//middleware
app.use(cors());
app.use(express.json()); //req.body
const app = express()
const pool = connectDatabase()
const PORT = 8000

//ROUTES//

//create a todo
app.listen(5000, () => {
    console.log("server started..");
});