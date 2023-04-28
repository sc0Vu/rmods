#!/usr/bin/env node
import process from 'node:process'
import meow from 'meow'
import { cleanJsAsync } from './clean.js'

const cli = meow(`
	Usage
	  $ rmods <path|glob> …

	Options
	  --force, -f    Allow deleting the current working directory and outside
	  --dry-run, -d  List what would be deleted instead of deleting

	Examples
	  $ rmods ~/Desktop --js
`, {
	importMeta: import.meta,
	flags: {
		force: {
			type: 'boolean',
			alias: 'f',
		},
		dryRun: {
			type: 'boolean',
			alias: 'd',
		},
	},
})

if (cli.input.length > 1) {
	console.error('Specify only one path')
	process.exitCode = 1
} else {
	const dirs = await cleanJsAsync(cli.input, cli.flags)

	if (cli.flags.dryRun) {
		console.log(dirs.join('\n'))
	}
}