import type { GrayMatterOptions } from '../src/types'
import { describe, expect, it } from 'vitest'
import { read } from '../src/read'
import { fixture, hasOwn } from './helper'

function parse(name: string, options?: GrayMatterOptions) {
  return read(fixture(name), options)
}

describe('parse YAML:', () => {
  it('should parse YAML', () => {
    const file = parse('all.yaml')
    expect(file.data).toEqual({
      one: 'foo',
      two: 'bar',
      three: 'baz',
    })
  })

  it('should parse YAML with closing ...', () => {
    const file = parse('all-dots.yaml')
    expect(file.data).toEqual({
      one: 'foo',
      two: 'bar',
      three: 'baz',
    })
  })

  it('should parse YAML front matter', () => {
    const file = parse('lang-yaml.md')

    expect(file.data.title).toBe('YAML')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should parse YAML front matter with short language `yml`', () => {
    const file = parse('lang-yaml.md', { language: 'yml' })

    expect(file.data.title).toBe('YAML')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should detect YAML as the language with no language defined after the first fence', () => {
    const file = parse('autodetect-no-lang.md')

    expect(file.data.title).toBe('autodetect-no-lang')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should detect YAML as the language', () => {
    const file = parse('autodetect-yaml.md')

    expect(file.data.title).toBe('autodetect-yaml')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })
})
