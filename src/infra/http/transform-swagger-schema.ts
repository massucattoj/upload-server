import { jsonSchemaTransform } from 'fastify-type-provider-zod'

type TransformSwaggerSchameData = Parameters<typeof jsonSchemaTransform>[0]

export function transformSwaggerSchema(data: TransformSwaggerSchameData) {
  const { schema, url } = jsonSchemaTransform(data)

  if (schema.consumes?.includes('multipart/form-data')) {
    // add to the app body
    if (schema.body === undefined) {
      schema.body = { type: 'object', required: [], properties: {} }
    }

    schema.body.properties.file = {
      type: 'string',
      format: 'binary',
    }

    schema.body.required.push('file')
  }

  return { schema, url }
}
