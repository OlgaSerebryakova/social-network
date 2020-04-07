const SEND_MESSAGE = 'SEND_MESSAGE';

const stateInit = {
    dialogData: [
      {id: 1, name: 'Alex'},
      {id: 2, name: 'July'},
      {id: 3, name: 'Kate'},
      {id: 4, name: 'Mary'},
      {id: 5, name: 'Jhon'},
      {id: 6, name: 'Kristoff'},
    ],
    messageData: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'Hello'},
      {id: 3, message: 'Hi'},
      {id: 4, message: 'Привет'},
    ]
};

export default function messageReducer(state = stateInit, action) {
  switch (action.type) {
    case SEND_MESSAGE:
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

export const sendNewMessageCreator = (newMessageText) => ({type: SEND_MESSAGE, newMessageText});
