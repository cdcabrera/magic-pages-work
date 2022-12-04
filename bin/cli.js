#!/usr/bin/env node

const yargs = require('yargs');
const packageJson = require('../package');
const { magicPagesWork } = require('../src');

/**
 * Setup yargs
 */
const { version = packageJson.version, ...args } = yargs
  .wrap(yargs.terminalWidth())
  .parserConfiguration({
    'flatten-duplicate-arrays': false
  })
  .usage('Generate an API based on a Swagger compatible YAML or JSON file.\n\nUsage: mock [options]')
  .help('help')
  .alias('h', 'help')
  .version('version', packageJson.version)
  .alias('v', 'version')
  .option('parseMethod', {
    default: 'dereference',
    describe: "Expose the Swagger parser's methods.",
    choices: ['validate', 'dereference', 'bundle', 'parse', 'resolve']
  })
  .option('parse', {
    describe: 'Expose internal parser to convert a Swagger YAML file to JSON, or JSON file',
    requiresArg: true,
    type: 'array',
    coerce: args => {
      if (Array.isArray(args[0])) {
        return args.map(([source, output]) => ({ source, output }));
      }

      const [source, output] = args;
      return [
        {
          source,
          output
        }
      ];
    }
  }).argv;

if (process.env.NODE_ENV === 'test') {
  process.stdout.write(
    JSON.stringify({
      ...args,
      version
    })
  );
} else {
  magicPagesWork({
    ...args,
    version
  });
}
