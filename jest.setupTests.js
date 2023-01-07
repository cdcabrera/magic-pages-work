const { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } = require('fs');
const crypto = require('crypto');
const { extname, join, resolve } = require('path');

jest.mock('console', () => ({
  ...jest.requireActual('console'),
  error: (...args) => `<console.error>${JSON.stringify(args)}</console.error>`,
  info: (...args) => `<console.info>${JSON.stringify(args)}</console.info>`,
  log: (...args) => `<console.log>${JSON.stringify(args)}</console.log>`,
  warn: (...args) => `<console.warn>${JSON.stringify(args)}</console.warn>`
}));

jest.mock('child_process', () => ({
  ...jest.requireActual('child_process'),
  execSync: (...args) => `<execSync>${JSON.stringify(args)}</execSync>`
}));

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  writeFileSync: (...args) => `<writeFileSync>${JSON.stringify(args)}</writeFileSync>`
}));

/**
 * Generate a fixture from string literals.
 *
 * @param {string} contents
 * @param {object} options
 * @param {string} options.dir
 * @param {string} options.ext
 * @param {string} options.encoding
 * @param {string} options.filename
 * @param {boolean} options.resetDir
 * @returns {{path: string, file: string, contents: *, dir: string}}
 */
const generateFixture = (
  contents,
  { dir = resolve(__dirname, '.fixtures'), ext = 'txt', encoding = 'utf8', filename, resetDir = true } = {}
) => {
  const updatedFileName = filename || crypto.createHash('md5').update(contents).digest('hex');
  const file = extname(updatedFileName) ? updatedFileName : `${updatedFileName}.${ext}`;
  const path = join(dir, file);

  if (resetDir && existsSync(dir)) {
    rmSync(dir, { recursive: true });
  }

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(path, contents, { encoding });
  const updatedContents = readFileSync(path, { encoding });

  return { dir, file, path, contents: updatedContents };
};

global.generateFixture = generateFixture;
