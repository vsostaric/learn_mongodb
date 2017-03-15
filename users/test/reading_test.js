const assert = require('assert');
const User = require('../src/user');

describe('Reading users', () => {

  let joe, maria, alex, zach;

  beforeEach((done) => {

    alex = new User({name: 'Alex'});
    maria = new User({name: 'Maria'});
    zach = new User({name: 'Zach'});
    joe = new User({name: 'Joe'});

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
    .then(() => done());

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

  it('can skip and limit the result set', (done) => {

    User.find({})
    .sort({name: 1})
    .skip(1)
    .limit(2)
    .then((users) => {
      assert(users.length === 2);
      assert(users[0].name === 'Joe');
      assert(users[1].name === 'Maria');
      done();
    });

  });

});
