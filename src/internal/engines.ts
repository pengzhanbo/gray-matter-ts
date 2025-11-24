import type { GrayMatterEngine } from '../types'
import { dump, load } from 'js-yaml'

export const engines: Record<string, GrayMatterEngine> = {
  yaml: {
    parse: load as unknown as GrayMatterEngine['parse'],
    stringify: dump,
  },
  json: {
    parse: JSON.parse.bind(JSON),
    stringify: (data, { replacer = null, space = 2 }) => JSON.stringify(data, replacer, space),
  },
}
