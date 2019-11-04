import * as actionTypes from "./actionTypes"
import instance from "./instance";

export const fetchEvents = () => async dispatch => {
  try {
    const res = await instance.get("events/");
    const events = res.data;
    dispatch({ type: actionTypes.FETCH_EVENTS, payload: events });
  } catch (error) {
    console.error(error);
  }
};

export const resetEvents = () => {
  return {
    type: actionTypes.RESET_EVENTS
  };
};

export const fetchEventDetail = eventID => async dispatch => {
    try {
      const res = await instance.get(`events/${eventID}/`);
      const event = res.data;
      dispatch({ type: actionTypes.FETCH_EVENT_DETAIL, payload: event });
    } catch (error) {
      console.error(error);
    }
  };

  export const createEvent = (event,history) => async dispatch => {
    try {
      const res = await instance.post("events/create/", event);
      dispatch({ type: actionTypes.CREATE_EVENT, payload: res.data });
      console.log(res.data)
      history.replace(`events/${res.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  export const addPhotos = (photos, eventID) => async dispatch => {
    try {
      const res = await instance.post(`events/${eventID}/photos`, photos);
      dispatch({ type: actionTypes.ADD_PHOTOS, payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  export const uploadPics = pictures => async dispatch => {
    try {
      const res = await instance.post("uploads/", pictures);
      dispatch({ type: actionTypes.ADD_PICS, payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };