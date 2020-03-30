const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const stateInit = {
    postData: [
      {id: 1, message: 'Hello', likeCounter: 10},
      {id: 2, message: 'Hi', likeCounter: 15},
      {id: 3, message: 'Hello', likeCounter: 10},
      {id: 4, message: 'Hi', likeCounter: 15},
    ],
    newPostText: 'text',
    profile: null
};

export default function profileReducer(state = stateInit, action) {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: Math.random(),
        message: state.newPostText,
        likeCounter:0
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: ''
      };
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText
      };
    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const onPostChangeActionCreator = (text) => {
  return ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  })
};