import {globby} from 'globby'
import {deleteAsync} from 'del'
import path from 'node:path'

export async function cleanJsAsync(patterns, {cwd = process.cwd(), ...options} = {}) {
  let dir = cwd
  if (patterns.length > 0) {
    dir = patterns[0]
  }
  options = {
    cwd: dir,
    onlyDirectories: true,
    onlyFiles: false,
    absolute: true,
    ...options,
  }
  const dirs = await globby(['**/node_modules', '!**/node_modules/**/node_modules'], options)
  let removedDirs = []
  for (let i = 0; i < dirs.length; i++) {
    // call remove once
    const parentDir = path.dirname(dirs[i])
    options.cwd = parentDir
    
    removedDirs = removedDirs.concat(await deleteAsync('./node_modules', options))
  }
  return removedDirs
}