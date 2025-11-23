import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import { load } from 'js-yaml'
import { describe, expect, it } from 'vitest'
import { type Section, type SectionParse, sections } from '../src/internal/sections'
import { fixture } from './helper'

function read(name: string) {
  return fs.readFileSync(fixture(name), 'utf8')
}

describe('section-matter', () => {
  it('should throw an error when invalid args are passed', () => {
    // @ts-expect-error should throw
    expect(() => sections()).toThrow()
  })

  it('should return a file object', () => {
    expect(sections('')).toEqual({ content: '', sections: [] })
    expect(sections('foo')).toEqual({ content: 'foo', sections: [] })
  })

  it('should sections from buffer', () => {
    expect(sections(Buffer.from(''))).toEqual({ content: '', sections: [] })
    expect(sections(Buffer.from('foo'))).toEqual({ content: 'foo', sections: [] })
  })

  it('should correctly parse non-sections', () => {
    expect(sections('foo\n---\nbar')).toEqual({
      content: 'foo\n---\nbar',
      sections: [],
    })
    expect(sections('foo\n---\nbar\n---')).toEqual({
      content: 'foo\n---\nbar\n---',
      sections: [],
    })
  })

  it('should parse front-matter without language', () => {
    expect(sections('---\ntitle: bar\n---\n\nfoo')).toEqual({
      content: '',
      sections: [{ key: '', data: 'title: bar', content: '\nfoo' }],
    })

    expect(sections('---\nfoo\n---\nbar')).toEqual({
      content: '',
      sections: [{ key: '', data: 'foo', content: 'bar' }],
    })
  })

  it('should parse front-matter with language', () => {
    expect(sections('---json\n{"title": "bar"}\n---\n\nfoo')).toEqual({
      content: '',
      sections: [
        {
          key: 'json',
          data: '{"title": "bar"}',
          content: '\nfoo',
        },
      ],
    })
  })

  it('should parse a section', () => {
    expect(sections('---\ntitle: bar\n---\n\nfoo\n---one\ntitle: One\n---\nThis is one')).toEqual({
      content: '',
      sections: [
        {
          key: '',
          data: 'title: bar',
          content: '\nfoo',
        },
        {
          key: 'one',
          data: 'title: One',
          content: 'This is one',
        },
      ],
    })
  })

  it('should use custom section_delimiter', () => {
    expect(sections('~~~\ntitle: bar\n~~~\n\nfoo\n~~~one\ntitle: One\n~~~\nThis is one', { section_delimiter: '~~~' })).toEqual({
      content: '',
      sections: [
        {
          key: '',
          data: 'title: bar',
          content: '\nfoo',
        },
        {
          key: 'one',
          data: 'title: One',
          content: 'This is one',
        },
      ],
    })
  })

  it('should use a custom parser on sections', () => {
    const parse: SectionParse = (section: Section) => {
      section.data = load(section.data) as string
    }
    expect(
      sections('---\ntitle: bar\n---\n\nfoo\n---one\ntitle: One\n---\nThis is one', parse),
    ).toEqual({
      content: '',
      sections: [
        {
          key: '',
          data: { title: 'bar' },
          content: '\nfoo',
        },
        {
          key: 'one',
          data: { title: 'One' },
          content: 'This is one',
        },
      ],
    })
  })

  it('should parse multiple sections', () => {
    const input = read('multiple.md')

    expect(sections(input)).toEqual({
      content: '',
      sections: [
        {
          key: '',
          data: 'title: bar',
          content: '\nfoo\n',
        },
        {
          key: 'one',
          data: 'title: One',
          content: 'This is one\n',
        },
        {
          key: 'two',
          data: 'title: Two',
          content: 'This is two\n',
        },
      ],
    })
  })

  it('should not parse non-sections', () => {
    const input = read('hr.md')

    expect(sections(input)).toEqual({
      content: '',
      sections: [
        {
          key: 'yaml',
          data: 'title: I\'m front matter',
          content: '\nThis page has front matter that should be parsed before the sections.\n',
        },
        {
          key: 'aaa',
          data: 'title: First section',
          content: '\nSection one.\n',
        },
        {
          key: 'bbb',
          data: 'title: Non-section horizontal rules',
          content: '\nPart 1.\n\n---\n\nPart 2.\n\n---\n\nPart 3.\n',
        },
        {
          key: 'ccc',
          data: 'title: Third section',
          content: '\nSection three.\n',
        },
      ],
    })
  })
})
