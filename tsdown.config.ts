import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    coffeescript: './src/engines/coffeescript.ts',
    javascript: './src/engines/javascript.ts',
    toml: './src/engines/toml.ts',
  },
  dts: true,
  minify: true,
  format: 'esm',
})
