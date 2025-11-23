import type { GrayMatterOptions } from '../src/types'
import { describe, expect, it } from 'vitest'
import { read } from '../src/read'
import { fixture, hasOwn } from './helper'

function parse(name: string, options?: GrayMatterOptions) {
  return read(fixture(name), options)
}

describe('parse json:', () => {
  it('should parse JSON front matter.', () => {
    const file = parse('lang-json.md', { language: 'json' })

    expect(file.data.title).toBe('JSON')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should auto-detect JSON as the language.', () => {
    const file = parse('autodetect-json.md')

    expect(file.data.title).toBe('autodetect-JSON')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })
})
