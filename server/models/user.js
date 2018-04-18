const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('../config');

// TODO: User schema should have the following.
// A `username` of type string  that is unique and required
// A `name` of type string
// a `password` of type string t hat is required
// a `species` that is type string (will be the bird species
// an `image` of type  string
// an array `following` containing objects of type Schema.ObjectId
// an array of `followers containing objects of  type Schema.ObjectId
let userSchema = new Schema({
  // STUB
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true },
  following: [{
    type: String
  }],
  // ENDSTUB
});


userSchema.statics.addUser = function (username, password, email, name) {
  // TODO: create a new user object with username, password, species, image, and name equal to  the
  // specified arguments. Once  this object is created, use bcrypt.hash to hash the
  // newUser.password  and set  the newUser's password equal to the hash. Finally call save
  // Must return  a  promise (ie your bcrypt hash call must look something like
  // bcrypt.hash(...).then(function( hash ) { ... return newUser.save() }
  // STUB
  let newUser = new this({
    username: username,
    password: password,
    email: email,
    name: name,
  });
  return bcrypt.hash(newUser.password, 1).then((hash) => {
    newUser.password = hash;
    return newUser.save();
  });
  // ENDSTUB
};

userSchema.statics.check = function (username, password) {
  // determines if a given password for a username is valid  or not.
  // find a user with the username equivalent to the username passed in.
  // if  there is no  user then throw a new  Error('No User') else  return the result
  // of bcrypt.compare for the password and the user's password
  // STUB
  return this.findOne({ username: username })
    .then((user) => {
      if (!user) {
        throw new Error('No User');
      } else {
        return bcrypt.compare(password, user.password);
      }
    });
  // ENDSTUB
};

userSchema.statics.getFormattedProfileById = function (id) {
  // given an id corresponding to the profile being viewed
  // return an object with the following structure
  //  {
  //    name:  ...,
  //    email: ...,
  //    following: ...,
  //  }
  //  If there is no user, throw a new  error 'No  such user with id'
  //  returns a promise
  //  STUB
  return this.findOne({ _id: id })
    .then((user) => {
      if (user) {
        return {
          name: user.name,
          email: user.email,
          following: user.following, 
        };
      } else {
        throw new Error('No such user with id');
      }
    });
  // ENDSTUB
};

userSchema.statics.follow = function (followerId, catName) {
  // given a followerId and a category name, either follow or unfollowing the category
  //  returns a promise
  //  STUB
  let followerUser;
  let type;

  return this.findOne({ _id: followerId })
    .then((follower) => {
      followerUser = follower;
      if (followerUser.following.indexOf(catName) > -1) {
        type = 'unfollowing';
        followerUser.following.remove(catName);
      } else {
        type = 'following';
        followerUser.following.push(catName);
      }
      return followerUser.save();
    })
    .then(res => this.getFormattedProfileById(followerId));
  // ENDSTUB
};

module.exports = mongoose.model('User', userSchema);
