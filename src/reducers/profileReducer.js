// providing this for  you bc im nice  :)
import {
  GETPROFILE_FUL,
} from '../actions/profileActions';

let initialState = {
  profile: {
    name: '',
    following: [],
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case GETPROFILE_FUL:
    return {
      ...state,
      profile: action.profile,
    };
  default:
    return state;
  }
};

export default profileReducer;
