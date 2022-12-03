#!/usr/bin/env node

const yargs = require('yargs');
const packageJson = require('../package');
const { magicPagesWork } = require('../src');

/**
 * Setup yargs
 */
const { version = packageJson.version } = yargs
  .usage('Generate an API based on a Swagger compatible YAML or JSON file.\n\nUsage: mock [options]')
  .help('help')
  .alias('h', 'help')
  .version('version', packageJson.version)
  .alias('v', 'version').argv;

if (process.env.NODE_ENV === 'test') {
  process.stdout.write(
    JSON.stringify({
      version
    })
  );
} else {
  magicPagesWork({
    version
  });
}
