import mysql from 'mysql2/promise'
import { env } from './env.js'

export const db = await mysql.createConnection({
	host: env.DB_HOST,
	user: env.DB_USER,
	database: env.DB_NAME,
	password: env.DB_PASSWORD
})
