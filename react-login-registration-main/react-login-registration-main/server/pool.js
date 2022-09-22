import pg from "pg"

const connectDatabase = () => {
    const pool = new pg.Pool( {
        user: 'postgres',
        password: '123123123',
        database: 'sentimo',
        host: 'localhost'
    })

    return pool
} 

export { connectDatabase }