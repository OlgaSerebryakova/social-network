import API from "../api";
import {updateObjectInArray} from "../utils/object-helper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROC = 'TOGGLE_FOLLOWING_PROC';

const initState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProc: []
};

export default function usersReducer(state = initState, action) {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
      };
    case SET_USERS:
      return{
        ...state,
        users: action.users
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case TOGGLE_FOLLOWING_PROC:
      return {
        ...state,
        followingInProc: action.isFetching
          ? [...state.followingInProc, action.userId]
          : state.followingInProc.filter(id => id !== action.userId)
      };
    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const togglefollowingProc = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_PROC, isFetching, userId });

export const getUsers= (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));

  const response = await API.users.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(response.data.items));
  dispatch(setUsersCount(response.data.totalCount));
};

export const followUnfolowFlow= async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(togglefollowingProc(true, userId));
  const response = await apiMethod(userId);
  if (response.data.resultCode ===0 ) {
    dispatch(actionCreator(userId))
  }
  dispatch(togglefollowingProc(false, userId))
};

export const follow= (userId) => async (dispatch) => {
  followUnfolowFlow(dispatch, userId, API.follow.postFollow.bind(API.follow), followSuccess);
};

export const unfollow= (userId) => async (dispatch) => {
  followUnfolowFlow(dispatch, userId, API.follow.deleteUnfolow.bind(API.follow), unfollowSuccess);
};
