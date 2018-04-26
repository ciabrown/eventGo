const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Event = require('../models/event');
const User = require('../models/user');


module.exports = function (app) {
  // TODO: check to see if user is authenticated
  // STUB
  router.use(isAuthenticated(app));
  // ENDSTUB

  router.get('/newsfeed', function (req, res) {
    // TODO: This route gives back all the tweets in the newsfeed for a given user.
    // 1. somehow get access to the current user's _id (HINT: Refer to middlewares/isAuthenticated
    // 2. Call the getNewsfeedTweets static method in Tweet with this current user _id.
    // 3. Once you get the tweets from this method, sort them by their created_at dates
    //    Use the following to get a comparable date (given a `tweet` instance):
    //      tweet.created_at ? new Date(tweet.created_at) : new Date(0)
    // 4. For each of  the sorted tweets, get the tweet info via `getTweetInfo` (also passing
    //    in the current user _id). HINT: To wait for all the getTweetInfo calls to finish
    //    consider using Promise.all
    // 5. Once you get all the tweets, just send back json in the format
    //    { res: 'success', data: allTheFormattedTweets }
    // 6. If there is an error just send back json in the format
    //    { res: 'failure', data: errorinstancehere }

    Event.getNewsfeedEvents(req.user._id)
      .then((events) => {
        events = events.sort((a, b) => {
          a = a.created_at ? new Date(a.created_at) : new Date(0);
          b = b.created_at ? new Date(b.created_at) : new Date(0);
          return b - a;
        });
        let pEvents = events.map(e => e.getEventInfo(req.user._id));
        return Promise.all(pEvents);
      })
      .then((events) => {
        res.json({res: 'success', data: events});
      })
      .catch((err) => {
        res.json({res: 'failure', data: err});
      })
  });

  return router;
};
