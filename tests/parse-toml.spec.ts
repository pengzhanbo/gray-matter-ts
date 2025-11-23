import type { GrayMatterOptions } from '../src/types'
import toml from 'toml'
import { describe, expect, it } from 'vitest'
import { matter } from '../src/matter'
import { hasOwn } from './helper'

const defaults: Partial<GrayMatterOptions> = {
  engines: {
    toml: str => toml.parse(str),
  },
}

function parse(str: string, options?: GrayMatterOptions) {
  return matter(str, { ...defaults, ...options })
}

describe('parse TOML:', () => {
  it('should parse JSON front matter.', () => {
    const file = parse('---\ntitle = "TOML"\ndescription = "Front matter"\ncategories = "front matter toml"\n---\n\n# This file has toml front matter!\n', {
      language: 'toml',
    })

    expect(file.data.title).toBe('TOML')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should auto-detect TOML as the language.', () => {
    const file = parse('---toml\ntitle = "autodetect-TOML"\n[props]\nuser = "jonschlinkert"\n---\nContent\n')

    expect(file.data.title).toBe('autodetect-TOML')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should throw on TOML syntax errors', () => {
    expect(() => matter('---toml\n[props\nuser = "jonschlinkert"\n---\nContent\n')).toThrow()
  })
})
