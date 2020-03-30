const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
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
    ],
    newMessageText: ''
};

export default function messageReducer(state = stateInit, action) {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newText
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messageData: [...state.messageData, {
          id: Math.random(),
          message: state.newMessageText
        } ],
        newMessageText: '',
      };
    default:
      return state;
  }
};

export const sendNewMessageCreator = () => ({type: SEND_MESSAGE});

export const updateNewMessageTextCreator = (text) => {
  return ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text
  })
};