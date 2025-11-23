import { describe, expect, it } from 'vitest'
import { stringify as internalStringify } from '../src/internal/stringify'
import { stringify } from '../src/stringify'

describe('gay-matter stringify', () => {
  it('should stringify front-matter from a file object', () => {
    expect(stringify({ content: 'Name: {{name}}\n', data: { name: 'gray-matter' } })).toBe([
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n',
    ].join('\n'))
  })

  it('should stringify throw error', () => {
    // @ts-expect-error should throw
    expect(() => stringify()).toThrow()
  })

  it('should stringify from a string', () => {
    expect(stringify('Name: {{name}}\n')).toBe('Name: {{name}}\n')
  })

  it('should use custom delimiters to stringify', () => {
    expect(stringify('Name: {{name}}', { name: 'gray-matter' }, { delimiters: '~~~' })).toBe([
      '~~~',
      'name: gray-matter',
      '~~~',
      'Name: {{name}}\n',
    ].join('\n'))
  })

  it('should stringify a file object', () => {
    expect(stringify({ content: 'Name: {{name}}', data: { name: 'gray-matter' } })).toBe([
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n',
    ].join('\n'))
  })

  it('should stringify a file object with language `json`', () => {
    expect(stringify({ content: 'Name: {{name}}', data: { name: 'gray-matter' }, language: 'json' })).toBe([
      '---',
      '{\n  "name": "gray-matter"\n}',
      '---',
      'Name: {{name}}\n',
    ].join('\n'))
  })

  it('should stringify an excerpt', () => {
    expect(stringify({ content: 'Name: {{name}}', data: { name: 'gray-matter' }, excerpt: 'This is an excerpt.' })).toEqual([
      '---',
      'name: gray-matter',
      '---',
      'This is an excerpt.',
      '---',
      'Name: {{name}}\n',
    ].join('\n'))
  })

  it('should not add an excerpt if it already exists', () => {
    expect(stringify({ content: 'Name: {{name}}\n\nThis is an excerpt.', data: { name: 'gray-matter' }, excerpt: 'This is an excerpt.' })).toEqual([
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n\nThis is an excerpt.\n',
    ].join('\n'))
  })
})

describe('gray-matter internal/stringify', () => {
  it('should throw error', () => {
    // @ts-expect-error should throw
    expect(() => internalStringify()).toThrow()
  })

  it('should stringify from a string', () => {
    expect(internalStringify('Name: {{name}}\n')).toBe('Name: {{name}}\n')
  })

  it('should stringify from an object', () => {
    expect(internalStringify({ content: 'Name: {{name}}\n' })).toBe('Name: {{name}}\n')
  })
})
