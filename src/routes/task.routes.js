import { Router } from 'express'
import * as taskController from '../controllers/task.controller.js'
import { validateSchema } from '../middlewares/index.js'
import {
	createTaskSchema,
	deleteTaskSchema,
	getTasksSchema,
	updateTaskSchema
} from '../schemas/task.schema.js'

export const taskRouter = Router()

taskRouter.get('/', validateSchema(getTasksSchema), taskController.getTasks)
taskRouter.post(
	'/',
	validateSchema(createTaskSchema),
	taskController.createTask
)
taskRouter.delete(
	'/:id',
	validateSchema(deleteTaskSchema),
	taskController.deleteTask
)
taskRouter.patch(
	'/:id',
	validateSchema(updateTaskSchema),
	taskController.updateTask
)
