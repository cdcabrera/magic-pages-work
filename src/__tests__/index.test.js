const { magicPagesWork } = require('../index');

describe('Magic Pages Work', () => {
  it('should return pass-through values', () => {
    expect(magicPagesWork({ version: 'lorem-ipsum' })).toMatchSnapshot('Magic Pages Work');
  });
});
