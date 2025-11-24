import { green } from 'ansis'
import { read } from 'gray-matter-ts'
import { coffee } from 'gray-matter-ts/engines/coffeescript'
import { fixture } from './helper.mjs'

let file

console.log(green('/* coffescript (detected after first delimiter in front-matter) */'))

file = read(fixture('coffee-auto.md'), { engines: { coffee } })

console.log(file)
console.log()

console.log(green('/* coffescript (defined on options) */'))

file = read(fixture('coffee.md'), {
  language: 'coffee',
  engines: { coffee },
})

console.log(file)
