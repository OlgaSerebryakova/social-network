import API from "../api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL_SUCCESS = 'SET_CAPTCHA_URL_SUCCESS';

const initState = {
  userId: '',
  email: '',
  login: '',
  isAuth: false,
  captchaUrl: null
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL_SUCCESS:
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

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});

export const getAuthMeActionCreator= () => async (dispatch) => {
  dispatch({ type: 'AUTH_USER_GET_ME_REQUEST'});
  const response = await API.auth.getAuthMe();
  dispatch({ type: 'AUTH_USER_GET_ME_SUCCESS'});
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true))
  }
};

export const LoginActionCreator= (email, password, rememberMe, captcha) => async (dispatch) => {
  dispatch({ type: 'AUTH_USER_LOGIN_REQUEST'});
  const response = await API.auth.Login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch({ type: 'AUTH_USER_LOGIN_SUCCESS'});
    dispatch(getAuthMeActionCreator())
  } else {
    dispatch({ type: 'AUTH_USER_LOGIN_ERROR'});
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
    dispatch(stopSubmit("signin", {_error: message}));
  }
};

export const getCaptchaUrl= () => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_GET_CAPTCHA_URL_REQUEST'});
    const response = await API.auth.getCaptcha();
    dispatch(setCaptchaUrl(response.data.url));
  } catch (error) {
    dispatch({ type: 'AUTH_GET_CAPTCHA_URL_FAIL'});
  }
};


export const LogoutActionCreator= () => async (dispatch) => {
  dispatch({ type: 'AUTH_USER_LOGOUT_REQUEST'});
  const response = await API.auth.Logout();
  if (response.data.resultCode === 0) {
    dispatch({ type: 'AUTH_USER_LOGOUT_SUCCESS'});
    dispatch(setAuthUserData(null, null, null, false))
  }
};