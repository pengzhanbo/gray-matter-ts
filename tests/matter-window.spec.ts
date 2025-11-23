import { describe, expect, it } from 'vitest'
import { isBuffer, isObject } from '../src/internal/utils'
import { matter } from '../src/matter'
import { hasOwn } from './helper'

describe('gray-matter (windows carriage returns)', () => {
  it('should extract YAML front matter', () => {
    const actual = matter('---\r\nabc: xyz\r\n---')
    expect(hasOwn(actual, 'data')).toBe(true)
    expect(hasOwn(actual, 'content')).toBe(true)
    expect(hasOwn(actual, 'orig')).toBe(true)
    expect(actual.data.abc).toBe('xyz')
  })

  it('should cache orig string as a buffer on the "orig property"', () => {
    const fixture = '---\r\nabc: xyz\r\n---'
    const actual = matter(fixture)
    expect(isBuffer(actual.orig)).toBe(true)
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should throw parsing errors', () => {
    expect(() => matter('---whatever\r\nabc: xyz\r\n---')).toThrowError(TypeError)
  })

  it('should throw an error when a string is not passed:', () => {
    // @ts-expect-error should throw
    expect(() => matter()).toThrow()
  })

  it('should return an object when the string is 0 length:', () => {
    expect(isObject(matter(''))).toBe(true)
  })

  it('should extract YAML front matter and content', () => {
    const fixture = '---\r\nabc: xyz\r\nversion: 2\r\n---\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n'
    const actual = matter(fixture)
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 })
    expect(actual.content).toBe('\r\n<span class="alert alert-info">This is an alert</span>\r\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should use a custom delimiter as a string.', () => {
    const fixture = '~~~\r\nabc: xyz\r\nversion: 2\r\n~~~\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n'
    const actual = matter(fixture, { delimiters: '~~~' })
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 })
    expect(actual.content).toBe('\r\n<span class="alert alert-info">This is an alert</span>\r\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should use custom delimiters as an array.', () => {
    const fixture = '~~~\r\nabc: xyz\r\nversion: 2\r\n~~~\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n'
    const actual = matter(fixture, { delimiters: ['~~~'] as unknown as [string, string] })

    expect(actual.data).toEqual({ abc: 'xyz', version: 2 })
    expect(actual.content).toBe('\r\n<span class="alert alert-info">This is an alert</span>\r\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should correctly identify delimiters and ignore strings that look like delimiters.', () => {
    const fixture = '---\r\nname: "troublesome --- value"\r\n---\r\nhere is some content\r\n'
    const actual = matter(fixture)

    expect(actual.data).toEqual({ name: 'troublesome --- value' })
    expect(actual.content).toBe('here is some content\r\n')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should correctly parse a string that only has an opening delimiter', () => {
    const fixture = '---\r\nname: "troublesome --- value"\r\n'
    const actual = matter(fixture)

    expect(actual.data).toEqual({ name: 'troublesome --- value' })
    expect(actual.content).toBe('')
    expect(actual.orig.toString()).toBe(fixture)
  })

  it('should not try to parse a string has content that looks like front-matter.', () => {
    const fixture = '-----------name--------------value\r\nfoo'
    const actual = matter(fixture)

    expect(actual.data).toEqual({})
    expect(actual.content).toBe('-----------name--------------value\r\nfoo')
    expect(actual.orig.toString()).toBe(fixture)
  })
})
