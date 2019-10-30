import * as actionTypes from "../actions/actionTypes";

const initialState = {
  events: [],
  event:[],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS:
      const events = action.payload;
      return {
        ...state,
        events: events,
        loading: false
      };
      case actionTypes.FETCH_EVENT_DETAIL:
        const event = action.payload;
        return {
          ...state,
          event: event,
          loading: false
        };
      case actionTypes.RESET_EVENTS:
        return {
          ...state,
          events: [],
          loading: false
        };
    default:
      return state;
  }
};

export default reducer;