#!/usr/bin/env node

/**
 * @file bluecli.js
 * @description This is the main entry point for the bluecli command-line interface.
 * It sets up the Commander.js program, defines global options, and registers subcommands.
 * @author Ion Gireada
 */

const { program } = require('commander')
const pkg = require('../package.json')

// Global CLI metadata
program
  .name('bluecli')
  .description('CLI generator for CLIs, powered by commander.js')
  .version(pkg.version)

  .option('-v, --verbose', 'enable verbose logging')
  .option('--debug', 'enable debug logging')
  .option('--quiet', 'disable all logging')

// Register subcommands
require('../src/commands/generate')(program)
// require('../src/commands/validate')(program)
require('../src/commands/list-templates')(program)

program.configureHelp({
  sortSubcommands: true,
  sortOptions: true,
})

program.parse(process.argv)
