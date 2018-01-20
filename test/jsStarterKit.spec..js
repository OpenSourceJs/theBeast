const expect = require('chai').expect;

('use strict');

describe('This is a test', () => {
  let a;

  beforeEach(() => {
    a = 'Welcome to default application';
  });

  it('it should equal to a string', () => {
    expect(a).to.be.a('string');
  });
});
