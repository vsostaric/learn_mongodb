const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

  it('requires a user name', () => {
    const user = new User({name: undefined});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.')
  });

  it('name must be longer than 2 chars', () => {

    const userWithShortName = new User({name: 'Aa'});
    const validationResult_invalid = userWithShortName.validateSync();
    const { message } = validationResult_invalid.errors.name;
    assert(message === 'Name must be longer than 2 characters.');

  });

  it('name must be longer than 2 chars - valid', () => {

    const userWithLongName = new User({name: 'Dr. Acula'});
    const validationResult_valid = userWithLongName.validateSync();
    assert(validationResult_valid === undefined);

  });

  it('disallows invalid records to be saved', (done) => {

    const user = new User({name: 'Aa'});
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters.');
      done();
    });

  });

});
