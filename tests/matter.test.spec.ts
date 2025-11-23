import { describe, expect, it } from 'vitest'
import { test } from '../src/test'

describe('gray-matter test', () => {
  it('should return `true` if the string has front-matter:', () => {
    expect(test('---\nabc: xyz\n---')).toBe(true)
    expect(test('---\nabc: xyz\n---', { delimiters: '~~~' })).toBe(false)
    expect(test('~~~\nabc: xyz\n~~~', { delimiters: '~~~' })).toBe(true)
    expect(test('\nabc: xyz\n---')).toBe(false)
  })
})
