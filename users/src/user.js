const mongoose = require('mongoose');
const PostSchema = require('./post')

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

userSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;
