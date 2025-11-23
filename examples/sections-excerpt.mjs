import { matter } from 'gray-matter-ts'
import { readFile } from './helper.mjs'

const res = matter(readFile('sections-excerpt.md'), { excerpt: true, sections: true })
console.log(res)
