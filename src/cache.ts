import type { GrayMatterFile } from './types'

export const cache = new Map<string, GrayMatterFile>()

export function clearCache(): void {
  cache.clear()
}
