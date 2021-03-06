import {combineReducers, createStore, applyMiddleware, Action} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import profileReducer from "./profile_reducer";
import messageReducer from './message-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import { reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

const createReducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messageReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

const logger = createLogger({
  collapsed: true
});

const store = createStore(createReducers, applyMiddleware(logger, thunkMiddleware));

export default store;

type createReducersType = typeof createReducers;
export type AppStateType = ReturnType<createReducersType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>