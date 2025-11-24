import type { GrayMatterEngine } from '../types'
import _coffee from 'coffeescript'

/**
 * engine for coffeescript
 *
 * @example
 * ```ts
 * import { matter } from 'gray-matter-ts'
 * import { coffee } from 'gray-matter-ts/engines/coffeescript'
 *
 * matter(
 *  '---\nfoo = 1\nbar = 2\n---\nOther stuff',
 *  { engines: { coffee }, language: 'coffee' }
 * );
 * ```
 */
export const coffee: GrayMatterEngine = {
  parse: (str, options) => {
    return (_coffee as any).eval(str, options)
  },
  stringify: () => {
    /* v8 ignore next -- @preserve */
    throw new Error('stringifying coffeescript is not supported')
  },
}

export const coffeescript = coffee
export const cson = coffee
