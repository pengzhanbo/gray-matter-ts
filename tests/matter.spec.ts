import { describe, expect, it } from 'vitest'
import { isBuffer, isObject } from '../src/internal/utils'
import { matter } from '../src/matter'
import { hasOwn } from './helper'

describe('gray-matter', () => {
  it('should extract YAML front matter', () => {
    const actual = matter('---\nabc: xyz\n---')
    expect(hasOwn(actual, 'data')).toBe(true)
    expect(hasOwn(actual, 'content')).toBe(true)
    expect(hasOwn(actual, 'orig')).toBe(true)
    expect(actual.data).toEqual({ abc: 'xyz' })
  })

  it('should cache original string as a buffer on the "orig property"', () => {
    const fixture = '---\nabc: xyz\n---'
    const actual = matter(fixture)

    expect(isBuffer(actual.orig)).toBe(true)
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('extra characters should throw parsing errors', () => {
    expect(() => matter('---whatever\nabc: xyz\n---')).toThrow()
  })

  it('boolean yaml types should still return the empty object', () => {
    expect(matter('--- true\n---').data).toEqual({})
  })

  it('string yaml types should still return the empty object', () => {
    expect(matter('--- true\n---').data).toEqual({})
  })

  it('number yaml types should still return the empty object', () => {
    expect(matter('--- 42\n---').data).toEqual({})
  })

  it('should throw an error when a string is not passed:', () => {
    // @ts-expect-error should throw
    expect(() => matter()).toThrow()
  })

  it('should return an object when the string is 0 length:', () => {
    expect(isObject(matter(''))).toBe(true)
  })

  it('should extract YAML front matter and content', () => {
    const fixture = '---\nabc: xyz\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n'
    const actual = matter(fixture)

    expect(actual.data).toEqual({ abc: 'xyz', version: 2 })
    expect(actual.content).toBe('\n<span class="alert alert-info">This is an alert</span>\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should use a custom delimiter as a string.', () => {
    const fixture = '~~~\nabc: xyz\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n'
    const actual = matter(fixture, { delimiters: '~~~' })

    expect(actual.data).toEqual({ abc: 'xyz', version: 2 })
    expect(actual.content).toBe('\n<span class="alert alert-info">This is an alert</span>\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should use custom delimiters as an array.', () => {
    const fixture = '~~~\nabc: xyz\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n'
    const actual = matter(fixture, { delimiters: ['~~~'] as unknown as [string, string] })

    expect(actual.data).toEqual({ abc: 'xyz', version: 2 })
    expect(actual.content).toBe('\n<span class="alert alert-info">This is an alert</span>\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should correctly identify delimiters and ignore strings that look like delimiters.', () => {
    const fixture = '---\nname: "troublesome --- value"\n---\nhere is some content\n'
    const actual = matter(fixture)

    expect(actual.data).toEqual({ name: 'troublesome --- value' })
    expect(actual.content).toBe('here is some content\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should correctly parse a string that only has an opening delimiter', () => {
    const fixture = '---\nname: "troublesome --- value"\n'
    const actual = matter(fixture)

    expect(actual.data).toEqual({ name: 'troublesome --- value' })
    expect(actual.content).toBe('')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should not try to parse a string has content that looks like front-matter.', () => {
    const fixture = '-----------name--------------value\nfoo'
    const actual = matter(fixture)

    expect(actual.data).toEqual({})
    expect(actual.content).toBe('-----------name--------------value\nfoo')
    expect(actual.orig.toString()).toBe(fixture)
  })
})
