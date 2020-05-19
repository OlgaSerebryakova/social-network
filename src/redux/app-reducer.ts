import { getAuthMeActionCreator } from "./auth-reducer";
import { Dispatch } from "redux";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type initStateType = {
  initialized: boolean
};

type TAction = initializedSuccessType
type TDispatch = Dispatch<TAction>

const initState: initStateType = {
  initialized: false
};

export default function appReducer(state = initState, action: any):initStateType  {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}

type initializedSuccessType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessType => ({type: INITIALIZED_SUCCESS});

export const initializeAPP = () => (dispatch: any) => {
  let promise = dispatch(getAuthMeActionCreator());

  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccess());
    });
};
