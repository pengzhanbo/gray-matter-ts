import type { GrayMatterOptions } from '../src/types'
import { describe, expect, it } from 'vitest'
import { coffee } from '../src/engines/coffeescript'
import { read } from '../src/read'
import { fixture, hasOwn } from './helper'

function parse(name: string, options?: GrayMatterOptions) {
  return read(fixture(name), { engines: { coffee }, ...options })
}

describe('parse-cson', () => {
  it('should parse CSON front matter.', () => {
    const file = parse('lang-cson.md', { language: 'cson' })

    expect(file.data.title).toBe('CSON')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should evaluate functions in CSON front matter.', () => {
    const file = parse('lang-cson-fn.md', { language: 'cson' })

    expect(typeof file.data.fn).toBe('function')
    expect(file.data.title).toBe('CSON functions')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should evaluate functions in auto-detected CSON front matter.', () => {
    const file = parse('autodetect-cson-fn.md')

    expect(typeof file.data.fn).toBe('function')
    expect(file.data.title).toBe('CSON functions')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should auto-detect cson as the language.', () => {
    const file = parse('autodetect-cson.md')

    expect(file.data.title).toBe('autodetect-CSON')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })
})
