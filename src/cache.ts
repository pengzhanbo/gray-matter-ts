import type { GrayMatterFile } from './types'

export const cache = new Map<string, GrayMatterFile<any>>()

export function clearCache(): void {
  cache.clear()
}
