import env from "dotenv";
import pg from "pg";
env.config();

export const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DB,
    port:process.env.PORT
})
