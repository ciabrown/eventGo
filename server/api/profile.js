const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Event = require('../models/event');
const User = require('../models/user');

module.exports = function (app) {
  // TODO: check to see if user is authenticated
  // STUB
  router.use(isAuthenticated(app));
  // ENDSTUB

  router.get('/profile/:id?/info', function (req, res) {
    // TODO: This route will grab the information for a given profile. If no id is given,
    // look for the current user's profile. Use the getFormattedProfileById static method
    // in User. If there aren't any errors, return json in the format as follows:
    //  { res: 'success', data: profileInfoHere }
    // If there is an error, return json in the format as follows
    //  { res: 'failure', data: 'errorInstanceHere' }

    // STUB
    let user = req.params.id ? req.params.id : req.user._id;
    User.getFormattedProfileById(user, req.user._id)
      .then((profile) => {
        res.json({ res: 'success', data: profile });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
    // ENDSTUB
  });

  router.get('/profile/:id?/events', function (req, res) {
    // TODO: refer to newsfeed for instructions. It is using the same logic.
    // if no id is specified, assume it is the current user.

    let user = req.params.id ? req.params.id : req.user._id;
    Event.getEventsForUser(user)
      .then((events) => {
        events = events.sort((a, b) => {
          a = a.created_at ? new Date(a.created_at) : new Date(0);
          b = b.created_at ? new Date(b.created_at) : new Date(0);
          return b - a;
        });
        
        let pEvents = events.map( e => e.getEventInfo(req.user._id));
        return Promise.all(pEvents);
      })
      .then((events) => {
        console.log(events)
        res.json({res: 'success', data: events});
      })
      .catch((err) => {
        res.json({res: 'failure', data: err });
      });
  });

  router.post('/profile/:id/follow', function (req, res) {
    // TODO:  Call the User.follow method with the appropriate arguments.
    // will be of the form { res: 'success', data: 'following' or 'unfollowing' } */
    // STUB
    User.follow(req.user.id, req.params.id)
      .then((okay) => {
        res.json({ res: 'success', data: okay });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
    // ENDSTUB
  });

  return router;
};
