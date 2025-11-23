import { describe, expect, it } from 'vitest'
import { matter } from '../src/matter'

describe('gray-matter .excerpt', () => {
  it('should get an excerpt after front matter', () => {
    const file = matter('---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent', { excerpt: true })

    expect(file.matter).toBe('\nabc: xyz')
    expect(file.content).toBe('foo\nbar\nbaz\n---\ncontent')
    expect(file.excerpt).toBe('foo\nbar\nbaz\n')
    expect(file.data.abc).toBe('xyz')
  })

  it('should not get excerpt when disabled', () => {
    const file = matter('---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent')

    expect(file.matter).toBe('\nabc: xyz')
    expect(file.content).toBe('foo\nbar\nbaz\n---\ncontent')
    expect(file.excerpt).toBe('')
    expect(file.data.abc).toBe('xyz')
  })

  it('should use a custom separator', () => {
    const file = matter('---\nabc: xyz\n---\nfoo\nbar\nbaz\n<!-- endexcerpt -->\ncontent', {
      excerpt_separator: '<!-- endexcerpt -->',
    })

    expect(file.matter).toBe('\nabc: xyz')
    expect(file.content).toBe('foo\nbar\nbaz\n<!-- endexcerpt -->\ncontent')
    expect(file.excerpt).toBe('foo\nbar\nbaz\n')
    expect(file.data.abc).toBe('xyz')
  })

  it('should use a custom separator when no front-matter exists', () => {
    const file = matter('foo\nbar\nbaz\n<!-- endexcerpt -->\ncontent', {
      excerpt_separator: '<!-- endexcerpt -->',
    })

    expect(file.matter).toBe('')
    expect(file.content).toBe('foo\nbar\nbaz\n<!-- endexcerpt -->\ncontent')
    expect(file.excerpt).toBe('foo\nbar\nbaz\n')
    expect(file.data).toEqual({})
  })

  it('should use a custom function to get excerpt', () => {
    const file = matter('---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent', {
      excerpt() {
        return 'custom'
      },
    })

    expect(file.matter).toBe('\nabc: xyz')
    expect(file.content).toBe('foo\nbar\nbaz\n---\ncontent')
    expect(file.excerpt).toBe('custom')
    expect(file.data.abc).toBe('xyz')
  })
})
