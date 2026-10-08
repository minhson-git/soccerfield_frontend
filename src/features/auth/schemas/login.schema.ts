import { z } from 'zod'

// Messages are i18n keys
export const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'validation.required'),
  password: z.string().min(1, 'validation.required'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
