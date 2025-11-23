import fs from 'node:fs'
import path from 'node:path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export const fixture = path.join.bind(path, __dirname, 'fixtures')

export const readFile = name => fs.readFileSync(fixture(name), 'utf8')
