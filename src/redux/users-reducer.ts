import API from "../api/index";
import { updateObjectInArray } from "../utils/object-helper";
import { userType, photosType } from './../types/types';
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROC = 'TOGGLE_FOLLOWING_PROC';



const initState = {
  users: [] as Array<userType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProc: [] as Array<number> //array of userId
};

type initStateType = typeof initState;


export default function usersReducer(state = initState, action: TAction): initStateType {

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

type TAction = followSuccessType | unfollowSuccessType | setUsersType | setCurrentPageType |
  setUsersCountType | toggleIsFetchingType | togglefollowingProcType;

type followSuccessType = { type: typeof FOLLOW, userId : number }
export const followSuccess = (userId: number): followSuccessType => ({ type: FOLLOW, userId });
type unfollowSuccessType = { type: typeof UNFOLLOW, userId: number };
export const unfollowSuccess = (userId: number):unfollowSuccessType => ({ type: UNFOLLOW, userId });
type setUsersType = { type: typeof SET_USERS, users: Array<userType> };
export const setUsers = (users: Array<userType>): setUsersType => ({ type: SET_USERS, users });
type setCurrentPageType = { type: typeof SET_CURRENT_PAGE, currentPage: number };
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
type setUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT, count: number };
export const setUsersCount = (totalUsersCount: number): setUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
type toggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean };
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching });
type togglefollowingProcType = { type: typeof TOGGLE_FOLLOWING_PROC, isFetching: boolean, userId: number };
export const togglefollowingProc = (isFetching: boolean, userId: number): togglefollowingProcType =>
  ({ type: TOGGLE_FOLLOWING_PROC, isFetching, userId });

type TDispatch = Dispatch<TAction>
type TThunk = ThunkAction<Promise<void>, AppStateType, unknown, TAction>

export const getUsers= (currentPage: number, pageSize: number): TThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));

    const response = await API.users.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setUsersCount(response.data.totalCount));
  }
};

export const followUnfolowFlow = async (dispatch: TDispatch,
                                        userId: number, apiMethod: any,
                                        actionCreator: (userId: number) => followSuccessType | unfollowSuccessType) => {
  dispatch(togglefollowingProc(true, userId));
  const response = await apiMethod(userId);
  if (response.data.resultCode ===0 ) {
    dispatch(actionCreator(userId))
  }
  dispatch(togglefollowingProc(false, userId))
};

export const follow = (userId: number): TThunk => async (dispatch) => {
  followUnfolowFlow(dispatch, userId, API.follow.postFollow.bind(API.follow), followSuccess);
};

export const unfollow = (userId: number):TThunk => async (dispatch) => {
  followUnfolowFlow(dispatch, userId, API.follow.deleteUnfolow.bind(API.follow), unfollowSuccess);
};
