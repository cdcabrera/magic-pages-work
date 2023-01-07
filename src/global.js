const { join } = require('path');

/**
 * Console output colors
 *
 * @type {{RED: string, WHITE: string, BLUE: string, NOCOLOR: string, BLACK: string, MAGENTA: string,
 *     YELLOW: string, CYAN: string, GREEN: string, GREY: string}}
 */
const color = {
  BLACK: '\x1b[30m',
  BLUE: '\x1b[34m',
  CYAN: '\x1b[36m',
  GREEN: '\x1b[32m',
  GREY: '\x1b[90m',
  MAGENTA: '\x1b[35m',
  NOCOLOR: '\x1b[0m',
  RED: '\x1b[31m',
  WHITE: '\x1b[37m',
  YELLOW: '\x1b[33m'
};

/**
 * Convenience wrapper for preset console messaging and colors.
 *
 * @type {{warn: (function(...[*]): void), log: (function(...[*]): void), success: (function(...[*]): void),
 *    error: (function(...[*]): void), info: (function(...[*]): void)}}
 */
const consoleMessage = (() => {
  const applyColor = (method, passedColor, ...args) =>
    console[method](`${passedColor}${args.join('\n')}${color.NOCOLOR}`);

  return {
    error: (...args) => applyColor('error', color.RED, ...args),
    success: (...args) => applyColor('log', color.GREEN, ...args),
    info: (...args) => applyColor('info', color.BLUE, ...args),
    log: (...args) => applyColor('log', color.NOCOLOR, ...args),
    warn: (...args) => applyColor('warn', color.YELLOW, ...args)
  };
})();

/**
 * Set context path
 *
 * @type {string}
 * @private
 */
const contextPath = (global._MAGIC_PAGES_WORK_CONTEXT_PATH =
  (process.env.NODE_ENV === 'test' && join('..', 'src', '__fixtures__')) ||
  (process.env.NODE_ENV === 'development' && join(__dirname, './__fixtures__')) ||
  process.cwd());

/**
 * Default cli and configuration settings
 *
 * @type {{PORT: number, RESPONSE_CACHE_SIZE: number, PARSE_METHOD: string,
 *     RESPONSE_TIME: number, RESPONSE_HTTP_STATUS: number[], RESPONSE_CACHE: number}}
 */
const defaults = {
  PARSE_METHOD: 'dereference',
  PORT: 5000,
  RESPONSE_CACHE: 60000,
  RESPONSE_CACHE_SIZE: 100,
  RESPONSE_HTTP_STATUS: [199, 300],
  RESPONSE_TIME: 0
};

/**
 * Join url path, can also be used as confirmation.
 *
 * @param {string} base
 * @param {Array} args
 * @returns {undefined|*}
 */
const joinUrl = (base, ...args) => {
  let updatedUrl;

  try {
    if (args.length) {
      updatedUrl = new URL(join(...args), base);
    } else {
      updatedUrl = new URL(base);
    }
  } catch (e) {
    return undefined;
  }

  return updatedUrl;
};

module.exports = { color, consoleMessage, contextPath, defaults, joinUrl };
