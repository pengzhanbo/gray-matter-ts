import type { Buffer } from 'node:buffer'
import type { Data, GrayMatterFile, GrayMatterOptions, Input } from './types'
import { cache } from './cache'
import { toFile } from './internal/to-file'
import { hash } from './internal/utils'
import { parseMatter } from './parse-matter'

/**
 * Takes a string or object with `content` property, extracts
 * and parses front-matter from the string, then returns an object
 * with `data`, `content` and other [useful properties](#returned-object).
 *
 * @param input String, or object with `content` string
 * @param options Options
 *
 * @example
 * ```ts
 * import { matter } from 'gray-matter-ts'
 *
 * console.log(matter('---\ntitle: Home\n---\nOther stuff'));
 * //=> { data: { title: 'Home'}, content: 'Other stuff' }
 * ```
 */
export function matter<D extends Data>(
  input: string,
  options?: GrayMatterOptions<string, D>,
): GrayMatterFile<string, D>
export function matter<D extends Data>(
  input: Buffer,
  options?: GrayMatterOptions<Buffer, D>,
): GrayMatterFile<Buffer, D>
export function matter<D extends Data>(
  input: { content: string },
  options?: GrayMatterOptions<string, D>,
): GrayMatterFile<string, D>
export function matter<D extends Data>(
  input: { content: Buffer },
  options?: GrayMatterOptions<Buffer, D>,
): GrayMatterFile<Buffer, D>
export function matter<D extends Data, I extends Input = Input>(
  input: I | { content: I },
  options?: GrayMatterOptions<I, D>,
): GrayMatterFile<I, D> {
  if (input === '') {
    return { data: {}, content: '', excerpt: '', orig: input } as GrayMatterFile<I, D>
  }

  let file = toFile<I, D>(input)
  const key = hash(file.content)
  const cached = cache.get(key) as GrayMatterFile<I, D>

  if (!options) {
    if (cached)
      file = { ...cached, orig: cached.orig }

    // only cache if there are no options passed. if we cache when options
    // are passed, we would need to also cache options values, which would
    // negate any performance benefits of caching
    cache.set(key, file as GrayMatterFile)
  }

  return parseMatter<I, D>(file, options)
}
