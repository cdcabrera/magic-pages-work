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

module.exports = { color };