import type { GrayMatterOptions } from './types'
import { defaults } from './internal/defaults'

/**
 * Returns true if the given `string` has front matter.
 * @param str
 * @param options
 * @return {boolean} True if front matter exists.
 * @api public
 */
export function test(str: string, options?: GrayMatterOptions): boolean {
  return str.startsWith(defaults(options).delimiters[0])
}
