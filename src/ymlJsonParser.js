const { writeJsonSync } = require('fs-extra');
const SwaggerParser = require('@apidevtools/swagger-parser');
const { color } = require('./global');

/**
 * Parse local, or remote, swagger/openapi docs then return an output reference and content.
 *
 * @param {object} params
 * @param {{ source: string, output: string|undefined }[]} params.files
 * @param {string} params.parseMethod
 * @returns {Promise<{output: string|undefined, source: string, content: {}}>[]}
 */
const ymlJsonParser = ({ files = [], parseMethod } = {}) =>
  files.map(async ({ source: sourceFilePath, output: outputFilePath } = {}) => {
    const sourceFile = sourceFilePath.split('/').pop();
    const outputFile = (outputFilePath && outputFilePath.split('/').pop()) || undefined;
    let jsonOutput = {};

    try {
      const parser = new SwaggerParser();
      jsonOutput = await parser[parseMethod](sourceFilePath);

      if (jsonOutput && outputFilePath) {
        writeJsonSync(outputFilePath, jsonOutput);
      }

      console.info(
        color.BLUE,
        `\nyamlJsonParser: ${(outputFile?.length && outputFile) || outputFilePath || parseMethod}, success`,
        color.NOCOLOR
      );
    } catch (e) {
      console.warn(
        color.RED,
        `\nyamlJsonParser: ${(sourceFile?.length && sourceFile) || sourceFilePath || 'JSON'}, ${e.message}`,
        color.NOCOLOR
      );
    }

    if (parseMethod !== 'resolve' && parseMethod !== 'validate') {
      console.info(JSON.stringify(jsonOutput, null, 2));
    }

    return {
      content: jsonOutput,
      output: outputFilePath,
      source: sourceFilePath
    };
  });

module.exports = {
  ymlJsonParser
};
