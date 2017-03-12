const assert = require('assert');
const User = require('../src/user')

describe('Updating a user', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save().then(() => {
      done();
    })
  });

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Joey');
      done();
    });
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Joey');
    assertName(joe.save(), done);
  });

  it('A model instance can be updated', (done) => {
      assertName(joe.update({name: 'Joey'}), done);
  });

  it('A model class can update', (done) => {
      assertName(User.update({name: 'Joe'}, {name: 'Joey'}), done);
  });

  it('A model class can update one record', (done) => {
      assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Joey'}), done);
  });

  it('A model class can find a record with id and update', (done) => {
      assertName(User.findByIdAndUpdate(joe, {name: 'Joey'}), done);
  });

})
