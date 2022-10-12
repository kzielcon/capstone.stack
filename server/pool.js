import pg from "pg"

const pool = new pg.Pool( {
    user: 'postgres',
    password: '123123123',
    database: 'sentimo',
    host: 'localhost'
})

export { pool }
// // import pg from "pg"
// const Pool = require("pg").Pool
// require("dotenv").config();

// // dotenv.config({
// //     path: '../.env'
// // })


// // const pool = new pg.Pool( {
// //     user: process.env.PG_USER,
// //     password: process.env.PG_PASSWORD,
// //     database: process.env.PG_DATABASE,
// //     host: process.env.PG_HOST,
// //     port: process.env.PG_PORT
// // })

// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}:${process.env.PG_DATABASE}:${process.env.PG_HOST}:${process.env.PG_PORT}`

// const proConfig = process.env.DATABASE_URL //heroku addons

// const pool = new Pool({
//     connectionString : process.env.NODE_ENV === production ? proConfig : devConfig
// }; 




// export { pool }