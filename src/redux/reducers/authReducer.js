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
      const newprofile = action.payload;
      return {
        ...state,
        profile: newprofile
      };
    case actionTypes.UPDATE_PROFILE:
      const image = action.payload;
      return {
        ...state,
        profile: { ...state.profile, image: image.image }
      };
    default:
      return state;
  }
};

export default reducer;
