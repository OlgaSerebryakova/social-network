const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_Text';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

let store = {
  _state: {
    profilePage: {
      postData: [
        {id: 1, message: 'Hello', likeCounter: 10},
        {id: 2, message: 'Hi', likeCounter: 15},
        {id: 3, message: 'Hello', likeCounter: 10},
        {id: 4, message: 'Hi', likeCounter: 15},
      ],
      newPostText: 'text',
    },
    messagePage: {
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
    }
  },

  _callSubscriber() {
    console.log('Status change')
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    switch (action.type) {
      case ADD_POST:
        let newPost = {
          id: Math.random(),
          message: this._state.profilePage.newPostText,
          likeCounter:0
        };

        this._state.profilePage.postData.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
        break;
      case UPDATE_NEW_POST_TEXT:
        this._state.profilePage.newPostText = action.newText;
        this._callSubscriber(this._state);
        break;
      case UPDATE_NEW_MESSAGE_TEXT:
        this._state.messagePage.newMessageText = action.newText;
        this._callSubscriber(this._state);
        break;
      case SEND_MESSAGE:
        let text = this._state.messagePage.newMessageText;
        this._state.messagePage.newMessageText = '';
        this._state.messagePage.messageData.push({
          id: Math.random(),
          message: text
        });
        this._callSubscriber(this._state);
        break;
      }
  },

};

export const addPostActionCreator = () => ({type: ADD_POST});

export const onPostChangeActionCreator = (text) => {
  return ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  })
};

export const sendNewMessageCreator = () => ({type: SEND_MESSAGE});

export const updateNewMessageTextCreator = (text) => {
  return ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text
  })
};

export default store;
