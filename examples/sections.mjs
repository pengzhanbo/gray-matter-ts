import { matter } from 'gray-matter-ts'
import { load } from 'js-yaml'
import { readFile } from './helper.mjs'

const file = matter(readFile('sections.md'), {
  section(section) {
    if (typeof section.data === 'string' && section.data.trim() !== '') {
      section.data = load(section.data)
    }
    section.content = `${section.content.trim()}\n`
  },
})

console.log(file)
