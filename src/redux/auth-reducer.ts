import API from "../api/index";
import { stopSubmit } from 'redux-form';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL_SUCCESS = 'SET_CAPTCHA_URL_SUCCESS';

const initState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

export type initStateType = typeof initState;

export default function authReducer(state = initState, action: any): initStateType {
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

type setAuthUserDataPayloadType = {
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}

type setAuthUserDataType = {
  type: typeof SET_USER_DATA,
  payload: setAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number | null,
                                email: string | null,
                                login: string | null,
                                isAuth: boolean): setAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl: string }
}

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({
  type: SET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});

export const getAuthMeActionCreator = () => async (dispatch: any) => {
  const response = await API.auth.getAuthMe();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true))
  }
};

export const LoginActionCreator= (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
  const response = await API.auth.Login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthMeActionCreator())
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
    dispatch(stopSubmit("signin", {_error: message}));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  try {
    const response = await API.auth.getCaptcha();
    dispatch(setCaptchaUrl(response.data.url));
  } catch (error) {
  }
};


export const LogoutActionCreator= () => async (dispatch: any) => {
  const response = await API.auth.Logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
};