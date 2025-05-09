import { z } from 'zod'

export const envSchema = z.object({
	PORT: z.string().min(1, 'PORT es obligatorio'),
	DB_HOST: z.string().min(1, 'DB_HOST es obligatorio'),
	DB_USER: z.string().min(1, 'DB_USER es obligatorio'),
	DB_NAME: z.string().min(1, 'DB_NAME es obligatorio'),
	DB_PASSWORD: z.string().min(1, 'DB_PASSWORD es obligatorio')
})
