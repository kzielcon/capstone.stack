import express, { application, Router } from "express"
import bodyParser from "body-parser"
import { pool } from "./pool.js"
import { generateJWT } from "./jwt/jwtGenerator.js"
import bcrypt from "bcryptjs"
import { auth } from "./middleware/auth.js"
import cors from "cors"


const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        console.log(req.body);
        
        const user = await pool.query(`
        SELECT * FROM employees_info 
        WHERE user_email = $1 AND user_pass = $2
        `, [username, password], (err, result) => {
            console.log("Row count: %d",result.rows.length);

            if(result.rows.length) {
                const token = generateJWT(result.rows[0])
                res.json({ token:token })
            } else {
                return res.status(401).json({msg:"Username or password is incorrect"})
            }
        })
    } catch (error) {
        // console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
})

// app.get('/profile', auth, async (req, res) => {
//     try {
//         res.json(req.user)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({ msg: "Unauthenticated" });

//     }
// })



app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`)
})