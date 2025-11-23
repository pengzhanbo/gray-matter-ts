import type { GrayMatterOptions } from './types'
import { defaults } from './internal/defaults'
import { test } from './test'
/**
 * Detect the language to use, if one is defined after the
 * first front-matter delimiter.
 * @param str
 * @param  options
 * @return {object} Object with `raw` (actual language string), and `name`, the language with whitespace trimmed
 */
export function language(str: string, options?: GrayMatterOptions): { raw: string, name: string } {
  const opts = defaults(options)
  const open = opts.delimiters[0]

  if (test(str)) {
    str = str.slice(open.length)
  }

  const language = str.slice(0, str.search(/\r?\n/))
  return {
    raw: language,
    name: language ? language.trim() : '',
  }
}
