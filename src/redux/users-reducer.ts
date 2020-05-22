import API from "../api/index";
import { updateObjectInArray } from "../utils/object-helper";
import { userType, photosType } from './../types/types';
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";

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
    case 'USERS_FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
      };
    case 'USERS_UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
      };
    case 'USERS_SET_USERS':
      return{
        ...state,
        users: action.users
      };
    case 'USERS_SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      };
    case 'USERS_SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.count
      };
    case 'USERS_TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching
      };
    case 'USERS_TOGGLE_FOLLOWING_PROC':
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

type TAction = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userId: number) => ({ type: 'USERS_FOLLOW', userId } as const),
  unfollowSuccess: (userId: number) => ({ type: 'USERS_UNFOLLOW', userId } as const),
  setUsers: (users: Array<userType>) => ({ type: 'USERS_SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'USERS_SET_CURRENT_PAGE', currentPage } as const),
  setUsersCount: (totalUsersCount: number) => ({ type: 'USERS_SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'USERS_TOGGLE_IS_FETCHING', isFetching } as const),
  togglefollowingProc: (isFetching: boolean, userId: number) => ({ type: 'USERS_TOGGLE_FOLLOWING_PROC', isFetching, userId } as const)
}

type TDispatch = Dispatch<TAction>
type TThunk = BaseThunkType<TAction>

export const getUsers= (currentPage: number, pageSize: number): TThunk => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));

    const response = await API.users.getUsers(currentPage, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(response.data.items));
    dispatch(actions.setUsersCount(response.data.totalCount));
  }
};

export const followUnfolowFlow = async (dispatch: TDispatch,
                                        userId: number, apiMethod: any,
                                        actionCreator: (userId: number) => TAction) => {
  dispatch(actions.togglefollowingProc(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode ===0 ) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.togglefollowingProc(false, userId))
};

export const follow = (userId: number): TThunk => async (dispatch) => {
  followUnfolowFlow(dispatch, userId, API.follow.postFollow.bind(API.follow), actions.followSuccess);
};

export const unfollow = (userId: number):TThunk => async (dispatch) => {
  followUnfolowFlow(dispatch, userId, API.follow.deleteUnfolow.bind(API.follow), actions.unfollowSuccess);
};
