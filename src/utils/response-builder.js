export const responseBuilder = {
	success: (message = 'OK', data) => ({
		message,
		data
	}),
	error: (message = 'ERROR', errors) => ({
		message,
		errors
	})
}
