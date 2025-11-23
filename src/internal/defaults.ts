import type { Data, GrayMatterOptions, Input } from '../types'
import { engines } from './engines'
import { toArray } from './utils'

export type ResolvedOptions<I extends Input = Input, D extends Data = Data> = Required<Omit<GrayMatterOptions<I, D>, 'delimiters'>> & {
  delimiters: [string, string]
}

export function defaults<I extends Input, D extends Data>({ delimiters, ...options }: GrayMatterOptions<I, D> = {}): ResolvedOptions<I, D> {
  const opts = {
    eval: false,
    excerpt: false,
    ...options,
  } as ResolvedOptions<I, D>

  // ensure that delimiters are an array
  const _delimiters = toArray(delimiters || '---')
  if (_delimiters.length === 1)
    _delimiters.push(_delimiters[0]!)

  opts.delimiters = _delimiters as [string, string]
  opts.language = (options.language || 'yaml').toLowerCase()
  opts.engines = { ...engines, ...opts.engines } as ResolvedOptions<I, D>['engines']

  return opts
}
