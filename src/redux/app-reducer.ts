import { getAuthMeActionCreator } from "./auth-reducer";
import { Dispatch } from "redux";
import { InferActionsTypes } from './redux-store';

export type initStateType = typeof initState;

const initState = {
  initialized: false
};

type TAction = InferActionsTypes<typeof actions>
type TDispatch = Dispatch<TAction>


export default function appReducer(state = initState, action: any):initStateType  {
  switch (action.type) {
    case 'APP_INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}

const actions = {
  initializedSuccess: () => ({type: 'APP_INITIALIZED_SUCCESS'} as const )
}


export const initializeAPP = () => (dispatch: any) => {
  let promise = dispatch(getAuthMeActionCreator());

  Promise.all([promise])
    .then(() => {
      dispatch(actions.initializedSuccess());
    });
};
