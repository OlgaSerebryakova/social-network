import API from "../api/index";
import { stopSubmit } from 'redux-form';
import { photosType, postDataType, profileType } from "../types/types";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



const stateInit = {
    postData: [
      {id: 1, message: 'Hello', likeCounter: 10},
      {id: 2, message: 'Hi', likeCounter: 15},
      {id: 3, message: 'Hello', likeCounter: 10},
      {id: 4, message: 'Hi', likeCounter: 15},
    ] as Array<postDataType>,
    profile: null as profileType | null,
    status: ''
};

export type stateInitType = typeof stateInit;

export default function profileReducer(state = stateInit, action: any):stateInitType {
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
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {...state.profile, photos:action.photos} as profileType
      };
    default:
      return state;
  }
};

type addPostActionCreatorType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({ type: ADD_POST, newPostText });
type setUserProfileType = {
  type: typeof SET_USER_PROFILE,
  profile: profileType
};
export const setUserProfile = (profile: profileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile });
type setUserStatusType = {
  type: typeof SET_USER_STATUS,
  status: string
}
export const setUserStatus= (status: string): setUserStatusType => ({ type: SET_USER_STATUS, status });
type savePhotoSuccess = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: photosType
}
export const savePhotoSuccess= (photos: photosType): savePhotoSuccess => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getProfileByIdActionCreator = (userId: number) => async (dispatch: any) => {
  dispatch({ type: 'PROFILE_GET_PROFILE_BY_ID_REQUEST' });
  const response = await API.profile.getProfileById(userId);
  dispatch({ type: 'PROFILE_GET_PROFILE_BY_ID_SUCCESS' });
  dispatch(setUserProfile(response.data));
  dispatch({ type: 'PROFILE_SET_USER_PROFILE_REQUEST' });
};

export const getStatusByIdActionCreator = (userId: number) => async (dispatch: any) => {
  dispatch({ type: 'PROFILE_GET_STATUS_BY_ID_REQUEST' });
  const response = await API.profile.getStatus(userId);
  dispatch({ type: 'PROFILE_GET_STATUS_BY_ID_SUCCESS' });
  dispatch(setUserStatus(response.data));
  dispatch({ type: 'PROFILE_SET_USER_PROFILE_REQUEST' });
};

export const updateStatusActionCreator = (status: string) => async (dispatch: any) => {
  dispatch({ type: 'PROFILE_UPDATE_STATUS_REQUEST' });
  const response = await API.profile.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch({ type: 'PROFILE_UPDATE_STATUS_SUCCESS' });
    dispatch(setUserStatus(status));
    dispatch({ type: 'PROFILE_SET_USER_PROFILE_REQUEST' });
  }
};

export const savePhotoAC = (file: any) => async (dispatch: any) => {
  dispatch({ type: 'PROFILE_SAVE_PHOTO_REQUEST' });
  const response = await API.profile.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch({ type: 'PROFILE_SAVE_PHOTO_SUCCESS' });
  dispatch(savePhotoSuccess(response.data.data.photos))}
};

export const saveProfileAC = (profile: profileType) => async (dispatch: any, getState: any) => {
  dispatch({ type: 'PROFILE_SAVE_PROFILE_CHANGE_REQUEST' });
  const userId = getState().auth.userId;
  const response = await API.profile.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch({ type: 'PROFILE_SAVE_PROFILE_CHANGE_SUCCESS' });
    dispatch(getProfileByIdActionCreator(userId))
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};



