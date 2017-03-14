const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {

  it('postCount returns number of posts', (done) => {

    const joe = new User({
      name: 'Joe',
      posts: [{title: 'Joel'}, {title: 'Elie'}]
    });

    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.postCount === 2);
      done();
    });
  });

});
