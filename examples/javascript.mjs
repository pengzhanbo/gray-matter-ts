import { green } from 'ansis'
import { matter } from 'gray-matter-ts'
import { javascript } from 'gray-matter-ts/engines/javascript'

const file = matter([
  '---js',
  '{',
  '  reverse: function(str) {',
  '    return str.split(",").reverse().join(",");',
  '  }',
  '}',
  '---',
  'This is content',
].join('\n'), { engines: { javascript } })

console.log(green('/* javascript front-matter */'))
console.log(file)

console.log()
console.log(green('/* example after calling a function from front-matter */'))
file.data.baz = file.data.reverse('x,y,z')
console.log(file)
