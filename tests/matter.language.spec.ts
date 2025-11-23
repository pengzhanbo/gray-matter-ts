import { describe, expect, it } from 'vitest'
import { language } from '../src/language'

describe('gray-matter language', () => {
  it('should detect the name of the language to parse', () => {
    expect(language('---\nfoo: bar\n---')).toEqual({
      raw: '',
      name: '',
    })

    expect(language('---js\nfoo: bar\n---')).toEqual({
      raw: 'js',
      name: 'js',
    })

    expect(language('---coffee\nfoo: bar\n---')).toEqual({
      raw: 'coffee',
      name: 'coffee',
    })
  })

  it('should work around whitespace', () => {
    expect(language('--- \nfoo: bar\n---')).toEqual({
      raw: ' ',
      name: '',
    })

    expect(language('--- js\nfoo: bar\n---')).toEqual({
      raw: ' js',
      name: 'js',
    })

    expect(language('--- coffee\nfoo: bar\n---')).toEqual({
      raw: ' coffee',
      name: 'coffee',
    })
  })
})
