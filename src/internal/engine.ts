import type { Data, GrayMatterEngine, Input } from '../types'
import type { ResolvedOptions } from './defaults'

/**
 * Find gray-matter engine
 */
export function findEngine<I extends Input, D extends Data>(name: string, { engines }: ResolvedOptions<I, D>): GrayMatterEngine<D> {
  let engine = engines[name] || engines[aliase(name)]
  if (typeof engine === 'undefined') {
    throw new TypeError(`gray-matter engine "${name}" is not registered`)
  }
  if (typeof engine === 'function') {
    engine = { parse: engine }
  }
  return engine
}

function aliase(name: string): string {
  switch (name.toLowerCase()) {
    case 'js':
    case 'javascript':
      return 'javascript'
    case 'coffee':
    case 'coffeescript':
    case 'cson':
      return 'coffee'
    case 'yaml':
    case 'yml':
      return 'yaml'
    default: {
      return name
    }
  }
}
