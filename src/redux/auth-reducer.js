import API from "../api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

const initState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

export const getAuthMeActionCreator= () => async (dispatch) => {
  const response = await API.auth.getAuthMe();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true))
  }
};

export const LoginActionCreator= (email, password, rememberMe) => async (dispatch) => {
  const response = await API.auth.Login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    dispatch(getAuthMeActionCreator())
  } else {
    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
    dispatch(stopSubmit("login", {_error: message}));
  }
};


export const LogoutActionCreator= () => async (dispatch) => {
  const response = await API.auth.Logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
};