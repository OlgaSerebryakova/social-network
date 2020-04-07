import API from "../api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

const stateInit = {
    postData: [
      {id: 1, message: 'Hello', likeCounter: 10},
      {id: 2, message: 'Hi', likeCounter: 15},
      {id: 3, message: 'Hello', likeCounter: 10},
      {id: 4, message: 'Hi', likeCounter: 15},
    ],
    profile: null,
    status: ''
};

export default function profileReducer(state = stateInit, action) {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: Math.random(),
        message: action.newPostText,
        likeCounter:0
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus= (status) => ({ type: SET_USER_STATUS, status });

export const getProfileByIdActionCreator = (userId) => (dispatch) => {
  API.profile.getProfileById(userId)
    .then(data => {
      dispatch(setUserProfile(data));
    })
};

export const getStatusByIdActionCreator = (userId) => (dispatch) => {
  API.profile.getStatus(userId)
    .then(response => response.data)
    .then(data => {
      dispatch(setUserStatus(data));
    })
};

export const updateStatusActionCreator = (status) => (dispatch) => {
  API.profile.updateStatus(status)
    .then(response => response.data)
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    })
};
