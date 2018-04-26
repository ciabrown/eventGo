import authenticatedRequest from '../utils/authenticatedRequest';

export const GETPROFILE_FUL = 'GETPROFILE_FUL';
export const GETPROFILE_REJ = 'GETPROFILE_REJ';

export function getUser(id) {
  // DONE: async action creator again
  // make an authenticated request to the route  that allows us to get profile
  // information. (you can ref your express files for this to see what type  of
  // request it is and the url pattern (note that you need to handle the case where
  // id is empty/undefined and adjust the url accordingly
  // When the request is successful, dispatch a GETPROFILE_FUL action with additional
  // property `profile` containing  the result of the request relevant (ref your express
  // method for what is returned)
  // if there's  an error, dispatch a GETPROFILE_REJ action with an addition property `error`
  // equal to the error
  let url;
  if (id) {
    url = '/api/profile/' + id + '/info';
  } else {
    url = '/api/profile/info';
  }
  return (dispatch) => {
    authenticatedRequest('GET', url)
      .then(res => res.json())
      .then((resp) => {
        dispatch({
          type: GETPROFILE_FUL,
          profile: resp.data
        });
      })
      .catch((error) => {
        dispatch({
          type: GETPROFILE_REJ,
          error: error,
        });
      });
  };
}

