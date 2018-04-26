import {
  LOADEVENTS_FUL,
  CREATEEVENT_FUL,
} from '../actions/eventActions';

// TODO: createa  reducer called tweetReducer that has an initalState {}
// if the LOADTWEETS_FUL action occurs, make sure that your eventual
// state would look like
// {
//  whateverTheTweetId: { fullTweetObj },
//  whateverTheTweetId2: { fullTweetobj2 }
//  ...
// }
// basically i should be able to do state[someTweetId] and get the
// full tweet object containing that tweet
// on the CREATETWEET_FULa nd FAVORITE_FUL actions, just  set the
// tweet in the state equal to the data you get from the action
var eventReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADEVENTS_FUL: {
      let allEvents = {};
      action.events.map((i, idx) => {
        allEvents[i.eventId] = i;
      });
      return Object.assign({}, state, allEvents);
      break;
    }
    case CREATEEVENT_FUL: {
      let event = {... state};
      event[action.data.eventId] = action.data;
      return Object.assign({}, state, event);
      break;
    }

    default: {
      return state;
      break;
    }
  }
}

export default eventReducer;