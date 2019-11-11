import * as actionTypes from "../actions/actionTypes";

const initialState = {
  events: [],
  event: null,
  loading: true,
  eventLoading: true,
  uploadloading:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS:
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
    case actionTypes.GET_EVENT_DETAIL:
      const event = action.payload;
      return {
        ...state,
        event: event,
        eventLoading: false
      };
    case actionTypes.RESET_EVENTS:
      return {
        ...state,
        events: [],
        loading: false
      };
    case actionTypes.EVENT_LOADING:
      return {
        ...state,
        eventLoading: true
      };
    case actionTypes.ADD_PICS:
      const newevent = action.payload;
      return {
        ...state,
        event: newevent,
        uploadloading:false
      };
    case actionTypes.UPLOAD_LOADING:
      
        return {
          ...state,
          uploadloading: true
        };
    default:
      return state;
  }
};

export default reducer;
