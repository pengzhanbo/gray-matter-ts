import type { Data, GrayMatterFile, GrayMatterOptions } from '../types'
import { defaults } from './defaults'
import { findEngine } from './engine'
import { isObject } from './utils'

export function stringify(file: Partial<GrayMatterFile> | string, data?: Data, options?: GrayMatterOptions): string {
  if (data == null && options == null) {
    if (typeof file === 'string') {
      return file
    }
    if (isObject(file)) {
      data = file.data
    }
    else {
      throw new TypeError('expected file to be a string or object')
    }
  }

  file = (typeof file === 'string' ? { content: file } : file) as GrayMatterFile

  const input = file.content!
  const opts = defaults(options)

  if (data == null) {
    return input
  }

  const language = file.language || opts.language
  const engine = findEngine(language, opts)
  /* v8 ignore if -- @preserve */
  if (typeof engine.stringify !== 'function') {
    throw new TypeError(`expected "${language}.stringify" to be a function`)
  }

  const matter = engine.stringify({ ...file.data, ...data }, opts).trim()
  const [open, close] = opts.delimiters
  let buf = ''

  if (matter !== '{}') {
    buf = newline(open) + newline(matter) + newline(close)
  }

  if (typeof file.excerpt === 'string' && file.excerpt !== '') {
    if (!input.includes(file.excerpt.trim())) {
      buf += newline(file.excerpt) + newline(close)
    }
  }

  return buf + newline(input)
}

function newline(str: string): string {
  return str.slice(-1) !== '\n' ? `${str}\n` : str
}
