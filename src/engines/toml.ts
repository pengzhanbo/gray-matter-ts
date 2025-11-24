import type { GrayMatterEngine } from '../types'
import { parse, stringify } from 'smol-toml'

export const toml: GrayMatterEngine = {
  parse: (str, options) => {
    return parse(str, options)
  },
  stringify: (data) => {
    return stringify(data)
  },
}
