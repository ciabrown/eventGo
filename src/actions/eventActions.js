import authenticatedRequest from '../utils/authenticatedRequest';

export const LOADEVENTS_REJ = 'LOADEVENTS_REJ';
export const LOADEVENTS_FUL = 'LOADEVENTS_FUL';

export const CREATEEVENT_FUL = 'CREATEEVENT_FUL';
export const CREATEEVENT_REJ = 'CREATEEVENT_REJ';


// this is  a helper method you can use to getevents from a given URL.
function getEvents(url) {
  return (dispatch) => {
    authenticatedRequest('GET', url)
      .then(res => res.json())
      .then((resp) => {
        //console.log(resp.data)
        dispatch({
          type: LOADEVENTS_FUL,
          events: resp.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOADEVENTS_REJ,
          error,
        });
      });
  };
}


export function loadEventsForProfile(userId) {
  // DONE will send  a request to /api/profile/userId/events if a userId is specified
  // else it will just send a request to /api/profile/events
  // then should *get the events*  (hint hint) from that url
  // async action creator
  return (dispatch) => {
      if (userId) {
      return dispatch(getEvents('/api/profile/' + userId + '/events'));
    } else {
      return dispatch(getEvents('/api/profile/events'));
    }
  }
}


export function loadEvents() {
  // DONE loads events from /api/newsfeed ie *get the events* from that url
  // async action creator
  return (dispatch) => {
    return dispatch(getEvents('/api/newsfeed'));
  }
}


export function createNewEvent(evDate, evCat, evLoc, evDesc) {
  // DONE: authenticated request # 2
  // we send a POST request that is authenticated to /api/event
  // if the request is successful we send  a CREATETEVENT_FUL action with message and some data
  // corresponding  to the new event (we get it from the response (determined by express))
  // if there is  an error, dispatch a CREATEEVENT_REJ error
  return (dispatch) => {
    authenticatedRequest('POST', 'api/event', {date: evDate, category: evCat, location: evLoc, desc: evDesc})
      .then(res => res.json())
      .then((resp) => {
        const data = resp.data;
        dispatch({
          type: CREATEEVENT_FUL,
          message: 'You have created a event',
          data,
        });
      }).catch((error) => {
        dispatch({
          type: CREATEEVENT_REJ,
          error,
        });
      });
  }
}
