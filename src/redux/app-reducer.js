import { getAuthMeActionCreator } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initState = {
  initialized: false
};

export default function appReducer(state = initState, action) {
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

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeAPP= () => (dispatch) => {
  let promise = dispatch(getAuthMeActionCreator());

  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccess());
    });
};
