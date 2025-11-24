import { matter } from 'gray-matter-ts'
import { toml } from 'gray-matter-ts/engines/toml'

/**
 * Parse TOML front-matter
 */

const str = [
  '---toml',
  'title = "TOML"',
  'description = "Front matter"',
  'categories = "front matter toml"',
  '---',
  'This is content',
].join('\n')

const file = matter(str, { engines: { toml } })

console.log(file)
