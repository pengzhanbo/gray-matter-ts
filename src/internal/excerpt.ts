import type { GrayMatterFile, GrayMatterOptions } from '../types'
import { defaults } from './defaults'

/**
 * Get the excerpt from the file
 */
export function getExcerpt(file: GrayMatterFile, options?: GrayMatterOptions): GrayMatterFile {
  const opts = defaults(options)

  /* v8 ignore if -- @preserve */
  if (file.data == null)
    file.data = {}

  if (typeof opts.excerpt === 'function') {
    file.excerpt = opts.excerpt(file.content, opts)
    return file
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
