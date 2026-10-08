import type { TypedSchema, TypedSchemaError } from 'vee-validate'
import type { z } from 'zod'

/**
 * Adapts a Zod 4 schema to VeeValidate's TypedSchema
 * (`@vee-validate/zod` only supports Zod 3).
 *
 * Error messages are i18n keys; render them with `t(message)`.
 */
export function toTypedSchema<TSchema extends z.ZodType>(
  schema: TSchema,
): TypedSchema<z.input<TSchema>, z.output<TSchema>> {
  return {
    __type: 'VVTypedSchema',
    async parse(values) {
      const result = await schema.safeParseAsync(values)
      if (result.success) {
        return { value: result.data, errors: [] }
      }

      const messagesByPath = new Map<string, string[]>()
      for (const issue of result.error.issues) {
        const path = issue.path.map(String).join('.')
        messagesByPath.set(path, [...(messagesByPath.get(path) ?? []), issue.message])
      }

      const errors: TypedSchemaError[] = [...messagesByPath].map(([path, messages]) => ({
        path,
        errors: messages,
      }))
      return { errors }
    },
  }
}
