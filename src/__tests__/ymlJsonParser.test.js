const { ymlJsonParser } = require('../ymlJsonParser');

describe('ymlJsonParser', () => {
  it('should attempt to parse a Swagger spec file', async () => {
    // let output;

    const output = await ymlJsonParser({
      files: [
        {
          source: 'petStoreSwagger.yml'
        }
      ],
      parseMethod: 'bundle'
    });

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('output', Array.isArray(output));
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    expect(output).toMatchSnapshot('swagger');
  });
});
