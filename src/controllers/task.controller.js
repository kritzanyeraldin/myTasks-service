import * as taskService from '../services/task.service.js'
import status from 'http-status'
import { HttpError } from '../errors/HttpError.js'
import { responseBuilder } from '../utils/response-builder.js'
import { commonMessages, taskMessages } from '../messages/index.js'

export const getTasks = async (req, res) => {
	const tasks = await taskService.getTasks(req.query.is_done)
	const response = responseBuilder.success(taskMessages.GET_TASKS, tasks)
	return res.status(status.OK).json(response)
}

export const createTask = async (req, res) => {
	const task = req.body
	const createdTask = await taskService.createTask(task)
	const response = responseBuilder.success(
		taskMessages.CREATE_TASK,
		createdTask
	)
	return res.status(status.CREATED).json(response)
}

export const deleteTask = async (req, res) => {
	const id = req.params.id
	await taskService.deleteTaskById(id)
	return res.status(status.NO_CONTENT).send()
}

export const updateTask = async (req, res) => {
	const id = req.params.id
	const task = req.body

	const isTaskEmpty = Object.keys(task).length === 0
	if (isTaskEmpty)
		throw new HttpError({
			code: status.BAD_REQUEST,
			message: commonMessages.BAD_REQUEST
		})

	const updatedTask = await taskService.updateTaskById(id, task)
	const response = responseBuilder.success(
		taskMessages.UPDATE_TASK,
		updatedTask
	)
	return res.status(status.OK).json(response)
}
