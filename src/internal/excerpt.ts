import type { Data, GrayMatterFile, GrayMatterOptions, Input } from '../types'
import { defaults } from './defaults'

/**
 * Get the excerpt from the file
 */
export function getExcerpt<I extends Input, D extends Data>(file: GrayMatterFile<I, D>, options?: GrayMatterOptions<I, D>): GrayMatterFile<I, D> | void {
  const opts = defaults(options)

  /* v8 ignore if -- @preserve */
  if (file.data == null)
    file.data = {} as D

  if (typeof opts.excerpt === 'function') {
    return opts.excerpt(file, opts)
  }

  const sep = file.data.excerpt_separator || opts.excerpt_separator
  if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
    return file
  }

  const delimiter = typeof opts.excerpt === 'string'
    ? opts.excerpt
    : (sep || opts.delimiters[0])

  // if enabled, get the excerpt defined after front-matter
  const idx = file.content.indexOf(delimiter)
  if (idx !== -1) {
    file.excerpt = file.content.slice(0, idx)
  }

  return file
}
