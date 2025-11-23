import { matter } from 'gray-matter-ts'

const file1 = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content',
].join('\n'))
console.log(file1)

const file2 = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content',
].join('\n'))
console.log(file2)
