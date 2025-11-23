import { green } from 'ansis'
import { matter } from 'gray-matter-ts'

console.log(green('/* excerpt with custom separator */'))

const file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '<!-- sep -->',
  'This is content',
].join('\n'), { excerpt_separator: '<!-- sep -->' })

console.log(file)
