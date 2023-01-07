require('./global');
const { ymlJsonParser } = require('./ymlJsonParser');
const { _MAGIC_PAGES_WORK_CONTEXT_PATH: CONTEXT_PATH } = global;

/**
 * Setup mock.
 *
 * @param {object} params
 * @param {number} params.cacheResponse
 * @param {number} params.cacheResponseSize
 * @param {string} params.contextPath
 * @param {[min: number, max: number]} params.httpStatusRange
 * @param {Array} params.ignorePath
 * @param {Array} params.mockPath
 * @param {{ source: string, output: string|undefined}[]} params.parse
 * @param {} params.parseMethod
 * @param {} params.port
 * @param {} params.responseTime
 * @param {} params.serve
 * @param {} params.version
 * @return {Promise<{output: (string|undefined), source: string, content: {}}>[]|{version: *}}
 */
const magicPagesWork = async ({
  cacheResponse,
  cacheResponseSize,
  contextPath = CONTEXT_PATH,
  httpStatusRange = [],
  ignorePath = [],
  mockPath = [],
  parse: filesToParse,
  parseMethod,
  port,
  responseTime,
  serve,
  version
} = {}) => {
  // if (process.env.NODE_ENV !== 'test') {
  process.chdir(contextPath);
  //}

  if (Array.isArray(filesToParse) && filesToParse.length) {
    return ymlJsonParser({ files: filesToParse, parseMethod });
  }

  console.log(cacheResponse, cacheResponseSize, httpStatusRange, mockPath, port, responseTime, serve, ignorePath);

  return {
    version
  };
};

module.exports = { magicPagesWork };
