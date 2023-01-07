const { join } = require('path');
const { writeJsonSync } = require('fs-extra');
const SwaggerParser = require('@apidevtools/swagger-parser');
const { consoleMessage, joinUrl } = require('./global');
const { _MAGIC_PAGES_WORK_CONTEXT_PATH: CONTEXT_PATH } = global;

/**
 * Parse local, or remote, swagger/openapi docs then return an output reference and content.
 *
 * @param {object} params
 * @param {{ source: string, output: string|undefined }[]} params.files
 * @param {string} params.parseMethod
 * @returns {Promise<{output: string|undefined, source: string, content: {}}>[]}
 */
const ymlJsonParser = ({ files = [], parseMethod } = {}, { contextPath = CONTEXT_PATH } = {}) =>
  Promise.all([
    ...files.map(async ({ source: sourceFilePath, output: outputFilePath } = {}, index) => {
      let updatedSourceFilePath = sourceFilePath;
      if (!joinUrl(updatedSourceFilePath)) {
        updatedSourceFilePath = join(contextPath, updatedSourceFilePath);
      }

      const sourceFile = updatedSourceFilePath.split('/').pop();
      const outputFile = (outputFilePath && outputFilePath.split('/').pop()) || undefined;
      let jsonOutput;

      if (index === 0) {
        consoleMessage.info('Parse Swagger files...');
      }

      try {
        const parser = new SwaggerParser();
        jsonOutput = await parser[parseMethod](updatedSourceFilePath);

        if (jsonOutput && outputFilePath) {
          writeJsonSync(outputFilePath, jsonOutput);
        }

        consoleMessage.info(
          `yamlJsonParser: Output "${(outputFile?.length && outputFile) || outputFilePath || parseMethod}", success`
        );
      } catch (e) {
        consoleMessage.warn(
          `yamlJsonParser: Output "${(sourceFile?.length && sourceFile) || updatedSourceFilePath || 'JSON'}", ${
            e.message
          }`
        );
      }

      if (!jsonOutput) {
        consoleMessage.warn(`yamlJsonParser: skip JSON output for "${outputFilePath}"`);
      } else if (parseMethod !== 'resolve' && parseMethod !== 'validate') {
        consoleMessage.info(JSON.stringify(jsonOutput, null, 2));
      }

      if (index === files.length - 1) {
        consoleMessage.info('Completed parse.');
      }

      return {
        content: jsonOutput,
        output: outputFilePath,
        source: updatedSourceFilePath
      };
    })
  ]);

module.exports = {
  ymlJsonParser
};
