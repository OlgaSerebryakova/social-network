import API from "../api";

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
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u
        })
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

export const getUsers= (currentPage, pageSize) => (dispatch) => {
  dispatch(toggleIsFetching(true));

  API.users.getUsers(currentPage, pageSize)
    .then(data => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setUsersCount(data.totalCount));
    });
};

export const follow= (userId) => (dispatch) => {
  dispatch(togglefollowingProc(true, userId));
  API.follow.postFollow(userId)
    .then(data => {
      if (data.resultCode ===0 ) {
        dispatch(followSuccess(userId))
      }
      dispatch(togglefollowingProc(false, userId))
    });
};

export const unfollow= (userId) => (dispatch) => {
  dispatch(togglefollowingProc(true, userId));
  API.follow.deleteUnfolow(userId)
    .then(data => {
      if (data.resultCode ===0 ) {
        dispatch(unfollowSuccess(userId))
      }
      dispatch(togglefollowingProc(false, userId))
    });
};

