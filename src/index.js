require('./global');
const { ymlJsonParser } = require('./ymlJsonParser');
const { _MAGIC_PAGES_WORK_CONTEXT_PATH: CONTEXT_PATH } = global;

/**
 * Setup mock.
 *
 * @param {object} params
 * @param {string} params.version
 */
const magicPagesWork = ({ contextPath = CONTEXT_PATH, version, parse: filesToParse, parseMethod } = {}) => {
  if (process.env.NODE_ENV !== 'test') {
    process.chdir(contextPath);
  }

  if (Array.isArray(filesToParse) && filesToParse.length) {
    return ymlJsonParser({ files: filesToParse, parseMethod });
  }

  return {
    version
  };
};

module.exports = { magicPagesWork };
