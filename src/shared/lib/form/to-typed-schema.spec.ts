import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { toTypedSchema } from './to-typed-schema'

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'validation.required'),
    contact: z.object({ phone: z.string().min(10, 'validation.phone') }),
  }),
)

describe('toTypedSchema', () => {
  it('returns the parsed value when valid', async () => {
    const values = { name: 'A', contact: { phone: '0901234567' } }
    await expect(schema.parse(values)).resolves.toEqual({ value: values, errors: [] })
  })

  it('maps issues to dotted paths', async () => {
    const result = await schema.parse({ name: '', contact: { phone: '1' } })
    expect(result.errors).toEqual([
      { path: 'name', errors: ['validation.required'] },
      { path: 'contact.phone', errors: ['validation.phone'] },
    ])
  })
})
