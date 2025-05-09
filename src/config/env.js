import { envSchema } from '../schemas/env.schema.js'

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
	console.error('❌ Error en variables de entorno:')
	parsed.error.issues.forEach(issue => {
		console.error(`- ${issue.path[0]}: ${issue.message}`)
	})
	process.exit(1)
}

export const env = parsed.data
