const assert = require('assert');
const User = require('../src/user');

describe('Reading users', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'Joe'
    });

    joe.save().then(() => {
      done();
    });
  });

  it('Find all users with the name Joe', (done) => {

    User.find({
      name: 'Joe'
    }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });

  });

  it('Find a user with particular id', (done) => {

    User.findOne(joe).then((user) => {
      assert(user._id.toString() === joe._id.toString());
      done();
    });

  });

});
