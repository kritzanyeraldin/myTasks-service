export class HttpError extends Error {
	constructor({ code, message, errors = undefined }) {
		super()
		this.code = code
		this.errors = errors
		this.message = message
		this.stack = undefined
	}
}
