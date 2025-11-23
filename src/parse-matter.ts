import type { Data, GrayMatterFile, GrayMatterOptions, Input } from './types'
import { defaults } from './internal/defaults'
import { getExcerpt } from './internal/excerpt'
import { parse } from './internal/parse'
import { sections } from './internal/sections'
import { language as getLanguage } from './language'

/**
 * Parse front matter
 */
export function parseMatter<
  D extends Data,
  I extends Input,
>(file: GrayMatterFile<I>, options?: GrayMatterOptions<I, D>): GrayMatterFile<I> {
  const opts = defaults<I, D>(options)
  const open = opts.delimiters[0]
  const close = `\n${opts.delimiters[1]}`
  let str = file.content

  if (opts.language) {
    file.language = opts.language
  }

  // get the length of the opening delimiter
  const openLen = open.length
  if (!str.startsWith(open)) {
    getExcerpt(file, opts as GrayMatterOptions)
    return file
  }

  // if the next character after the opening delimiter is
  // a character from the delimiter, then it's not a front-
  // matter delimiter
  if (str.charAt(openLen) === open.slice(-1)) {
    return file
  }

  // strip the opening delimiter
  str = str.slice(openLen)
  const len = str.length

  // use the language defined after first delimiter, if it exists
  const language = getLanguage(str, opts as GrayMatterOptions)
  if (language.name) {
    file.language = language.name
    str = str.slice(language.raw.length)
  }

  // get the index of the closing delimiter
  let closeIndex = str.indexOf(close)
  if (closeIndex === -1) {
    closeIndex = len
  }

  // get the raw front-matter block
  file.matter = str.slice(0, closeIndex)

  const block = file.matter.replace(/^\s*#[^\n]+/gm, '').trim()
  if (block === '') {
    file.isEmpty = true
    file.empty = file.content
    file.data = {}
  }
  else {
    // create file.data by parsing the raw file.matter block
    file.data = parse(file.language, file.matter, opts as GrayMatterOptions)
  }

  // update file.content
  if (closeIndex === len) {
    file.content = ''
  }
  else {
    file.content = str.slice(closeIndex + close.length)
    if (file.content[0] === '\r') {
      file.content = file.content.slice(1)
    }
    if (file.content[0] === '\n') {
      file.content = file.content.slice(1)
    }
  }

  getExcerpt(file, opts as GrayMatterOptions)

  if (opts.sections === true || typeof opts.section === 'function') {
    sections(file, opts.section)
  }
  return file
}
