import { z } from 'zod'

export const getTasksSchema = z.object({
	query: z
		.object({
			is_done: z.enum(['true', 'false']).optional()
		})
		.optional()
})

export const createTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1, 'El título es requerido')
	})
})

export const updateTaskSchema = z.object({
	body: createTaskSchema.shape.body.partial().extend({
		is_done: z.boolean().optional()
	}),
	params: z.object({
		id: z.string()
	})
})

export const deleteTaskSchema = z.object({
	params: z.object({
		id: z.string()
	})
})
