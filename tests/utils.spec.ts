import { Buffer } from 'node:buffer'
import { describe, expect, it } from 'vitest'
import { isBuffer, stripBomString, toArray, toBuffer, toString } from '../src/internal/utils'

describe('utils - stripBomString', () => {
  it('should strip bom:', () => {
    expect(stripBomString('\uFEFFabc')).toBe('abc')
    expect(stripBomString('abc')).toBe('abc')
  })

  it('should return a non-string value', () => {
    // @ts-expect-error should not throw
    expect(stripBomString(123)).toBe(123)
    // @ts-expect-error should not throw
    expect(stripBomString({})).toEqual({})
  })
})

describe('utils - toBuffer', () => {
  it('should return a buffer', () => {
    expect(isBuffer(toBuffer('abc'))).toBe(true)
    expect(toBuffer('abc').toString()).toBe('abc')
    expect(toBuffer(Buffer.from('abc')).toString()).toBe('abc')
  })
})

describe('utils - toString', () => {
  it('should return a string', () => {
    expect(toString('abc')).toBe('abc')
    expect(toString(Buffer.from('abc'))).toBe('abc')
  })

  it('should throw if value is not a string or buffer', () => {
    expect(() => toString(123)).toThrow(TypeError)
    expect(() => toString({})).toThrow(TypeError)
  })
})

describe('utils - toArray', () => {
  it('should return an array', () => {
    expect(toArray('abc')).toEqual(['abc'])
    expect(toArray(['abc'])).toEqual(['abc'])
    expect(toArray()).toEqual([])
    expect(toArray(null)).toEqual([])
  })
})
