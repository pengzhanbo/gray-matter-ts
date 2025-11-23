import type { GrayMatterOptions } from '../src/types'
import { load } from 'js-yaml'
import { describe, expect, it } from 'vitest'
import { read } from '../src/read'
import { fixture, hasOwn } from './helper'

function parse(name: string, options?: GrayMatterOptions) {
  return read(fixture(name), options)
}

describe('custom parser:', () => {
  it('should allow a custom parser to be registered:', () => {
    const file = parse('lang-yaml.md', {
      engines: {
        parser: (str) => {
          try {
            return load(str) as object
          }
          catch (err: any) {
            throw new SyntaxError(err)
          }
        },
      },
    })

    expect(file.data.title).toBe('YAML')
    expect(hasOwn(file, 'data')).toBe(true)
    expect(hasOwn(file, 'content')).toBe(true)
    expect(hasOwn(file, 'orig')).toBe(true)
  })
})
