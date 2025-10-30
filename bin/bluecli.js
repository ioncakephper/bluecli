#!/usr/bin/env node

const { program } = require('commander')
const pkg = require('../package.json')

// Global CLI metadata
program
  .name('bluecli')
  .description('CLI generator for CLIs, powered by commander.js')
  .version(pkg.version)

// Register subcommands
require('../src/commands/generate')(program)
// require('../src/commands/validate')(program)
require('../src/commands/list-templates')(program)

program.configureHelp({
  sortSubcommands: true,
  sortOptions: true,
})

program.parse(process.argv)
