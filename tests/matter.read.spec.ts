import { describe, expect, it } from 'vitest'
import { read } from '../src/read'
import { fixture, hasOwn } from './helper'

describe('gray-matter read', () => {
  it('should extract YAML front matter from files with content.', () => {
    const file = read(fixture('basic.txt'))

    expect(hasOwn(file, 'path')).toBe(true)
    expect(hasOwn(file, 'data')).toBe(true)
    expect(file.data).toEqual({ title: 'Basic' })
    expect(file.content).toBe('this is content.')
  })

  it('should parse complex YAML front matter.', () => {
    const file = read(fixture('complex.md'))

    expect(hasOwn(file, 'data')).toBe(true)
    expect(file.data.root).toBe('_gh_pages')

    expect(hasOwn(file, 'path')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
    expect(hasOwn(file.data, 'root')).toBe(true)
  })

  it('should return an object when a file is empty.', () => {
    const file = read(fixture('empty.md'))
    expect(hasOwn(file, 'path')).toBe(true)
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should return an object when no front matter exists.', () => {
    const file = read(fixture('hasnt-matter.md'))

    expect(hasOwn(file, 'path')).toBe(true)
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })

  it('should parse YAML files directly', () => {
    const file = read(fixture('all.yaml'))

    expect(hasOwn(file, 'path')).toBe(true)
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)

    expect(file.data).toEqual({
      one: 'foo',
      two: 'bar',
      three: 'baz',
    })
  })
})
