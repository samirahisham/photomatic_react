import * as actionTypes from "./actionTypes";
import instance from "./instance";

export const fetchEvents = () => async (dispatch) => {
  try {
    const res = await instance.get("events/");
    const events = res.data;
    dispatch({ type: actionTypes.GET_EVENTS, payload: events });
  } catch (error) {
    console.error(error);
  }
};

export const resetEvents = () => {
  return {
    type: actionTypes.GET_EVENTS,
    payload: []
  };
};

export const fetchEventDetail = (eventID) => async (dispatch) => {
  dispatch({ type: actionTypes.EVENT_LOADING });
  try {
    const res = await instance.get(`events/${eventID}/`);
    const event = res.data;
    dispatch({ type: actionTypes.GET_EVENT_DETAIL, payload: event });
  } catch (error) {
    console.error(error);
  }
};

export const createEvent = (event, history) => async (dispatch) => {
  try {
    const res = await instance.post("events/create/", event);
    dispatch({ type: actionTypes.CREATE_EVENT, payload: res.data });

    history.replace(`events/${res.data.id}`);
  } catch (error) {
    console.error(error);
  }
};

export const sendEmails = (content) => async (dispatch) => {
  try {
    const res = await instance.post(`events/${content.id}/share/`, content);
    dispatch({ type: actionTypes.SEND_EMAILS, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const uploadPics = (newphotos) => async (dispatch) => {
  dispatch(fetchEventDetail(newphotos.id))
  dispatch({ type: actionTypes.UPLOAD_LOADING})
  try {
    const res = await instance.post(`uploads/`, newphotos);
    const newevent = res.data
    console.log(newevent);
    dispatch({ type: actionTypes.ADD_PICS, payload: newevent });
  } catch (error) {
    console.error(error);
  }
};
