import * as actionTypes from "../actions/actionTypes";

const initialState = {
  events: [],
  event: null,
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
    case actionTypes.CREATE_EVENT:
      const new_event = action.payload;
      return {
        ...state,
        events: state.events.concat(new_event),
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
