import { db } from '../config/db.js'
import { adaptTask } from '../adapters/task.adapters.js'
import { HttpError } from '../errors/HttpError.js'
import status from 'http-status'
import { taskMessages } from '../messages/index.js'

export const getTaskById = async id => {
	const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [id])

	const task = adaptTask(tasks[0])
	if (!task)
		throw new HttpError({
			code: status.NOT_FOUND,
			message: taskMessages.TASK_NOT_FOUND
		})

	return task
}

export const getTasks = async isDone => {
	let response

	if (isDone === undefined) {
		response = await db.query('SELECT * FROM tasks')
	} else {
		const is_done = JSON.parse(isDone)
		response = await db.query('SELECT * FROM tasks WHERE is_done = ?', [
			is_done
		])
	}

	const tasks = response[0]
	return tasks.map(adaptTask)
}

export const createTask = async task => {
	const [result] = await db.query('INSERT INTO tasks SET ?', [task])
	const createdTask = await getTaskById(result.insertId)
	return createdTask
}

export const deleteTaskById = async id => {
	await getTaskById(id)
	await db.query('DELETE FROM tasks WHERE id = ?', [id])
}

export const updateTaskById = async (id, task) => {
	await getTaskById(id)
	await db.query('UPDATE tasks SET ? WHERE id = ?', [task, id])
	const updatedTask = await getTaskById(id)
	return updatedTask
}
