import API from "../api/index";
import {FormAction, stopSubmit} from 'redux-form';
import { photosType, postDataType, profileType } from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

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

export default function profileReducer(state = stateInit, action: ActionsType):stateInitType {
  switch (action.type) {
    case 'PROFILE_ADD_POST':
      let newPost = {
        id: Math.random(),
        message: action.newPostText,
        likeCounter:0
      };
      return {
        ...state,
        postData: [...state.postData, newPost],

      };
    case 'PROFILE_SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile
      };
    case 'PROFILE_SET_USER_STATUS':
      return {
        ...state,
        status: action.status
      };
    case 'PROFILE_SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: {...state.profile, photos:action.photos} as profileType
      };
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'PROFILE_ADD_POST', newPostText } as const),
  setUserProfile: (profile: profileType) => ({ type: 'PROFILE_SET_USER_PROFILE', profile } as const),
  setUserStatus: (status: string) => ({ type: 'PROFILE_SET_USER_STATUS', status } as const),
  savePhotoSuccess: (photos: photosType) => ({ type: 'PROFILE_SAVE_PHOTO_SUCCESS', photos } as const)
}
type ActionsType = InferActionsTypes<typeof actions>;
type TThunk = BaseThunkType<ActionsType | FormAction>

export const getProfileByIdActionCreator = (userId: number):TThunk => async (dispatch) => {
  dispatch({ type: 'PROFILE_GET_PROFILE_BY_ID_REQUEST' });
  const data = await API.profile.getProfileById(userId);
  dispatch({ type: 'PROFILE_GET_PROFILE_BY_ID_SUCCESS' });
  dispatch(actions.setUserProfile(data));
  dispatch({ type: 'PROFILE_SET_USER_PROFILE_REQUEST' });
};

export const getStatusByIdActionCreator = (userId: number):TThunk => async (dispatch) => {
  dispatch({ type: 'PROFILE_GET_STATUS_BY_ID_REQUEST' });
  const data = await API.profile.getStatus(userId);
  dispatch({ type: 'PROFILE_GET_STATUS_BY_ID_SUCCESS' });
  dispatch(actions.setUserStatus(data));
  dispatch({ type: 'PROFILE_SET_USER_PROFILE_REQUEST' });
};

export const updateStatusActionCreator = (status: string):TThunk => async (dispatch) => {
  dispatch({ type: 'PROFILE_UPDATE_STATUS_REQUEST' });
  const data = await API.profile.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch({ type: 'PROFILE_UPDATE_STATUS_SUCCESS' });
    dispatch(actions.setUserStatus(status));
    dispatch({ type: 'PROFILE_SET_USER_PROFILE_REQUEST' });
  }
};

export const savePhotoAC = (file: File):TThunk => async (dispatch) => {
  dispatch({ type: 'PROFILE_SAVE_PHOTO_REQUEST' });
  const data = await API.profile.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch({ type: 'PROFILE_SAVE_PHOTO_SUCCESS' });
  dispatch(actions.savePhotoSuccess(data.data.photos))}
};

export const saveProfileAC = (profile: profileType):TThunk => async (dispatch, getState) => {
  dispatch({ type: 'PROFILE_SAVE_PROFILE_CHANGE_REQUEST' });
  const userId = getState().auth.userId;
  const data = await API.profile.saveProfile(profile);

  if (data.resultCode === 0) {
    dispatch({ type: 'PROFILE_SAVE_PROFILE_CHANGE_SUCCESS' });
    if (userId != null) {
      dispatch(getProfileByIdActionCreator(userId))
    } else {
      throw new Error(`UserId can't be null`)
    }

  } else {
    dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};



