const express = require("express");
const app = express();
const cors = require("cors");
import { connectDatabase } from "./pool.js"


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo


app.listen(5000, () => {
    console.log("server started..");
});