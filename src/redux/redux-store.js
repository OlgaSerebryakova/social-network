import { combineReducers , createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import profileReducer from "./profile_reducer";
import messageReducer from './message-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import { reducer as formReducer} from 'redux-form';

const createReducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messageReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer
});

const logger = createLogger({
  collapsed: true
});

const store = createStore(createReducers, applyMiddleware(logger, thunkMiddleware));

export default store;