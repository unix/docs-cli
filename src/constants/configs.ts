const pkg = require('docs-catalog/package.json') || {}

export const host = `https://cdn.jsdelivr.net/npm/docs-catalog@${pkg.version || 'latest'}/`

export const redirectHost = 'https://docs.codes/'
