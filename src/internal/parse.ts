import type { Data, GrayMatterOptions, Input } from '../types'
import { defaults } from './defaults'
import { findEngine } from './engine'

/**
 * Parse front-matter
 */
export function parse<I extends Input, D extends Data>(language: string, input: string, options?: GrayMatterOptions<I, D>): D {
  const opts = defaults(options)
  const engine = findEngine(language, opts)
  /* v8 ignore if -- @preserve */
  if (typeof engine.parse !== 'function') {
    throw new TypeError(`expected "${language}.parse" to be a function`)
  }
  return engine.parse(input, opts)
}
