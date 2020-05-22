import {InferActionsTypes} from "./redux-store";

export type StateInitType = typeof stateInit;
type TAction = InferActionsTypes<typeof actions>

export type dialogDataType = {
  id: number,
  name: string
}

export type messageDataType = {
  id: number,
  message: string
}

const stateInit = {
    dialogData: [
      {id: 1, name: 'Alex'},
      {id: 2, name: 'July'},
      {id: 3, name: 'Kate'},
      {id: 4, name: 'Mary'},
      {id: 5, name: 'Jhon'},
      {id: 6, name: 'Kristoff'},
    ] as Array<dialogDataType>,
    messageData: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'Hello'},
      {id: 3, message: 'Hi'},
      {id: 4, message: 'Привет'},
    ] as Array<messageDataType>
};


export default function messageReducer(state = stateInit, action: any) {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messageData: [...state.messageData, {
          id: Math.random(),
          message: action.newMessageText
        } ],
      };
    default:
      return state;
  }
};

export const actions = {
  sendNewMessageCreator: (newMessageText: string) =>
    ({type: 'SEND_MESSAGE', newMessageText} as const)
}

