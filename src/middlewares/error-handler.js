import { HttpError } from '../errors/HttpError.js'
import status from 'http-status'
import { z } from 'zod'
import { responseBuilder } from '../utils/response-builder.js'
import { commonMessages } from '../messages/index.js'

export const errorHandler = (err, req, res, _) => {
	if (err instanceof HttpError) {
		const response = responseBuilder.error(err.message, err.errors)
		return res.status(err.code).json(response)
	}

	if (err instanceof z.ZodError) {
		const errors = err.errors.map(issue => ({
			field: issue.path.join('.'),
			message: issue.message
		}))
		const response = responseBuilder.error(
			commonMessages.VALIDATION_ERROR,
			errors
		)
		return res.status(status.BAD_REQUEST).json(response)
	}

	const response = responseBuilder.error(commonMessages.INTERNAL_SERVER_ERROR)
	return res.status(status.INTERNAL_SERVER_ERROR).json(response)
}
