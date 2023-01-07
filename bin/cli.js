#!/usr/bin/env node

const yargs = require('yargs');
const _zipObject = require('lodash.zipobject');
const packageJson = require('../package');
const { defaults } = require('../src/global');
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
  .option('cacheResponse', {
    default: defaults.RESPONSE_CACHE,
    description: 'Expire mock API response cache in milliseconds',
    nargs: 1,
    type: 'number'
  })
  .option('cacheResponseSize', {
    default: defaults.RESPONSE_CACHE_SIZE,
    description: 'Number of mock API response cache entries to avoid unbound growth',
    nargs: 1,
    type: 'number'
  })
  .option('responseTime', {
    default: defaults.RESPONSE_TIME,
    description: 'Set mock API response times by milliseconds',
    nargs: 1,
    type: 'number'
  })
  .option('httpStatusRange', {
    default: defaults.RESPONSE_HTTP_STATUS,
    description: 'Set a mock API http status range',
    nargs: 2,
    type: 'array',
    coerce: (args, props = ['min', 'max']) => _zipObject(props, args)
  })
  .option('ignorePath', {
    description: 'Swagger path(s) to ignore when mock serving',
    type: 'array',
    coerce: args => args.flat()
  })
  .option('mockPath', {
    description: 'Swagger path(s) to mock serve',
    type: 'array',
    coerce: args => args.flat()
  })
  .option('parse', {
    describe: 'Expose internal parser to convert a Swagger YAML file to JSON, or JSON file',
    requiresArg: true,
    type: 'array',
    coerce: (args, props = ['source', 'output']) => {
      if (Array.isArray(args[0])) {
        return args.map(arg => _zipObject(props, arg));
      }

      return [_zipObject(props, args)];
    }
  })
  .option('parseMethod', {
    default: [defaults.PARSE_METHOD],
    describe: "Expose the Swagger parser's methods.",
    choices: ['validate', 'dereference', 'bundle', 'parse', 'resolve']
  })
  .option('p', {
    alias: 'port',
    default: defaults.PORT,
    description: 'Set a mock port',
    nargs: 1,
    type: 'number'
  })
  .option('s', {
    alias: 'serve',
    description: 'Swagger file to mock serve',
    nargs: 1,
    type: 'string'
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
