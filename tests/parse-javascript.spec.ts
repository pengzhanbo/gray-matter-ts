import type { GrayMatterOptions } from '../src/types'
import { describe, expect, it } from 'vitest'
import { read } from '../src/read'
import { fixture, hasOwn } from './helper'

function parse(name: string, options?: GrayMatterOptions) {
  return read(fixture(name), options)
}

describe('javascript parser:', () => {
  it('should parse front matter when options.lang is javascript', () => {
    const file = parse('lang-javascript-object-fn.md', { language: 'javascript' })

    expect(typeof file.data.fn.reverse).toBe('function')
    expect(file.data.title).toBe('javascript front matter')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should parse front matter when options.language is js', () => {
    const file = parse('lang-javascript-object-fn.md', { language: 'js' })

    expect(typeof file.data.fn.reverse).toBe('function')
    expect(file.data.title).toBe('javascript front matter')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should eval functions', () => {
    const file = parse('lang-javascript-fn.md', { language: 'js' })

    expect(typeof file.data).toBe('function')
  })

  it('should detect "javascript" after the first delimiter', () => {
    const file = parse('autodetect-javascript.md', { language: 'js' })

    expect(file.data.title).toBe('autodetect-javascript')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })
})
