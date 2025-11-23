import { matter } from 'gray-matter-ts'

/**
 * Parse YAML front-matter
 */

const str = `---
---
This is content`
const file = matter(str)

console.log(file)
if (file.isEmpty) {
  file.content = str
}
console.log(file)
