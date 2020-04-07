import API from "../api";

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

export const getAuthMeActionCreator= () => (dispatch) => {
  API.auth.getAuthMe()
    .then(data => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true))
      }
    });
};

export const LoginActionCreator= (email, password, rememberMe) => (dispatch) => {
  API.auth.Login(email, password, rememberMe)
    .then(response => response.data)
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(getAuthMeActionCreator)
      }
    });
};

export const LogoutActionCreator= () => (dispatch) => {
  API.auth.Logout()
    .then(response => response.data)
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
    });
};