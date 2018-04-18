const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: create a new Schema that has the following attributes
//  author, type is Schema.ObjectId, it is required, and it refers to 'User' (look up refs)
//  content, type is String, it is required
//  favorites: is an array of objects. each  object has type Schema.ObjectId and refs 'User'
// also  keep track of the created_at timestamp via http://mongoosejs.com/docs/guide.html#timestamps
//  (we do that last part for you...but just ref it for future use)

const eventSchema = new Schema({
  // STUB
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  category: {
    type: Schema.ObjectId,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  likes: [{
    type: Schema.ObjectId,
    ref: 'User',
  }],
  // ENDSTUB
}, {
  timestamps: { createdAt: 'created_at' },
});

eventSchema.methods.getEventInfo = function (currentUserId) {

  /*  for a given event return the following object.
   *  Need currentUserId for figuring out whether given user has liked event
        {
            authorName: ...,
            authorId: ...,
            authorPic: ...,
            content: ...,
            eventId: ...,
            numFavorites: ...,
            isFavorited: ...
        },
      To populate the model with author data, you can query the User model via this.model('User')...

      Return a promise!!!!
  */

  // STUB
  return this.model('User').findOne({ _id: this.author })
    .then((res) => {
      let author = res;
      let obj = {
        authorName: author.username,
        authorId: author._id,
        category: this.category,
        date: this.date,
        location: this.location,
        description: this.description,
        eventId: this._id,
        numLikes: this.likes.length,
        isLiked: (this.likes.indexOf(currentUserId) > -1) ? true : false,
      };
      return obj;
    });
  // ENDSTUB
};

eventSchema.statics.getEventsForUser = function (userId) {

  /* returns event objects made by a user with id = userId
    * Return a promise!
    * */
  // STUB
  return this.find({ author: userId });
  // ENDSTUB
};

eventSchema.statics.getNewsfeedEvents = function (userId) {
  // Find one user with _id matching userId. If there is, iterate through
  // the following array for the user and find all events made by that individual
  // at the end, return a single array of event objects (all same level ie must be
  // [t1, t2, t3 ... tn] but not [[t1], [t2,  t3] ... ].
  // Return a Promise!
  // STUB
  return this.model('User').findOne({ _id: userId })
    .then((user) => {
      let posts = user.following.map(category => this.find({
        category: category
      }));
      return Promise.all(posts);
    })
    .then((posts) => {
      let flattened = [].concat.apply([], posts);
      return flattened;
    });
  // ENDSTUB
};

eventSchema.statics.createEvent = function (currentUserId, date, category, location, desc) {
  // given the current  user id and some content of a new event, create a new event object and
  // save  it. Then once it saves, return the  result of the event.getEventInfo(currentUserId).
  // General format of the method  should be
  // let newEvent = instantiate method
  // return newEvent.save().then((savedEvent) => { return the Event info })
  //  Return a Promise
  // STUB
  let newEvent = new this({
    author: currentUserId,
    category: category,
    date: date,
    location: location,
    description: desc,
    likes: [],
  });
  return newEvent.save()
    .then(saved => saved.getEventInfo(currentUserId));
  // ENDSTUB
};

eventSchema.statics.likeEvent = function (currentUserId, eventId) {
  // given a current user and a  event id, appropriately add/remove favorites on a given event.
  // On completion of the  save return the event info (via getEventInfo), passing in the currentuser id
  // Return a Promise!
  // STUB
  return this.findOne({ _id: eventId })
    .then((event) => {
      if (event.likes.indexOf(currentUserId) > -1) {
        event.likes.remove(currentUserId);
      } else {
        event.likes.push(currentUserId);
      }
      return event.save();
    })
    .then(saved => saved.getEventInfo(currentUserId));
  // ENDSTUB
};

module.exports = mongoose.model('Event', eventSchema);
