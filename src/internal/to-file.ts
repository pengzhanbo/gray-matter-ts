import type { GrayMatterFile, GrayMatterOptions, Input } from '../types'
import { stringify } from './stringify'
import { define, isBuffer, toBuffer, toString } from './utils'

export function toFile<I extends Input = Input>(input: I | { content: I }): GrayMatterFile<I> {
  const file = {} as GrayMatterFile<I>
  if (typeof input === 'string' || isBuffer(input)) {
    file.content = String(input)
  }

  file.data = {}

  // set non-enumerable properties on the file object
  define(file, 'orig', toBuffer(file.content))
  define(file, 'language', file.language || '')
  define(file, 'matter', file.matter || '')
  define(file, 'stringify', (data: object, options?: GrayMatterOptions) => {
    if (options?.language) {
      file.language = options.language
    }
    return stringify(file, data, options)
  })

  // strip BOM and ensure that "file.content" is a string
  file.content = toString(file.content)
  file.isEmpty = false
  file.excerpt = ''
  return file
}
