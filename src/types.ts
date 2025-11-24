import type { Buffer } from 'node:buffer'
import type { SectionsOptions } from './internal/sections'

export type Input = string | Buffer
export type Data = Record<string, any>

export interface GrayMatterOptions<I extends Input = Input, D extends Data = Data> {
  parser?: () => void
  /**
   * Whether to evaluate the front matter
   * @default false
   */
  eval?: boolean
  /**
   * Whether to extract the excerpt
   * @default false
   */
  excerpt?: boolean | string | ((file: GrayMatterFile<I, D>, options: GrayMatterOptions<I, D>) => GrayMatterFile<I, D> | void)
  /**
   * The separator to use between the excerpt and the rest of the content
   */
  excerpt_separator?: string
  /**
   * The engines to use for the front matter
   * @default { yaml, json, javascript }
   */
  engines?: {
    [index: string]:
        | ((input: string) => D)
        | GrayMatterEngine<D>
  }
  /**
   * The language to use for the front matter
   * @default 'yaml'
   */
  language?: string
  /**
   * The delimiters to use for the front matter
   * @default '---''
   */
  delimiters?: string | [string, string]

  sections?: boolean

  section?: SectionsOptions
}

export interface GrayMatterFile<I extends Input = Input, D extends Data = Data> {
  data: D
  content: string
  orig: I
  language: string
  matter: string
  excerpt: string
  isEmpty: boolean
  empty?: string
  path?: string
  stringify: (data: D, options?: GrayMatterOptions) => string
}

export interface GrayMatterEngine<D extends Data = Data> {
  parse: (input: string, ...args: any[]) => D
  stringify?: (data: D, ...args: any[]) => string
}
