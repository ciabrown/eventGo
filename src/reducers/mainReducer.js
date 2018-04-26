import { combineReducers } from 'redux';
// TODO: determine appropriate imports
import authReducer from './authReducer';
import eventListReducer from './eventListReducer';
import eventReducer from './eventReducer';
import profileReducer from './profileReducer';

// TODO: you should somehow * combine reducers * hint hint
// so that the reducer looks like
// {
//  authReducer: { isAuthenticated: ...  }
//  tweetList:  { ids: [...] } 
//  tweet: { id1: {...}, id2: {...} ... }
//  profileReducer: { profile: { name: '', species: '' ... }}
//  messageReducer: { messages: [ { messageType: ..., message: ...}, ...] }
//  discoverReducer: { discovers: [...] }
// }
// store this reducer in a variable 'tweetApp'
const eventApp = combineReducers({
    authReducer: authReducer,
    eventList: eventListReducer,
    event: eventReducer,
    profileReducer: profileReducer
});

export default eventApp;
