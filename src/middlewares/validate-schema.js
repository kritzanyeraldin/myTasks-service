export const validateSchema = schema => (req, res, next) => {
	try {
		schema.parse({
			body: req.body,
			params: req.params
		})
		next()
	} catch (error) {
		next(error)
	}
}
