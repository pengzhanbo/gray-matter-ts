import type { GrayMatterEngine } from '../types.js'
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
  javascript: {
    parse: function parse(str, options: unknown, wrap: boolean) {
      /* eslint no-eval: 0 */
      try {
        if (wrap !== false) {
          str = `(function() {\nreturn ${str.trim()};\n}());`
        }
        return (0, eval)(str) || {}
      }
      catch (err: any) {
        /* v8 ignore next -- @preserve */ /* v8 ignore next -- @preserve */
        if (wrap !== false && /unexpected|identifier/i.test(err.message)) {
          /* v8 ignore next -- @preserve */
          return parse(str, options, false)
        }
        /* v8 ignore next -- @preserve */
        throw new SyntaxError(err)
      }
    },
    stringify: () => {
      /* v8 ignore next -- @preserve */
      throw new Error('stringifying JavaScript is not supported')
    },
  },
}
