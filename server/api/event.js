const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Event = require('../models/event');

module.exports = function (app) {
  // TODO: Check to see if user is authenticated
  // STUB
  router.use(isAuthenticated(app));
  // ENDSTUB


  router.post('/event', function (req, res) {
    // This route will just call the createevent  static method in the
    // event model. Pass in  the current user id and the posted event contente
    // if it is successful send back json in the format
    // { res: 'success', data: eventThatWasMade }
    // else
    // { res: 'failure', data: error }
    Event.createEvent(req.user.id, req.body.date, req.body.category, req.body.location, req.body.desc)
      .then((event) => {
        res.json({ res: 'success', data: event });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
  });

  return router;
};
