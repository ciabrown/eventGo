import {
  LOADEVENTS_FUL,
} from '../actions/eventActions';

// TODO: createa  reducer function named tweetListReducer with initial state
// { ids: [] }.
// When the LOADTWEETS_FUL action occurs, set ids equal to justt he tweetId
// for all the tweets from the action
// STUB
const eventListReducer = (state = {
  ids: [],
}, action) => {
  switch (action.type) {
  case LOADEVENTS_FUL: {
    //console.log(action.events)
    return {
      ids: action.events.map(t => t.eventId),
    };
  }
  default:
    return state;
  }
};
// ENDSTUB

export default eventListReducer;