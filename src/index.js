import express from 'express'
import { registerMiddlewares, errorHandler } from './middlewares/index.js'
import { registerRoutes } from './routes/index.js'
import { env } from './config/env.js'

const app = express()

registerMiddlewares(app)
registerRoutes(app)
app.use(errorHandler)

app.listen(env.PORT, () => {
	console.log(`Server is running on ${env.PORT}`)
})
