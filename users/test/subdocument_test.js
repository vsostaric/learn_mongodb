const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {

  it('can create subdocument', (done) => {
    const joe = new User(
      {
        name: 'Joe',
        posts: [{title: 'Best Beer'}]
    });
    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.posts[0].title === 'Best Beer');
      done();
    });
  });

  it('can add subdocument to existing file', (done) => {

    const joe = new User(
      {
        name: 'Joe',
        posts: []
    });
    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      user.posts.push({title: 'Healthy snack'});
      return user.save();
    })
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.posts[0].title === 'Healthy snack');
      done();
    });
  });

  it('can remove a subdocument from an existing file', (done) => {

    const joe = new User(
      {
        name: 'Joe',
        posts: []
    });

    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      user.posts.push({title: 'Healthy snack'});
      return user.save();
    })
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.posts.length === 1);
      return user;
    })
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      const post = user.posts[0];
      post.remove();
      return user.save();
    })
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    });
  });

});
