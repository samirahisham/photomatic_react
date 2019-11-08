import * as actionTypes from "./actionTypes";
import jwt_decode from "jwt-decode";
import { setErrors, resetErrors } from "./errors";
import instance from "./instance";
import { fetchEvents, resetEvents } from "./events";

const setCurrentUser = (token) => {
  return async (dispatch) => {
    let user;
    if (token) {
      localStorage.setItem("token", token);
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch(getProfile());
      dispatch(fetchEvents());
      user = jwt_decode(token);
    } else {
      localStorage.removeItem("token");
      delete instance.defaults.headers.common.Authorization;
      user = null;
    }

    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
  };
};

export const login = (userData, history) => {
  return async (dispatch) => {
    try {
      const response = await instance.post("login/", userData);
      const user = response.data;
      await dispatch(setCurrentUser(user.access));
      dispatch(fetchEvents());
      dispatch(resetErrors());
      history.replace("/events");
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const signup = (userData, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("signup/", userData);
      const user = res.data;

      dispatch(setCurrentUser(user.access));
      dispatch(login(userData, history));
      history.replace("/new");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        dispatch(setErrors(error.response.data));
      } else {
        console.error(error);
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(resetEvents());
    dispatch(setCurrentUser());
  };
};

export const checkForExpiredToken = () => {
  // Check for token expiration
  const token = localStorage.getItem("token");

  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;

    // Decode token and get user info
    user = jwt_decode(token);

    // Check token expiration
    if (user.exp >= currentTimeInSeconds) {
      // Set user
      return setCurrentUser(token);
    }
  }
  return logout();
};

export const getProfile = () => async (dispatch) => {
  try {
    const res = await instance.get("profile/");
    const profile = res.data;

    dispatch({ type: actionTypes.GET_PROFILE, payload: profile });
  } catch (error) {
    console.error(error);
  }
};

export const updateProfileImg = (img) => async (dispatch) => {
  try {
    const res = await instance.put("profile/", img);
    dispatch({ type: actionTypes.CHANGE_PHOTO, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
