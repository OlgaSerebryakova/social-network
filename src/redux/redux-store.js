import { combineReducers , createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import profileReducer from "./profile_reducer";
import messageReducer from './message-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';

const createReducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messageReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer
});

const logger = createLogger({
  collapsed: true
});

const store = createStore(createReducers, applyMiddleware(logger));

export default store;