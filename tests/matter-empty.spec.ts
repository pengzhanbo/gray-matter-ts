import { describe, expect, it } from 'vitest'
import { clearCache } from '../src/cache'
import { matter } from '../src/matter'

describe('gray-matter', () => {
  it('should work with empty front-matter', () => {
    const file1 = matter('---\n---\nThis is content')
    expect(file1.data).toEqual({})
    expect(file1.content).toBe('This is content')

    const file2 = matter('---\n\n---\nThis is content')
    expect(file2.data).toEqual({})
    expect(file2.content).toBe('This is content')

    const file3 = matter('---\n\n\n\n\n\n---\nThis is content')
    expect(file3.data).toEqual({})
    expect(file3.content).toBe('This is content')
  })

  it('should add content with empty front matter to file.empty', () => {
    expect(matter('---\n---').empty).toBe('---\n---')
  })

  it('should update file.isEmpty to true', () => {
    expect(matter('---\n---').isEmpty).toBe(true)

    clearCache()
  })

  it('should work when front-matter has comments', () => {
    const fixture = '---\n # this is a comment\n# another one\n---'
    expect(matter(fixture).empty).toBe(fixture)
  })
})
