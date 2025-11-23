import type { Data, GrayMatterFile, GrayMatterOptions, Input } from './types'
import fs from 'node:fs'
import { matter } from './matter'

/**
 * Synchronously read a file from the file system and parse
 * front matter. Returns the same object as the [main function](#matter).
 *
 * ```js
 * const file = read('./content/blog-post.md');
 * ```
 * @param filepath file path of the file to read.
 * @param options Options to pass to gray-matter.
 * @return Returns an object with `data` and `content`
 * @api public
 */
export function read<I extends Input, D extends Data>(filepath: string, options?: GrayMatterOptions<I, D>): GrayMatterFile<I, D> {
  const str = fs.readFileSync(filepath, 'utf8') as string
  const file = matter<D>(str, options)
  file.path = filepath
  return file as GrayMatterFile<I, D>
}
