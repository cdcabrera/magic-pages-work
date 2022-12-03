const { color } = require('./global');

/**
 * Setup mock.
 *
 * @param {object} params
 * @param {string} params.version
 */
const magicPagesWork = ({ version } = {}) => {
  if (process.env.NODE_ENV !== 'test') {
    console.info(color.CYAN, `\nmagic-pages-work version: ${version}`);
  }

  return {
    version
  };
};

module.exports = { magicPagesWork };
