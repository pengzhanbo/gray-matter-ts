import type { GrayMatterOptions } from '../src/types'
import { describe, expect, it } from 'vitest'
import { coffee } from '../src/engines/coffeescript'
import { read } from '../src/read'
import { fixture, hasOwn } from './helper'

function parse(name: string, options?: GrayMatterOptions) {
  return read(fixture(name), { engines: { coffee }, ...options })
}

describe('parse coffee', () => {
  it('should throw an error when coffee cannot be parsed', () => {
    expect(() => parse('lang-coffee-bad.md', { language: 'coffee' })).toThrow()
  })

  it('should parse coffee front matter', () => {
    const file = parse('lang-coffee.md', { language: 'coffee' })
    expect(file.data.title).toBe('coffee')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should eval functions in coffee front matter', () => {
    const file = parse('lang-coffee-fn.md', { language: 'coffee' })

    expect(typeof file.data.fn).toBe('function')
    expect(file.data.title).toBe('coffee functions')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should eval functions in auto-detected coffee front matter', () => {
    const file = parse('autodetect-coffee-fn.md')

    expect(typeof file.data.fn).toBe('function')
    expect(file.data.title).toBe('coffee functions')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should detect "coffee" as the language', () => {
    const file = parse('autodetect-coffee.md')

    expect(file.data.title).toBe('autodetect-coffee')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should detect "coffeescript" as the language', () => {
    const file = parse('autodetect-coffeescript.md')

    expect(file.data.title).toBe('autodetect-coffeescript')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })
})
