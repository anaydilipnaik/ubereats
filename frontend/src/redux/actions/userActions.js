import {
  USER_DETAILS,
  USER_DETAILS_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  ADD_TO_FAVOURITE,
  ADD_TO_FAVOURITE_ERROR,
  GET_USER_FAVOURITES,
  GET_USER_FAVOURITES_ERROR,
} from "../constants/ActionTypes";
import {
  getUserDetails,
  updateUser,
  addToFavourite,
  getUserFavourites,
} from "../../controllers/user";

export const getUserDetailsFunc =
  (userId, token, setUserDetails) => (dispatch) => {
    getUserDetails(userId, token)
      .then((res) => {
        if (res.data) {
          setUserDetails(res.data);
          dispatch({
            type: USER_DETAILS,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: USER_DETAILS_ERROR,
        });
      });
  };

export const updateUserFunc =
  (data, userId, token, setUserDetails) => (dispatch) => {
    updateUser(data, userId, token)
      .then((res) => {
        if (res.data) {
          setUserDetails(res.data);
          alert("Success");
          dispatch({
            type: UPDATE_USER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_USER_ERROR,
        });
      });
  };

export const addToFavouriteFunc = (data, token) => (dispatch) => {
  addToFavourite(data, token)
    .then((res) => {
      if (res.data) {
        alert("Added to favourites");
        dispatch({
          type: ADD_TO_FAVOURITE,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ADD_TO_FAVOURITE_ERROR,
      });
    });
};

export const getUserFavouritesFunc =
  (userId, token, setFavourites) => (dispatch) => {
    getUserFavourites(userId, token)
      .then((res) => {
        if (res.data) {
          setFavourites(res.data);
          dispatch({
            type: GET_USER_FAVOURITES,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_FAVOURITES_ERROR,
        });
      });
  };
