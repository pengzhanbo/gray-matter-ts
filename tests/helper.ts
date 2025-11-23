import path from 'node:path'

export const fixture = path.join.bind(path, __dirname, 'fixtures')

export const hasOwn = (obj: object, key: PropertyKey): boolean => Object.prototype.hasOwnProperty.call(obj, key)
