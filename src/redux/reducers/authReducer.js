import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  profile: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      const user = action.payload;
      return {
        ...state,
        user
      };
    case actionTypes.GET_PROFILE:
      const profile = action.payload;
      return {
        ...state,
        profile
      };
    default:
      return state;
  }
};

export default reducer;
