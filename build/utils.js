import path from 'path'
import glob from 'glob'

export function getEntries (globPath) {
    let entries = {}
    glob.sync(globPath).forEach( (entry) => {                    
        const basename = path.basename(entry, path.extname(entry))
        const tmp = entry.split('/').splice(-3)
        const pathname = tmp.splice(1, 1) + '/' + basename;
        entries[pathname] = entry
    })

    return entries
}