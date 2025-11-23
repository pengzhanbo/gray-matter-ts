import { green } from 'ansis'
import coffee from 'coffeescript'
import { read } from 'gray-matter-ts'
import { fixture } from './helper.mjs'

const engines = {
  coffee: {
    parse(str, options) {
      return coffee.eval(str, options)
    },
  },
}

let file

console.log(green('/* coffescript (detected after first delimiter in front-matter) */'))

file = read(fixture('coffee-auto.md'), { engines })

console.log(file)
console.log()

console.log(green('/* coffescript (defined on options) */'))

file = read(fixture('coffee.md'), {
  language: 'coffee',
  engines,
})

console.log(file)
