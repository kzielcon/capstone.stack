import pg from "pg"

const pool = new pg.Pool( {
    user: 'postgres',
    password: '123123123',
    database: 'sentimo',
    host: 'localhost'
})

export { pool }