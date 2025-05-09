import cors from 'cors'
import express from 'express'

export const registerMiddlewares = app => {
	app.use(express.json())
	app.use(
		cors({
			origin: '*'
		})
	)
}
export * from './error-handler.js'
export * from './validate-schema.js'
