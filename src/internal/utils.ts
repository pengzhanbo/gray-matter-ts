import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'

const _toString = Object.prototype.toString

export function isObject(input: unknown): input is object {
  return _toString.call(input) === '[object Object]'
}

/**
 * Define a property on an object
 */
export function define(obj: object, key: PropertyKey, value: unknown): void {
  Reflect.defineProperty(obj, key, {
    value,
    enumerable: true,
    configurable: true,
    writable: true,
  })
}

/**
 * Remove BOM from a string
 */
export function stripBomString(str: string): string {
  if (typeof str === 'string' && str.charAt(0) === '\uFEFF') {
    return str.slice(1)
  }
  return str
}

/**
 * Check if a value is a Buffer
 */
export function isBuffer(val: any): val is Buffer {
  if (val?.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val)
  }
  return false
}

/**
 * Convert a value to a Buffer
 */
export function toBuffer(input: unknown): Buffer {
  if (isBuffer(input)) {
    return input
  }
  return Buffer.from(input as string)
}

/**
 * Convert value to a string
 */
export function toString(input: unknown): string {
  if (isBuffer(input))
    return stripBomString(String(input))

  if (typeof input !== 'string') {
    throw new TypeError('expected input to be a string or buffer')
  }
  return stripBomString(input)
}

/**
 * Convert value to an array
 */
export function toArray<T>(input?: T): T[] {
  return input ? Array.isArray(input) ? input : [input] : []
}

/**
 * Create a md5 hash
 */
export function hash(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex')
}
