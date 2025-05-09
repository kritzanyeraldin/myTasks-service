import { taskRouter } from './task.routes.js'

export const registerRoutes = app => {
	app.use('/tasks', taskRouter)
}
