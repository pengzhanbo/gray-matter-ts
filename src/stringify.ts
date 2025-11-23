import type { Data, GrayMatterFile, GrayMatterOptions } from './types'
import { stringify as _stringify } from './internal/stringify'
import { matter } from './matter'

/**
 * Stringify an object to YAML or the specified language, and
 * append it to the given string. By default, only YAML and JSON
 * can be stringified. See the [engines](#engines) section to learn
 * how to stringify other languages.
 *
 * ```js
 * console.log(stringify('foo bar baz', {title: 'Home'}));
 * // results in:
 * // ---
 * // title: Home
 * // ---
 * // foo bar baz
 * ```
 * @param file The content string to append to stringified front-matter, or a file object with `file.content` string.
 * @param data Front matter to stringify.
 * @param options [Options](#options) to pass to gray-matter and [js-yaml].
 * @return {string} Returns a string created by wrapping stringified yaml with delimiters, and appending that to the given string.
 * @api public
 */
export function stringify(
  file: string | Partial<Omit<GrayMatterFile, 'content'>> & { content: string },
  data?: Data,
  options?: GrayMatterOptions,
): string {
  if (typeof file === 'string')
    file = matter(file, options)
  return _stringify(file, data, options)
};
