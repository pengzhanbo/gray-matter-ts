import type { GrayMatterEngine } from '../types'

export const javascript: GrayMatterEngine = {
  parse: function parse(str, options: unknown, wrap: boolean) {
    /* v8 ignore next -- @preserve */
    try {
      if (wrap !== false) {
        str = `(function() {\nreturn ${str.trim()};\n}());`
      }
      /* eslint no-eval: 0 */
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
}
