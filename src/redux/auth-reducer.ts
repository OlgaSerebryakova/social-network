import API from "../api/index";
import {FormAction, stopSubmit} from 'redux-form';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";


const initState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

export type initStateType = typeof initState;
type TThunk = BaseThunkType<TAction | FormAction>
type TAction = InferActionsTypes<typeof actions>

export default function authReducer(state = initState, action: TAction): initStateType {
  switch (action.type) {
    case 'SET_USER_DATA':
    case 'SET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: { userId, email, login, isAuth }
  } as const),
  setCaptchaUrl: (captchaUrl: string) => ({
    type: 'SET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
  } as const)
}

export const getAuthMeActionCreator = ():TThunk => async (dispatch) => {
  const response = await API.auth.getAuthMe();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
};

export const LoginActionCreator= (email: string, password: string, rememberMe: boolean, captcha: any):TThunk => async (dispatch) => {
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

export const getCaptchaUrl = ():TThunk => async (dispatch) => {
  try {
    const data = await API.auth.getCaptcha();
    dispatch(actions.setCaptchaUrl(data.url));
  } catch (error) {
  }
};


export const LogoutActionCreator = ():TThunk => async (dispatch) => {
  const response = await API.auth.Logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
};