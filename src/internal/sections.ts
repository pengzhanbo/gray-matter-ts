import type { Input } from '../types'
import { isBuffer } from './utils'

export interface Section {
  key: string
  data: string
  content: string
}

export interface SectionsResult {
  content: string
  sections: Section[] | null
}

export type SectionParse = (section: Section, sections?: Section[] | null) => Section | void

export interface SectionsOptions {
  section_delimiter?: string
  parse?: SectionParse
}

const defaults: SectionsOptions = { section_delimiter: '---', parse: identity }

/**
 * Parse sections in `input` with the given `options`.
 *
 * @param input If input is an object, it's `content` property must be a string or buffer.
 * @param options
 * @return Returns an object with a `content` string and an array of `sections` objects.
 * @api public
 */
export function sections(
  input: Input | { content: Input },
  options?: SectionsOptions | SectionParse,
): SectionsResult {
  if (typeof options === 'function') {
    options = { parse: options }
  }

  const opts = { ...defaults, ...options } as Required<SectionsOptions>

  const file = toFile(input)
  const delim = opts.section_delimiter
  const lines = file.content.split(/\r?\n/)

  let sections: Section[] | null = null
  let section = createSection()
  let content = []
  let stack: string[] = []

  function initSections(val: string): void {
    file.content = val
    sections = []
    content = []
  }

  function closeSection(val: string): void {
    if (stack.length) {
      section.key = getKey(stack[0], delim)
      section.content = val
      opts.parse(section, sections)
      sections!.push(section)
      section = createSection()
      content = []
      stack = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    const len = stack.length
    const ln = line.trim()

    if (isDelimiter(ln, delim)) {
      if (ln.length === 3 && i !== 0) {
        if (len === 0 || len === 2) {
          content.push(line)
          continue
        }
        stack.push(ln)
        section.data = content.join('\n')
        content = []
        continue
      }

      if (sections === null) {
        initSections(content.join('\n'))
      }

      if (len === 2) {
        closeSection(content.join('\n'))
      }

      stack.push(ln)
      continue
    }

    content.push(line)
  }

  if (sections === null) {
    initSections(content.join('\n'))
  }
  else {
    closeSection(content.join('\n'))
  }

  file.sections = sections!
  return file
}

function toFile(input: Input | { content: Input }): SectionsResult {
  const file = {} as SectionsResult
  if (isBuffer(input)) {
    file.content = String(input)
  }
  else if (typeof input === 'string') {
    file.content = input
  }
  else if (typeof input.content !== 'string' && !isBuffer(input.content)) {
    throw new TypeError('expected a buffer or string')
  }
  else {
    file.content = String(input.content)
  }
  file.sections = []
  return file
}

function isDelimiter(line: string, delim: string): boolean {
  if (line.slice(0, delim.length) !== delim) {
    return false
  }
  if (line.charAt(delim.length + 1) === delim.slice(-1)) {
    return false
  }
  return true
}

function getKey(val: string | undefined, delim: string): string {
  return val ? val.slice(delim.length).trim() : ''
}

function createSection(): Section {
  return { key: '', data: '', content: '' }
}

function identity(val: Section): Section {
  return val
}
